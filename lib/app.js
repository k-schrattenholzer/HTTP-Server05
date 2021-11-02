const moodsRouter = require('./moods');

const routes = {
  moods: moodsRouter
};
const app = async (req, res) => {

  const [, resource] = req.url.split('/');
  const route = routes[resource];

  if (route) {
    
    try {
      const routeHandlerFn = route[req.method.toLowerCase()];
      await routeHandlerFn(req, res);
    } catch(err) {

      console.error(err);
      res.statusCode = 500;
      res.end(err.message);
    }
  } else {
    res.statusCode = 404;
    res.end('resource not found');
  }
};

module.exports = app;
