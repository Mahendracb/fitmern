import http from 'http';

async function testAIChatEndpoint() {
  console.log('Testing Express /api/ai/chat endpoint...');

  // First register or login to get token
  const randomUser = `aitest_${Date.now()}`;
  const regPayload = JSON.stringify({
    username: randomUser,
    email: `${randomUser}@example.com`,
    password: 'password123',
    fitnessGoal: 'Muscle Gain',
  });

  const regRes = await new Promise((resolve) => {
    const req = http.request(
      {
        host: 'localhost',
        port: 5000,
        path: '/api/users/register',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(regPayload) },
      },
      (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve(JSON.parse(d)));
      }
    );
    req.write(regPayload);
    req.end();
  });

  const token = regRes.token;
  console.log('Registered test user token:', token ? 'OK' : 'FAILED');

  const chatPayload = JSON.stringify({ message: 'Suggest a quick 3-step chest workout' });

  const chatRes = await new Promise((resolve) => {
    const req = http.request(
      {
        host: 'localhost',
        port: 5000,
        path: '/api/ai/chat',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(chatPayload),
        },
      },
      (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(d) }));
      }
    );
    req.write(chatPayload);
    req.end();
  });

  console.log('Chat response status:', chatRes.status);
  console.log('AI Reply Preview:', chatRes.body.reply?.substring(0, 150) || chatRes.body);
}

testAIChatEndpoint().catch(console.error);
