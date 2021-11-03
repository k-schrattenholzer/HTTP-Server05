const VALID = ['POST', 'PUT', 'PATCH'];

const parseBody = async (req) => {
  if(!VALID.includes(req.method))
  
    return new Promise((resolve, reject) => {

      if(req.headers['content-type'] !== 'application.json'){ 
        reject('Content-Type must be application/json');
        return;
      }

      let data = '';
      
      req.on('data', chunk => data += chunk);

      console.log('DATA', data);

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
