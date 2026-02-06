import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, parse } from 'path';
async function go(d) {
    for (const e of await readdir(d, { withFileTypes: true })) {
        const f = join(d, e.name);
        if (e.isDirectory()) await go(f);
        else if (/\.(png|jpg)$/i.test(e.name)) {
            const p = parse(f);
            await sharp(f).webp({ quality: 85 }).toFile(join(p.dir, p.name + '.webp'));
            console.log(p.name);
        }
    }
}
await go('./public/assets');
