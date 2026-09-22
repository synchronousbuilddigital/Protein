import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    tag: {
      type: String,
      default: 'Best Seller',
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
    },
    originalPrice: {
      type: Number,
    },
    weight: {
      type: String,
      default: '1 KG Pack',
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    flavor: {
      type: String,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    reviewsCount: {
      type: Number,
      default: 120,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
