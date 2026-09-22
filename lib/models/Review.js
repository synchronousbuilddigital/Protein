import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide reviewer name'],
    },
    role: {
      type: String,
      default: 'Verified Customer',
    },
    quote: {
      type: String,
      required: [true, 'Please provide review text'],
    },
    image: {
      type: String,
    },
    initials: {
      type: String,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
