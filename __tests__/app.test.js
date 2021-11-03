const request = require('supertest');
const { rm, mkdir } = require('fs/promises');
const app = require('../lib/app');
const SimpleDb = require('../lib/simple-db.js');

describe('Mood CRUD API', () => {

  const rootDir = `${__dirname}/store`;

  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  // afterAll(() => { 
  //   return rm(rootDir, { force: true, recursive: true }).then(() =>
  //     mkdir(rootDir, { recursive: true })
  //   );
  // });

  it('the Post method creates a new mood, and returns it', async () => {
    const mood = { name:'joyful', intensity:6, overall:'positive' };

    const res = await request(app).post('/moods').send(mood);

    expect(res.body).toEqual({ ...mood, id: expect.any(String) });
  });

  it('get mood by ID returns the matching mood given an ID', async () => {

    const mood = { name:'goofy', intensity:7, overall:'positive' };

    const db = new SimpleDb(rootDir);
    const moodPosted = await request(app).post('/moods').send(mood);

    const res = await request(app).get(`/moods/${moodPosted.body.id}`);

    expect(res.body).toEqual({ ...mood, id: expect.any(String) });
  });

  it('gets all dogs without an ID given', async () => {
    const amMood = { name:'sleepy', intensity:7, overall:'negative' };
    const midMood = { name:'determined', intensity:5, overall:'positive' };
    const pmMood = { name:'grateful', intensity:4, overall:'positive' };

    await request(app).post('/moods').send(amMood);
    await request(app).post('/moods').send(midMood);
    await request(app).post('/moods').send(pmMood);

    // const db = new SimpleDb(rootDir);
    // Promise.all([][db.save(amMood), db.save(midMood), db.save(pmMood)]);

    const res = await request(app).get('/moods');

    expect(res.body).toEqual([{ id: expect.any(String), ...pmMood }, { id: expect.any(String), ...midMood  }, { id: expect.any(String), ...amMood   }]);
  });

  ////
});
