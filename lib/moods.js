const parseBody = require('./parse-body.js');
const SimpleDb = require('./simple-db');

const db = new SimpleDb(`${__dirname}/../__tests__/store`);

const moodsRouter = {

  async post(req, res) {
    const mood = await parseBody(req);

    await db.save(mood);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(mood));
  },

  async get(req, res) {
    const [, , id] = req.url.split('/');

    if(id) {
      const mood = await db.get(id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(mood));
    } else {
      const allMoods = await db.getAll();
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(allMoods));
    }
  },

  async put(req, res) {
    const moodUpdate = await parseBody(req);
    const [, , id] = req.url.split('/');
    moodUpdate.id = id;
    await db.update(moodUpdate);
    const updatedObj = await db.get(moodUpdate.id);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(updatedObj));
  },

  async delete(req, res) {
    const [, , id] = req.url.split('/');
    await db.delete(id);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(`${id} Deleted`));
  }


};

module.exports = moodsRouter;

