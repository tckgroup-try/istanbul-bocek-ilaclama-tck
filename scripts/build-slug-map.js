require('dotenv').config();
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.README_API_KEY;
const BRANCH = '1.0';
const BASE_URL = 'https://api.readme.com/v2';
const HEADERS = {
  'Authorization': `Bearer ${API_KEY}`,
  'accept': 'application/json'
};

const istanbulNeighborhoods = {
  kadikoy: { districtSlug: 'kadikoy' },
  sisli: { districtSlug: 'sisli' },
  besiktas: { districtSlug: 'besiktas' },
  bakirkoy: { districtSlug: 'bakirkoy' },
  uskudar: { districtSlug: 'uskudar' },
  umraniye: { districtSlug: 'umraniye' },
  fatih: { districtSlug: 'fatih' },
  beyoglu: { districtSlug: 'beyoglu' },
  sariyer: { districtSlug: 'sariyer' },
  pendik: { districtSlug: 'pendik' },
  kartal: { districtSlug: 'kartal' },
  maltepe: { districtSlug: 'maltepe' },
  atasehir: { districtSlug: 'atasehir' },
  beykoz: { districtSlug: 'beykoz' },
  zeytinburnu: { districtSlug: 'zeytinburnu' },
  basaksehir: { districtSlug: 'basaksehir' },
  beylikduzu: { districtSlug: 'beylikduzu' },
  esenyurt: { districtSlug: 'esenyurt' },
  avcilar: { districtSlug: 'avcilar' },
  kucukcekmece: { districtSlug: 'kucukcekmece' },
  bahcelievler: { districtSlug: 'bahcelievler' },
  bagcilar: { districtSlug: 'bagcilar' },
  gaziosmanpasa: { districtSlug: 'gaziosmanpasa' },
  eyupsultan: { districtSlug: 'eyupsultan' },
  kagithane: { districtSlug: 'kagithane' },
  sile: { districtSlug: 'sile' },
  cekmekoy: { districtSlug: 'cekmekoy' },
  tuzla: { districtSlug: 'tuzla' },
  adalar: { districtSlug: 'adalar' },
  arnavutkoy: { districtSlug: 'arnavutkoy' },
  bayrampasa: { districtSlug: 'bayrampasa' },
  buyukcekmece: { districtSlug: 'buyukcekmece' },
  catalca: { districtSlug: 'catalca' },
  esenler: { districtSlug: 'esenler' },
  gungoren: { districtSlug: 'gungoren' },
  sancaktepe: { districtSlug: 'sancaktepe' },
  silivri: { districtSlug: 'silivri' },
  sultanbeyli: { districtSlug: 'sultanbeyli' },
  sultangazi: { districtSlug: 'sultangazi' }
};

const pestOrder = ['bocek', 'fare', 'pire', 'hamam-bocegi', 'tahtakurusu', 'akrep', 'kene'];

async function run() {
  console.log('🔍 Diagnostics: Mapping active slugs on ReadMe...');
  const districtsArr = Object.values(istanbulNeighborhoods);
  const slugMap = {};

  for (let idx = 0; idx < districtsArr.length; idx++) {
    const dist = districtsArr[idx];
    const pestSlug = pestOrder[idx % pestOrder.length];
    
    // Check multiple slug variations due to ReadMe duplicate suffix appending
    const baseSlug = `istanbul-${dist.districtSlug}-${pestSlug}-ilaclama-rehberi`;
    const variations = [baseSlug, `${baseSlug}-1`, `${baseSlug}-2`];
    let activeSlug = baseSlug; // default fallback

    for (const variant of variations) {
      try {
        const res = await fetch(`${BASE_URL}/branches/${BRANCH}/guides/${variant}`, {
          method: 'GET',
          headers: HEADERS
        });
        
        if (res.ok) {
          activeSlug = variant;
          console.log(`✅ Verified Active Slug: "${activeSlug}"`);
          break;
        }
      } catch (err) {
        // network issue
      }
    }
    
    slugMap[baseSlug] = activeSlug;
  }

  const mapPath = path.join(__dirname, '..', 'active_slugs.json');
  fs.writeFileSync(mapPath, JSON.stringify(slugMap, null, 2), 'utf8');
  console.log(`\n🎉 Created slug map file at ${mapPath}`);
}

run();
