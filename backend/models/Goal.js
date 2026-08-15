import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Weight', 'Workout', 'Nutrition', 'Measurement'],
      required: true,
    },
    target: { type: Number, required: true },
    current: { type: Number, required: true, default: 0 },
    unit: { type: String, default: 'kg' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed', 'Failed'],
      default: 'In Progress',
    },
  },
  { timestamps: true }
);

const Goal = mongoose.model('Goal', goalSchema);
export default Goal;
