import mongoose from 'mongoose';

const progressEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    weight: { type: Number, default: 0 },
    caloriesConsumed: { type: Number, default: 0 },
    workoutsCompleted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ProgressEntry = mongoose.model('ProgressEntry', progressEntrySchema);
export default ProgressEntry;
