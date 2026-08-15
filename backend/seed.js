import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exercise from './models/Exercise.js';
import Food from './models/Food.js';

dotenv.config();

const exercisesData = [
  {
    name: 'Bench Press',
    muscleGroup: 'Chest',
    equipment: 'Barbell',
    description: 'Classic compound chest building exercise targeting pectoralis major and triceps.',
    instructions: 'Lie flat on bench, unrack bar with full grip, lower bar smoothly to mid-chest level, press upward explosively.',
  },
  {
    name: 'Incline Dumbbell Press',
    muscleGroup: 'Chest',
    equipment: 'Dumbbell',
    description: 'Target the clavicular head (upper chest) and front deltoids.',
    instructions: 'Set bench to 30-45 degree incline, press dumbbells overhead bringing them together at peak contraction.',
  },
  {
    name: 'Barbell Squat',
    muscleGroup: 'Legs',
    equipment: 'Barbell',
    description: 'The king of lower body exercises for quadriceps, hamstrings, and glutes.',
    instructions: 'Place bar on upper traps, descend hips back and down until thighs are parallel to ground, drive through heels.',
  },
  {
    name: 'Romanian Deadlift',
    muscleGroup: 'Legs',
    equipment: 'Barbell',
    description: 'Focuses heavily on hamstrings, gluteus maximus, and spinal erectors.',
    instructions: 'Hinge at the hips with slight knee flex, lower weight keeping bar close to legs until stretch in hamstrings.',
  },
  {
    name: 'Pull-Ups',
    muscleGroup: 'Back',
    equipment: 'Bodyweight',
    description: 'Bodyweight compound exercise for latissimus dorsi and biceps strength.',
    instructions: 'Grasp overhead bar with overhand grip, pull chest toward bar squeezing shoulder blades together.',
  },
  {
    name: 'Bent-Over Barbell Row',
    muscleGroup: 'Back',
    equipment: 'Barbell',
    description: 'Builds upper back thickness, rhomboids, and lower back stability.',
    instructions: 'Bend knees slightly and bend forward at waist to 45 degrees, pull bar up towards waistline.',
  },
  {
    name: 'Overhead Shoulder Press',
    muscleGroup: 'Shoulders',
    equipment: 'Barbell',
    description: 'Primary compound movement for shoulder strength and upper body power.',
    instructions: 'Stand shoulder-width apart, press barbell straight overhead locking out elbows overhead.',
  },
  {
    name: 'Lateral Dumbbell Raises',
    muscleGroup: 'Shoulders',
    equipment: 'Dumbbell',
    description: 'Isolation exercise targeting lateral deltoid heads for shoulder width.',
    instructions: 'Raise dumbbells to sides with slight bend in elbows until arms are parallel to floor.',
  },
  {
    name: 'Bicep Barbell Curl',
    muscleGroup: 'Arms',
    equipment: 'Barbell',
    description: 'Classic biceps builder targeting peak strength and elbow flexion.',
    instructions: 'Keep elbows tucked into ribcage, curl bar upward flexing biceps at top of movement.',
  },
  {
    name: 'Tricep Rope Pushdowns',
    muscleGroup: 'Arms',
    equipment: 'Cable',
    description: 'Isolates all three heads of the triceps muscle.',
    instructions: 'Attach rope to high pulley, push downwards extending elbows fully and separating rope handles at bottom.',
  },
  {
    name: 'Plank Hold',
    muscleGroup: 'Core',
    equipment: 'Bodyweight',
    description: 'Isometric core stability and abdominal wall strengthening.',
    instructions: 'Maintain straight line from shoulders to ankles supporting body on forearms and toes.',
  },
  {
    name: 'Hanging Leg Raises',
    muscleGroup: 'Core',
    equipment: 'Bodyweight',
    description: 'Targets lower rectus abdominis and hip flexors.',
    instructions: 'Hang from pull-up bar, raise legs up horizontally without swinging momentum.',
  },
  {
    name: 'Treadmill Running',
    muscleGroup: 'Cardio',
    equipment: 'Cardio Machine',
    description: 'Aerobic cardiovascular endurance and calorie burn activity.',
    instructions: 'Maintain steady pace at target heart rate zone for 20-45 minutes.',
  },
];

const foodsData = [
  { name: 'Grilled Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 3.6, servingSize: '100g' },
  { name: 'Brown Rice (Cooked)', calories: 112, protein: 2.6, carbs: 24, fats: 0.9, servingSize: '100g' },
  { name: 'Oatmeal / Rolled Oats', calories: 389, protein: 16.9, carbs: 66, fats: 6.9, servingSize: '100g' },
  { name: 'Large Whole Egg', calories: 72, protein: 6.3, carbs: 0.4, fats: 4.8, servingSize: '1 egg (50g)' },
  { name: 'Egg White', calories: 17, protein: 3.6, carbs: 0.2, fats: 0.1, servingSize: '1 egg white (33g)' },
  { name: 'Whey Protein Scoop', calories: 120, protein: 24, carbs: 3, fats: 1.5, servingSize: '1 scoop (30g)' },
  { name: 'Greek Yogurt (Plain)', calories: 100, protein: 17, carbs: 6, fats: 0.7, servingSize: '170g container' },
  { name: 'Salmon Filet (Baked)', calories: 206, protein: 22, carbs: 0, fats: 13, servingSize: '100g' },
  { name: 'Sweet Potato (Baked)', calories: 90, protein: 2, carbs: 21, fats: 0.2, servingSize: '100g' },
  { name: 'Raw Almonds', calories: 579, protein: 21, carbs: 22, fats: 50, servingSize: '100g' },
  { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fats: 0.3, servingSize: '1 medium (118g)' },
  { name: 'Avocado', calories: 160, protein: 2, carbs: 9, fats: 15, servingSize: '100g' },
  { name: 'Broccoli (Steamed)', calories: 35, protein: 2.4, carbs: 7, fats: 0.4, servingSize: '100g' },
  { name: 'Whole Wheat Bread', calories: 69, protein: 3.6, carbs: 12, fats: 0.9, servingSize: '1 slice (28g)' },
  { name: 'Peanut Butter', calories: 188, protein: 8, carbs: 7, fats: 16, servingSize: '2 tbsp (32g)' },
];

export const seedDatabase = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitmern';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connStr);
    }
    console.log('Seeding Database...');

    for (const ex of exercisesData) {
      await Exercise.updateOne({ name: ex.name }, { $set: ex }, { upsert: true });
    }

    for (const f of foodsData) {
      await Food.updateOne({ name: f.name }, { $set: f }, { upsert: true });
    }

    console.log('Database Seeded Successfully!');
  } catch (err) {
    console.warn('Seeding note:', err.message);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => process.exit(0));
}
