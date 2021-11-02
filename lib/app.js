const SimpleDb = require('./simple-db');

const db = new SimpleDb('../store');
const app = (req, res) => {
  // console.log('-----req method-----', req.method);
  // console.log('-----req url-----', req.url);


  if (req.method === 'POST' && req.url === '/moods') {

    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', async () => {
      const mood = JSON.parse(data);
      await db.save(mood);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(mood));
    });

  } else {
    res.statusCode = 404;
    res.end(`<html>
<body>
<h1>lil message in a bottle</h1>
<p>resource not found</p>
</body>
</html>`);
  }
};

module.exports = app;
