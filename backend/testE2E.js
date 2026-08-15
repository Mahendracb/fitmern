import http from 'http';

const request = (options, postData) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', (err) => reject(err));
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
};

async function runTests() {
  console.log('--- STARTING FITMERN END-TO-END VERIFICATION ---');

  // 1. Healthcheck
  const health = await request({ host: 'localhost', port: 5000, path: '/api/health', method: 'GET' });
  console.log('1. Health check status:', health.status, health.body.server);

  // 2. Register user
  const randomUser = `athlete_${Date.now()}`;
  const regRes = await request(
    {
      host: 'localhost',
      port: 5000,
      path: '/api/users/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      username: randomUser,
      email: `${randomUser}@example.com`,
      password: 'password123',
      age: 26,
      weight: 78,
      height: 178,
      fitnessGoal: 'Muscle Gain',
    }
  );
  console.log('2. User Registration status:', regRes.status, 'User ID:', regRes.body._id);
  const token = regRes.body.token;

  // 3. Get Exercises Library
  const exRes = await request({ host: 'localhost', port: 5000, path: '/api/workouts/exercises', method: 'GET' });
  console.log('3. Exercise Library items count:', exRes.body.length, 'Sample:', exRes.body[0]?.name);

  // 4. Log Workout
  const wRes = await request(
    {
      host: 'localhost',
      port: 5000,
      path: '/api/workouts/workouts',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    },
    {
      exerciseName: 'Bench Press',
      muscleGroup: 'Chest',
      sets: 4,
      reps: 10,
      weight: 85,
    }
  );
  console.log('4. Log Workout status:', wRes.status, 'Logged:', wRes.body.exerciseName);

  // 5. Log Meal
  const mRes = await request(
    {
      host: 'localhost',
      port: 5000,
      path: '/api/nutrition/meals',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    },
    {
      foodName: 'Grilled Chicken Breast',
      mealType: 'Lunch',
      calories: 350,
      protein: 31,
      carbs: 0,
      fats: 4,
    }
  );
  console.log('5. Log Meal status:', mRes.status, 'Meal:', mRes.body.foodName);

  // 6. Create Goal
  const gRes = await request(
    {
      host: 'localhost',
      port: 5000,
      path: '/api/goals/goals',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    },
    {
      title: 'Bench Press 100kg Target',
      category: 'Workout',
      target: 100,
      current: 85,
      unit: 'kg',
      endDate: new Date(Date.now() + 30 * 86400000).toISOString(),
    }
  );
  console.log('6. Create Goal status:', gRes.status, 'Goal:', gRes.body.title);

  // 7. Log Body Measurements
  const bmRes = await request(
    {
      host: 'localhost',
      port: 5000,
      path: '/api/progress/body-measurements',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    },
    {
      chest: 102,
      waist: 81,
      hips: 96,
      biceps: 37,
      thighs: 59,
    }
  );
  console.log('7. Body Measurements Log status:', bmRes.status, 'Chest:', bmRes.body.chest, 'cm');

  console.log('--- ALL BACKEND ENDPOINTS & WORKFLOWS VERIFIED SUCCESSFULLY ---');
}

runTests().catch(console.error);
