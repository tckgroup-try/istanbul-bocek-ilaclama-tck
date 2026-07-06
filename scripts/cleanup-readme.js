require('dotenv').config();

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
const delay = (ms) => new Promise(r => setTimeout(r, ms));

async function run() {
  console.log('🧹 Purging all existing parasite guides (and duplicates/spam suffixes) from ReadMe...');
  const districtsArr = Object.values(istanbulNeighborhoods);

  for (let idx = 0; idx < districtsArr.length; idx++) {
    const dist = districtsArr[idx];
    const pestSlug = pestOrder[idx % pestOrder.length];
    const baseSlug = `istanbul-${dist.districtSlug}-${pestSlug}-ilaclama-rehberi`;
    
    // Check and delete base, -1, -2, -3 suffixes
    const variations = [baseSlug, `${baseSlug}-1`, `${baseSlug}-2`, `${baseSlug}-3`, `${baseSlug}-1-1`];

    for (const slug of variations) {
      try {
        const checkRes = await fetch(`${BASE_URL}/branches/${BRANCH}/guides/${slug}`, {
          method: 'GET',
          headers: HEADERS
        });

        if (checkRes.ok) {
          console.log(`🗑️ Deleting: "${slug}"`);
          const delRes = await fetch(`${BASE_URL}/branches/${BRANCH}/guides/${slug}`, {
            method: 'DELETE',
            headers: HEADERS
          });
          
          if (delRes.ok) {
            console.log(`   ✅ Deleted successfully.`);
          } else {
            console.error(`   ❌ Delete failed: ${delRes.status}`);
          }
          await delay(250);
        }
      } catch (err) {
        console.error(`   ❌ Error checking "${slug}":`, err.message);
      }
    }
  }

  console.log('\n✨ Purging complete!');
}

run();
