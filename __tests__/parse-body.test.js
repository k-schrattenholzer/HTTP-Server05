const EventEmitter = require('events');
const parseBody = require('../lib/parse-body');

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
