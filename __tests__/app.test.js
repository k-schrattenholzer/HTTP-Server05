const request = require('supertest');
const app = require('../lib/app');

describe('Mood CRUD API', () => {
  it('the Post method creates a new mood, and returns it', async () => {
    const mood = { name:'joyful', intensity:6, overall:'positive' };

    const res = await request(app).post('/moods').send(mood);

    expect(res.body).toEqual({ ...mood, id: expect.any(String) });
  });
});
