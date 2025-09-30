/**
 * E-commerce Backend (Node.js + Express + MongoDB)
 *
 * Endpoints (compatible with your React frontend):
 * - GET    /api/health
 * - GET    /api/products?q=&category=&sale=&minPrice=&maxPrice=&sort=
 * - GET    /api/products/:id
 * - GET    /api/categories
 * - GET    /api/bestsellers
 * - GET    /api/sale
 * - GET    /api/cart               (requires X-User-Id)
 * - POST   /api/cart               (requires X-User-Id) { productId, quantity }
 * - PUT    /api/cart/:productId    (requires X-User-Id) { quantity }
 * - DELETE /api/cart/:productId    (requires X-User-Id)
 * - GET    /api/favorites          (requires X-User-Id)
 * - POST   /api/favorites          (requires X-User-Id) { productId }
 * - DELETE /api/favorites/:productId (requires X-User-Id)
 * - POST   /api/newsletter { email }
 * - POST   /api/contact    { name, email, message }
 * - POST   /api/auth/signup { name, email, password }
 * - POST   /api/auth/login  { email, password }
 */

import 'dotenv/config';
import express from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import { initMongo, Users, Products, CartItems, Favorites, safeProduct } from './mongo.js';

const PORT = process.env.PORT;

const PRODUCTION_ORIGIN = process.env.FRONTEND_ORIGIN || 'https://techshed.onrender.com';

const allowedOrigins = [
  'http://localhost:5173',           // For local development
  PRODUCTION_ORIGIN   // Your deployed frontend URL
];
const app = express();
await initMongo();

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Important for cookies/sessions
}));

app.use(express.json());

function getUserId(req) {
  const id = req.get('X-User-Id');
  return id && String(id).trim() ? String(id).trim() : null;
}

// Health
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Products listing with filters
app.get('/api/products', async (req, res) => {
  const { q, category, sale, minPrice, maxPrice, sort } = req.query;
  const filter = {};

  if (q) {
    const regex = new RegExp(String(q), 'i');
    filter.$or = [
      { name: { $regex: regex } },
      { description: { $regex: regex } }
    ];
  }
  if (category) {
    filter.category = { $regex: new RegExp(`^${String(category)}$`, 'i') };
  }
  if (typeof sale !== 'undefined') {
    filter.sale = String(sale).toLowerCase() === 'true';
  }
  const priceCond = {};
  const min = Number(minPrice);
  const max = Number(maxPrice);
  if (!Number.isNaN(min)) priceCond.$gte = min;
  if (!Number.isNaN(max)) priceCond.$lte = max;
  if (Object.keys(priceCond).length) filter.price = priceCond;

  const sortSpec = {};
  if (sort) {
    switch (String(sort)) {
      case 'price_asc': sortSpec.price = 1; break;
      case 'price_desc': sortSpec.price = -1; break;
      case 'rating_desc': sortSpec.rating = -1; break;
      case 'newest': sortSpec.id = -1; break;
      default: break;
    }
  }

  const docs = await Products.find(filter).sort(sortSpec).toArray();
  res.json(docs.map(safeProduct));
});

// Single product
app.get('/api/products/:id', async (req, res) => {
  const id = Number(req.params.id);
  const doc = await Products.findOne({ id });
  if (!doc) return res.status(404).json({ error: 'Product not found' });
  res.json(safeProduct(doc));
});

// Categories
app.get('/api/categories', async (req, res) => {
  const cats = await Products.distinct('category');
  res.json((cats || []).filter(Boolean));
});

// Best sellers
app.get('/api/bestsellers', async (req, res) => {
  const docs = await Products.find({}).sort({ rating: -1 }).limit(10).toArray();
  res.json(docs.map(safeProduct));
});

// On sale
app.get('/api/sale', async (req, res) => {
  const docs = await Products.find({ sale: true }).toArray();
  res.json(docs.map(safeProduct));
});

// Cart endpoints (per user)
app.get('/api/cart', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const rows = await CartItems.aggregate([
    { $match: { userId } },
    { $lookup: { from: 'products', localField: 'productId', foreignField: 'id', as: 'product' } },
    { $unwind: '$product' },
    { $project: { _id: 0, quantity: 1, product: '$product' } }
  ]).toArray();

  const items = rows.map(r => ({ product: safeProduct(r.product), quantity: r.quantity }));
  res.json({ userId, items });
});

app.post('/api/cart', async (req, res) => {
  const { productId, quantity = 1 } = req.body || {};
  if (!productId) return res.status(400).json({ error: 'productId is required' });
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const prod = await Products.findOne({ id: Number(productId) });
  if (!prod) return res.status(404).json({ error: 'Product not found' });

  await CartItems.updateOne(
    { userId, productId: Number(productId) },
    { $inc: { quantity: Number(quantity) } },
    { upsert: true }
  );
  res.status(201).json({ ok: true });
});

app.put('/api/cart/:productId', async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body || {};
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  if (typeof quantity !== 'number' || quantity < 0) return res.status(400).json({ error: 'quantity must be >= 0' });

  if (quantity === 0) {
    await CartItems.deleteOne({ userId, productId: Number(productId) });
  } else {
    await CartItems.updateOne(
      { userId, productId: Number(productId) },
      { $set: { quantity: Number(quantity) } },
      { upsert: true }
    );
  }
  res.json({ ok: true });
});

app.delete('/api/cart/:productId', async (req, res) => {
  const { productId } = req.params;
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  await CartItems.deleteOne({ userId, productId: Number(productId) });
  res.json({ ok: true });
});

// Favorites endpoints (per user)
app.get('/api/favorites', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const rows = await Favorites.aggregate([
    { $match: { userId } },
    { $lookup: { from: 'products', localField: 'productId', foreignField: 'id', as: 'product' } },
    { $unwind: '$product' },
    { $project: { _id: 0, product: '$product' } }
  ]).toArray();

  res.json({ userId, items: rows.map(r => safeProduct(r.product)) });
});

app.post('/api/favorites', async (req, res) => {
  const { productId } = req.body || {};
  if (!productId) return res.status(400).json({ error: 'productId is required' });
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const prod = await Products.findOne({ id: Number(productId) });
  if (!prod) return res.status(404).json({ error: 'Product not found' });

  await Favorites.updateOne(
    { userId, productId: Number(productId) },
    { $setOnInsert: { userId, productId: Number(productId) } },
    { upsert: true }
  );
  res.status(201).json({ ok: true });
});

app.delete('/api/favorites/:productId', async (req, res) => {
  const { productId } = req.params;
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  await Favorites.deleteOne({ userId, productId: Number(productId) });
  res.json({ ok: true });
});

// Newsletter + Contact
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Valid email required' });
  console.log('Newsletter subscribe:', email);
  res.status(201).json({ ok: true });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'name, email, and message are required' });
  console.log('Contact message:', { name, email, message });
  res.status(201).json({ ok: true });
});

// Auth using MongoDB + bcrypt
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, phone } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: 'name, email, and password are required' });
  try {
    const normalizedEmail = String(email).trim().toLowerCase();
    const exists = await Users.findOne({ email: normalizedEmail });
    if (exists) return res.status(409).json({ error: 'Email already exists' });

    const password_hash = await bcrypt.hash(String(password), 10);
    const doc = {
      name: String(name),
      email: normalizedEmail,
      password_hash,
      phone: phone || null,
      createdAt: new Date()
    };
    const result = await Users.insertOne(doc);
    const id = String(result.insertedId);
    res.status(201).json({ ok: true, user: { id, name: doc.name, email: doc.email } });
  } catch (e) {
    console.error('Failed to create user:', e);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const user = await Users.findOne({ email: normalizedEmail });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(String(password || ''), user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = crypto.randomBytes(16).toString('hex');
  res.json({ token, user: { id: String(user._id), name: user.name, email: user.email } });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on http://0.0.0.0:${PORT}`);
  console.log(`CORS allowed origin: ${FRONTEND_ORIGIN}`);
});
