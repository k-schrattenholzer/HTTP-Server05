const EventEmitter = require('events');
const parseBody = require('../lib/parse-body');


it(' returns null if the method is not POST, PUT, or PATCH', async () => {
  expect(await parseBody({ method: 'GET' })).toBe(null);
  expect(await parseBody({ method: 'DELETE' })).toBe(null);
});

it(' throws err if content type is not application/json', async () => {
  const req = {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    }
  };
  expect.assertions(1);
  try {
    await parseBody(req);
  } catch (e) {

    expect(await parseBody({ method: 'DELETE' })).toBe(null);
  }
});

it('returns deserialized body from req emitted events', async () => {
  const req = new EventEmitter();
  req.headers = { 'content-type': 'application/json' };
  req.method = 'POST';

  const promise = parseBody(req);
  req.emit('data', '{"foo":');
  req.emit('data', '"bar"}');
  req.emit('end');

  const body = await promise;

  expect(body).toEqual({ foo: 'bar' });

});

it('throws err if failure happens in de-serialization', async () => {

  const req = new EventEmitter();

  req.headers = { 'content-type': 'application/json' };
  req.method = 'POST';

  const promise = parseBody(req);

  req.emit('data', '{"bad json"}');
  req.emit('end');

  expect.assertions(1);
  try {
    await promise;
  } catch (e) {
    expect(e).toEqual('Bad JSON');
  }
});
