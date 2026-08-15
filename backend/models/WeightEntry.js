import mongoose from 'mongoose';

const weightEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    weight: { type: Number, required: true }, // in kg
  },
  { timestamps: true }
);

const WeightEntry = mongoose.model('WeightEntry', weightEntrySchema);
export default WeightEntry;
