const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Blog = require('./models/Blog');
const Collection = require('./models/Collection');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const products = [
  // Featured Products
  { name: 'Classic Wooden Chair', price: 134.99, category: 'featured', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400', description: 'Handcrafted wooden chair with ergonomic design', featured: true },
  { name: 'Modern Dining Table', price: 289.99, category: 'featured', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400', description: 'Elegant dining table for family gatherings', featured: true },
  { name: 'Oak Coffee Table', price: 179.99, category: 'featured', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', description: 'Sturdy oak coffee table with storage', featured: true },
  { name: 'Rustic Bookshelf', price: 224.99, category: 'featured', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', description: 'Multi-tier bookshelf with rustic finish', featured: true },
  
  // Special Products
  { name: 'Ergonomic Office Chair', price: 199.99, category: 'special', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400', description: 'Comfortable chair for long working hours' },
  { name: 'Vintage Armchair', price: 154.99, category: 'special', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400', description: 'Classic vintage style armchair' },
  { name: 'Wooden Side Table', price: 89.99, category: 'special', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400', description: 'Compact side table for any room' },
  { name: 'King Size Bed Frame', price: 449.99, category: 'special', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400', description: 'Luxurious king size bed frame' },
  
  // Popular Products
  { name: 'Premium Wardrobe', price: 379.99, category: 'popular', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400', description: 'Spacious wardrobe with mirror doors' },
  { name: 'Queen Platform Bed', price: 399.99, category: 'popular', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400', description: 'Modern platform bed for ultimate comfort' },
  { name: 'Luxury Bedside Table', price: 124.99, category: 'popular', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400', description: 'Elegant bedside table with drawers' },
  { name: 'Contemporary Desk', price: 269.99, category: 'popular', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', description: 'Sleek desk for home office' },
  
  // Category specific
  { name: 'Dining Chair Set', price: 299.99, category: 'chairs', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400', description: 'Set of 4 dining chairs' },
  { name: 'Recliner Chair', price: 349.99, category: 'chairs', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400', description: 'Comfortable recliner with footrest' },
  { name: 'Double Bed', price: 329.99, category: 'beds', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400', description: 'Comfortable double bed with headboard' },
  { name: 'Bunk Bed', price: 459.99, category: 'beds', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400', description: 'Space-saving bunk bed for kids' },
  { name: 'Console Table', price: 189.99, category: 'tables', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400', description: 'Narrow console table for hallways' },
  { name: 'Round Dining Table', price: 399.99, category: 'tables', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400', description: 'Round table perfect for conversations' },
];

const blogs = [
  {
    title: 'New Spring Collection Arrives',
    description: 'Discover our latest spring collection featuring handcrafted furniture pieces inspired by Scandinavian design. Each item combines functionality with timeless elegance, perfect for creating a warm and inviting atmosphere in your home. Made from sustainably sourced materials with attention to every detail.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500',
    author: 'Admin'
  },
  {
    title: 'Sustainable Furniture Guide',
    description: 'Learn about our commitment to sustainability and how we carefully select eco-friendly materials for all our furniture. From reclaimed wood to non-toxic finishes, we ensure every piece is crafted with both quality and environmental responsibility in mind. Join us in making conscious choices for your home.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
    author: 'Admin'
  },
  {
    title: 'Design Tips for Small Spaces',
    description: 'Maximize your living space with our expert design tips and multifunctional furniture solutions. Whether you live in a studio apartment or a cozy home, our carefully designed pieces help you create a stylish and comfortable environment without compromising on functionality or aesthetic appeal.',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500',
    author: 'Admin'
  }
];

const collections = [
  {
    title: 'CHAIRS',
    subtitle: 'COLLECTION',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400',
    slug: 'chairs'
  },
  {
    title: 'BEDS',
    subtitle: 'COLLECTION',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
    slug: 'beds'
  },
  {
    title: 'TABLES',
    subtitle: 'COLLECTION',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400',
    slug: 'tables'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Product.deleteMany({});
    await Blog.deleteMany({});
    await Collection.deleteMany({});
    
    console.log('Data cleared');
    
    // Insert new data
    await Product.insertMany(products);
    await Blog.insertMany(blogs);
    await Collection.insertMany(collections);
    
    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();
