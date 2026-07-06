const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const KEYS = [
  { name: 'vast-falcon (current)', path: path.join(__dirname, '..', 'service_account.json') },
  { name: 'karacocuk', path: 'c:\\Users\\onurk\\Downloads\\karacocuk-17cc2d60f5a3.json' },
  { name: 'strong-return', path: 'c:\\Users\\onurk\\Downloads\\strong-return-494114-c2-1177e827789a.json' }
];

const TEST_URL = 'https://tckilaclama.com/';

async function testKey(keyInfo) {
  console.log(`\n🔍 Testing key: ${keyInfo.name} (${keyInfo.path})...`);
  
  if (!fs.existsSync(keyInfo.path)) {
    console.error(`❌ Key file not found!`);
    return;
  }

  try {
    const keyData = JSON.parse(fs.readFileSync(keyInfo.path, 'utf8'));
    console.log(`📧 Service Account Email: ${keyData.client_email}`);

    const auth = new google.auth.GoogleAuth({
      keyFile: keyInfo.path,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });
    
    const authClient = await auth.getClient();
    const indexing = google.indexing({
      version: 'v3',
      auth: authClient,
    });

    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: TEST_URL,
        type: 'URL_UPDATED',
      },
    });

    console.log(`✅ SUCCESS! Response status: ${response.status}`);
  } catch (err) {
    console.log(`❌ ERROR:`, err.message || err);
  }
}

async function run() {
  for (const key of KEYS) {
    await testKey(key);
  }
}

run();
