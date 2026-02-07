import sharp from 'sharp';
import { access, writeFile } from 'fs/promises';
import { join } from 'path';

const brainDir = '/Users/samuelmcfarlane/.gemini/antigravity/brain/81da7c4a-c5dc-48c7-bce9-61dbaa393bb2';
const targetDir = './public/assets/projects';

const log = [];

const mappings = [
    ['portfolio_project_screenshot.png', 'mcfarlane-ide.webp'],
    ['auction_intel_project_1770255355639.png', 'auction-intel.webp'],
    ['petal_prose_project_1770255373068.png', 'petal-prose.webp'],
    ['hvac_hub_project_1770255389187.png', 'hvac-hub.webp'],
    ['apricut_project_1770255406488.png', 'apricut.webp'],
    ['ballistic_intel_project_1770255421843.png', 'ballistic.webp'],
    ['climate_hub_project_1770255436186.png', 'climate-hub.webp'],
    ['kpi_copilot_project_1770255450677.png', 'kpi-copilot.webp'],
    ['aethercode_project_1770255464925.png', 'aethercode.webp'],
    ['llm_thesaurus_project_1770255480613.png', 'llm-thesaurus.webp'],
    ['rpg_themes_project_1770255494323.png', 'rpg-themes.webp'],
];

async function convert() {
    for (const [src, dest] of mappings) {
        const srcPath = join(brainDir, src);
        const destPath = join(targetDir, dest);
        try {
            await access(srcPath);
            log.push(`Source exists: ${src}`);

            const info = await sharp(srcPath).webp({ quality: 85 }).toFile(destPath);
            log.push(`Created ${dest}: ${info.size} bytes`);
        } catch (e) {
            log.push(`ERROR ${src}: ${e.message}`);
        }
    }

    log.push('Done!');
    await writeFile('./conversion-log.txt', log.join('\n'));
    console.log(log.join('\n'));
}

convert().catch(e => console.error('Fatal error:', e));
