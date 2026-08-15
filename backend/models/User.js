import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    age: { type: Number, default: null },
    weight: { type: Number, default: null }, // in kg
    height: { type: Number, default: null }, // in cm
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to say', ''],
      default: '',
    },
    fitnessGoal: {
      type: String,
      enum: ['Weight Loss', 'Muscle Gain', 'Endurance', 'General Fitness', 'Maintenance', ''],
      default: 'General Fitness',
    },
    activityLevel: {
      type: String,
      enum: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active', ''],
      default: 'Moderately Active',
    },
    medicalConditions: { type: String, default: '' },
    dietaryRestrictions: { type: String, default: '' },
    dateOfBirth: { type: Date, default: null },
  },
  { timestamps: true }
);

// Password encryption before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
