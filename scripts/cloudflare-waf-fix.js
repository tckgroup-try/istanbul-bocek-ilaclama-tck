const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env dynamically to prevent exposing secrets in Git commits
const envPath = path.join(__dirname, '..', '.env');
const envConfig = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
const env = {};
envConfig.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[match[1]] = value;
  }
});

const CF_API_TOKEN = env.CF_API_TOKEN || process.env.CF_API_TOKEN;
const CF_ZONE_ID = env.CF_ZONE_ID || process.env.CF_ZONE_ID;

async function run() {
  console.log('🛡️ Fetching Cloudflare Security/Firewall Events...');

  if (!CF_API_TOKEN || !CF_ZONE_ID) {
    console.error('❌ Error: CF_API_TOKEN or CF_ZONE_ID not found in environment/.env!');
    process.exit(1);
  }

  try {
    const query = JSON.stringify({
      query: `
        query GetFirewallEvents($zoneTag: String!) {
          viewer {
            zones(filter: { zoneTag: $zoneTag }) {
              firewallEventsAdaptive(
                filter: { datetime_gt: "${new Date(Date.now() - 3600000).toISOString()}" }
                limit: 10
                orderBy: [datetime_DESC]
              ) {
                datetime
                action
                userAgent
                clientIP
                source
              }
            }
          }
        }
      `,
      variables: { zoneTag: CF_ZONE_ID }
    });

    const parsedUrl = new URL('https://api.cloudflare.com/client/v4/graphql');
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(query)
      }
    };

    const gqlRes = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            resolve({ statusCode: res.statusCode, data: JSON.parse(data) });
          } catch {
            resolve({ statusCode: res.statusCode, raw: data });
          }
        });
      });
      req.on('error', (err) => reject(err));
      req.write(query);
      req.end();
    });

    console.log('GraphQL Status:', gqlRes.statusCode);
    console.log('Events:', JSON.stringify(gqlRes.data, null, 2));

  } catch (err) {
    console.error('💥 Error:', err.message);
  }
}

run();
