import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGODB_DB || 'ecommerce';

export const client = new MongoClient(uri, { maxPoolSize: 10 });
export let db;
export let Users;
export let Products;
export let CartItems;
export let Favorites;

async function ensureIndexes() {
  await Users.createIndex({ email: 1 }, { unique: true });
  await Products.createIndex({ id: 1 }, { unique: true }); 
  await CartItems.createIndex({ userId: 1, productId: 1 }, { unique: true });
  await Favorites.createIndex({ userId: 1, productId: 1 }, { unique: true });
}

async function seedProductsIfEmpty() {
  const count = await Products.estimatedDocumentCount();
  if (count === 0) {
    // Import from frontend catalog
    const mod = await import('../src/component/Products.js');
    const catalog = Array.isArray(mod.Products) ? mod.Products : [];
    if (!catalog.length) return;
    const docs = catalog.map(p => ({
      id: Number(p.id),
      name: p.name,
      price: Number(p.price),
      rating: Number(p.rating || 0),
      img: p.img || null,
      category: p.category || null,
      description: p.description || null,
      sale: Boolean(p.sale || false),
      originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
      specifications: p.specifications || null,
      features: p.features || null,
    }));
    await Products.insertMany(docs, { ordered: false });
  } else {
    // Update existing products with correct originalPrice values
    const mod = await import('../src/component/Products.js');
    const catalog = Array.isArray(mod.Products) ? mod.Products : [];
    if (!catalog.length) return;

    for (const product of catalog) {
      if (product.originalPrice) {
        await Products.updateOne(
          { id: Number(product.id) },
          {
            $set: {
              originalPrice: Number(product.originalPrice),
              sale: Boolean(product.sale || false)
            }
          }
        );
      }
    }
  }
}

export async function initMongo() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    Users = db.collection('users');
    Products = db.collection('products');
    CartItems = db.collection('cart_items');
    Favorites = db.collection('favorites');
    await ensureIndexes();
    await seedProductsIfEmpty();
  }
}

export function toObjectId(id) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

export function safeProduct(doc) {
  if (!doc) return null;
  return {
    id: doc.id,
    name: doc.name,
    price: doc.price,
    rating: doc.rating,
    sale: Boolean(doc.sale),
    category: doc.category,
    img: doc.img,
    description: doc.description,
    originalPrice: doc.originalPrice || null,
  };
}
