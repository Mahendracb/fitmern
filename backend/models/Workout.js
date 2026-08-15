import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exerciseName: { type: String, required: true },
    muscleGroup: { type: String, default: 'General' },
    sets: { type: Number, required: true, default: 1 },
    reps: { type: Number, required: true, default: 10 },
    weight: { type: Number, required: true, default: 0 }, // in kg/lbs
    date: { type: Date, default: Date.now },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
