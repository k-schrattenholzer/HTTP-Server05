const VALID = ['POST', 'PUT', 'PATCH'];

const parseBody = async (req) => {
  if(!VALID.includes(req.method)) return null;

  return new Promise((resolve, reject) => {
// all tests were failing due to my use of 'application.json' instead of application/json
    if (req.headers['content-type'] !== 'application/json') { 
      reject('Content-Type must be application/json');
      return;
    }

    let data = '';
      
    req.on('data', chunk => data += chunk);

    // console.log('DATA', data);

    req.on('end', async () => {
      try {
        resolve(JSON.parse(data));
      } catch(err) {
        reject('Bad JSON');
      }          
    });
  });
};

module.exports = parseBody;
