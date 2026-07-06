const https = require('https');

const HOST = 'tckilaclama.com';
const KEY = 'd8fb1628d0ee4c9cb1112b0ee3f9828d';
const URLS = [
  'https://tckilaclama.com/',
  'https://tckilaclama.com/hizmetler',
  'https://tckilaclama.com/subelerimiz',
  'https://tckilaclama.com/hakkimizda'
];

function postRequest(url, payload) {
  return new Promise((resolve) => {
    const parsedUrl = new URL(url);
    const bodyString = JSON.stringify(payload);
    
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(bodyString)
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    });

    req.on('error', (err) => resolve({ error: err.message }));
    req.write(bodyString);
    req.end();
  });
}

async function run() {
  console.log('📡 Testing direct IndexNow endpoints...');

  const payload = {
    host: HOST,
    key: KEY,
    urlList: URLS
  };

  const endpoints = {
    'Bing': 'https://www.bing.com/indexnow',
    'Yandex': 'https://yandex.com/indexnow',
    'IndexNow.org': 'https://api.indexnow.org/indexnow'
  };

  for (const [name, url] of Object.entries(endpoints)) {
    console.log(`Submitting to ${name}...`);
    const res = await postRequest(url, payload);
    console.log(`Result from ${name}:`, res);
  }
}

run();
