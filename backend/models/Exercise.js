import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
    muscleGroup: {
      type: String,
      required: true,
      enum: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body', 'Cardio'],
    },
    equipment: {
      type: String,
      default: 'Bodyweight',
      enum: ['Dumbbell', 'Barbell', 'Machine', 'Cable', 'Bodyweight', 'Kettlebell', 'Resistance Band', 'Cardio Machine', 'Other'],
    },
    instructions: { type: String, default: '' },
  },
  { timestamps: true }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;
