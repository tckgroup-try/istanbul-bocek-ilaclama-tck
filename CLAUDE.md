# TCK İlaçlama - Developer Guide

## Command Cheat Sheet
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Generate Parasites**: `node scripts/generate-parasites.js`
- **Push to GitHub ReadMe Sync**: `node scripts/push-to-github.js`
- **Generate GitHub Sitemap**: `node scripts/generate-github-readme.js`
- **Ping Search Engines**: `node scripts/ping-search-engines.js`

## Guidelines
- Strict TypeScript: No `any` type usage.
- Schema Validation: Verify that new pages contain valid JSON-LD schemas.
- Clean Code: Suggest splits for files exceeding 250 lines.
