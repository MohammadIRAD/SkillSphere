import http from 'http';

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('--- response preview ---');
    console.log(data.slice(0, 800));
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
