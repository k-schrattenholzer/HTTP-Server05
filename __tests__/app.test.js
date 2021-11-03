const request = require('supertest');
const { rm, mkdir } = require('fs/promises');
const app = require('../lib/app');

describe('Mood CRUD API', () => {
  const rootDir = `${__dirname}/store`;
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  afterAll(() => { 
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });
  it('the Post method creates a new mood, and returns it', async () => {
    const mood = { name:'joyful', intensity:6, overall:'positive' };

    const res = await request(app).post('/moods').send(mood);

    expect(res.body).toEqual({ ...mood, id: expect.any(String) });
  });

  //   it('the Get by ID method returns the mood with the given ID', async () => {
  //     const moodWithID = { name:'apathetic', intensity:10, overall:'negative' };

  //     const res = await request(app).get('/moods').send(mood);

//     expect(res.body).toEqual({ ...moodWithID, id: expect.any(String) });
//   });
});
