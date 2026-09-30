import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import Review from '@/lib/models/Review';

const sampleProducts = [
  {
    name: 'Kulfi Mate - Plant Protein',
    slug: 'kulfi-mate-plant-protein',
    tag: 'Best Seller ⭐',
    price: 1899,
    originalPrice: 2499,
    weight: '1 KG Pack (30 Servings)',
    image: '/products/kulfi-mate.jpg',
    description: 'Traditional Indian Kulfi flavor blended with premium pea and brown rice protein. Smooth, zero chalkiness, and easy on digestion.',
    flavor: 'Kulfi Mate',
    rating: 4.9,
    reviewsCount: 342,
    isFeatured: true,
    inStock: true,
  },
  {
    name: 'Badam Kulfi - Daily Protein',
    slug: 'badam-kulfi-daily-protein',
    tag: 'Customer Favorite 🏆',
    price: 1999,
    originalPrice: 2599,
    weight: '1 KG Pack (30 Servings)',
    image: '/products/kulfi-mate-2.jpg',
    description: 'Rich almond kulfi flavor packed with natural nuts, digestive enzymes, and 25g clean protein per serving.',
    flavor: 'Badam Kulfi',
    rating: 4.8,
    reviewsCount: 189,
    isFeatured: true,
    inStock: true,
  },
  {
    name: 'Choco Buddy - Plant Protein',
    slug: 'choco-buddy-plant-protein',
    tag: 'Rich Cocoa 🍫',
    price: 1849,
    originalPrice: 2399,
    weight: '1 KG Pack (30 Servings)',
    image: '/products/choco-buddy.webp',
    description: 'Decadent Belgian chocolate plant protein with zero added sugar and zero bloating. Perfect for post-workout smoothies.',
    flavor: 'Belgian Chocolate',
    rating: 4.9,
    reviewsCount: 275,
    isFeatured: true,
    inStock: true,
  },
  {
    name: 'Matte Steel Shaker Bottle',
    slug: 'steel-shaker-bottle',
    tag: 'Essential Gear ⚡',
    price: 699,
    originalPrice: 999,
    weight: '750ml Capacity',
    image: '/products/steel-shaker.jpg',
    description: 'Double-walled insulated stainless steel shaker bottle. Keeps drinks icy cold for 12 hours with zero odor retention.',
    flavor: 'Matte Black',
    rating: 5.0,
    reviewsCount: 512,
    isFeatured: false,
    inStock: true,
  },
];

const sampleReviews = [
  {
    quote: `"I often had bloating issues from whey, and most plant protein tasted chalky. Choco Buddy is the tastiest I've had, with zero bloating."`,
    name: "Neha Pawar",
    role: "Engineering student",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    initials: "NP",
    rating: 5,
    isVerified: true,
  },
  {
    quote: `"I need something quick, clean, and reliable. Kulfi Mate keeps me full and helps me stay energised through long workdays."`,
    name: "Kavita",
    role: "Cyclist",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    initials: "K",
    rating: 5,
    isVerified: true,
  },
  {
    quote: `"I was diagnosed with diabetes and advised to increase protein. The Proteinest is very tasty and my sugar levels are in check now."`,
    name: "Shephali",
    role: "Home maker",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    initials: "S",
    rating: 5,
    isVerified: true,
  },
  {
    quote: `"Light on the stomach, no weird aftertaste, and the Steel Shaker makes mixing super smooth into my daily routine."`,
    name: "Anshita",
    role: "Image coach",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    initials: "A",
    rating: 5,
    isVerified: true,
  },
  {
    quote: `"Finally a plant protein that actually tastes good and doesn't make me feel heavy. Love the Kulfi Mate flavour!"`,
    name: "Riya Shah",
    role: "Yoga instructor",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
    initials: "RS",
    rating: 5,
    isVerified: true,
  },
  {
    quote: `"I've tried so many proteins but The Proteinest is the only one I've stuck with for 6 months. Clean, effective, delicious."`,
    name: "Manav",
    role: "Software engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    initials: "M",
    rating: 5,
    isVerified: true,
  },
];

export async function GET() {
  try {
    await connectToDatabase();

    // Clear existing sample collections to re-seed
    await Product.deleteMany({});
    await Review.deleteMany({});

    const products = await Product.insertMany(sampleProducts);
    const reviews = await Review.insertMany(sampleReviews);

    return NextResponse.json({
      success: true,
      message: 'MongoDB database successfully seeded!',
      insertedProducts: products.length,
      insertedReviews: reviews.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Database Seeding Failed: ' + error.message },
      { status: 500 }
    );
  }
}
