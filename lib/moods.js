const parseBody = require('./parse-body.js');
const SimpleDb = require('./simple-db');

const db = new SimpleDb('../store');

const moodsRouter = {
  async post(req, res) {
    const mood = await parseBody(req);

    await db.save(mood);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(mood));


  }
};

module.exports = moodsRouter;

