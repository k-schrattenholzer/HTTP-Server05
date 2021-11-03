const { rm, mkdir } = require('fs/promises');
const SimpleDb = require('../lib/simple-db');

describe('simple db', () => {
  const rootDir = `${__dirname}/store`;

  beforeEach(async () => {
    await rm(rootDir, { force: true, recursive: true });
    await mkdir(rootDir, { recursive: true });
  });

  it('saved object has id', async () => {
    const db = new SimpleDb(rootDir);

    const mood = { mood: 'sleepy', intensity: 3, overall:'positive' };

    await db.save(mood);
    expect(mood.id).toEqual(expect.any(String));
  });

  it('save and get an object', async () => {
    const db = new SimpleDb(rootDir);

    const mood = { mood: 'sleepy', intensity: 3, overall:'positive' };

    await db.save(mood);
    const got = await db.get(mood.id);
    expect(got).toEqual(mood);
  });

  it('returns null for non-existant id', async () => {
    const db = new SimpleDb(rootDir);

    const got = await db.get('non-existant');
    expect(got).toBeNull();
  });

  it('gets all objects', async () => {
    const feelings = [
      { mood: 'eager', intensity: 5, overall:'positive' },
      { mood: 'indifferent', intensity: 6, overall:'negative' },
      { mood: 'worried', intensity: 3, overall:'negative' },
    ];

    const db = new SimpleDb(rootDir);

    await Promise.all(feelings.map(feeling => db.save(feeling)));
    const got = await db.getAll();
    expect(got).toEqual(expect.arrayContaining(feelings));
  });

  it('deletes an object', async () => {
    const db = new SimpleDb(rootDir);

    const mood = { mood: 'sleepy', intensity: 3, overall:'positive' };

    await db.save(mood);
    await db.delete(mood.id);
    const got = await db.get(mood.id);
    expect(got).toBeNull();
  });

  it('updates an object', async () => {
    const db = new SimpleDb(rootDir);

    const mood = { mood: 'sleepy', intensity: 3, overall:'positive' };
    await db.save(mood);
      
    mood.intensity = 6;
    await db.update(mood);
     
    const got = await db.get(mood.id);
    expect(got).toEqual(mood);
  });

});
