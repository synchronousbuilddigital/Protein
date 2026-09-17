import fs from 'fs';
import path from 'path';

try {
  const userProfile = process.env.USERPROFILE || 'C:\\Users\\visha';
  const srcDir = path.join(userProfile, '.gemini', 'antigravity-ide', 'brain', 'ca736958-e577-4750-b325-7f6652243d9c');
  const destDir = path.join(process.cwd(), 'public');

  const files = [
    { src: 'choco_protein_tub_1789471574418.png', dest: 'choco-buddy.png' },
    { src: 'kulfi_protein_tub_1789471605165.png', dest: 'kulfi-mate.png' },
    { src: 'steel_protein_shaker_1789471634634.png', dest: 'steel-shaker.png' },
    { src: 'doc_ankit_1789471663360.png', dest: 'doc-ankit.png' },
    { src: 'doc_bandana_1789471689167.png', dest: 'doc-bandana.png' },
    { src: 'doc_dishaa_1789471719846.png', dest: 'doc-dishaa.png' },
    { src: 'doc_payal_1789471746830.png', dest: 'doc-payal.png' },
    { src: 'doc_rinshu_1789471811702.png', dest: 'doc-rinshu.png' },
    { src: 'protein_founder_1789471862671.png', dest: 'founder.png' }
  ];

  files.forEach(({ src, dest }) => {
    const s = path.join(srcDir, src);
    const d = path.join(destDir, dest);
    if (fs.existsSync(s) && !fs.existsSync(d)) {
      fs.copyFileSync(s, d);
      console.log(`[AutoSetup] Copied ${src} to ${dest}`);
    }
  });
} catch (e) {
  console.error('[AutoSetup] Error copying images:', e);
}
