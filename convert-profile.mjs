import sharp from 'sharp';
import { parse, join } from 'path';

const f = './public/assets/profile-photo.jpg';
const p = parse(f);
await sharp(f).webp({ quality: 85 }).toFile(join(p.dir, p.name + '.webp'));
console.log('profile-photo converted');
