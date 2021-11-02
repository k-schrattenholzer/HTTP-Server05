const SimpleDb = require('./simple-db');

const db = new SimpleDb('../store');

const moodsRouter = {
  async post(req, res) {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', async () => {
      const mood = JSON.parse(data);
      await db.save(mood);
      const savedMood = await db.get(mood.id);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(savedMood));
    });

  }
};

module.exports = moodsRouter;

