const { execFileSync } = require('child_process');
const { existsSync, mkdirSync, rmSync } = require('fs');
const { join } = require('path');

const outputDir = join(process.cwd(), 'out');
const packageDir = join(process.cwd(), 'offline-package');
const zipPath = join(process.cwd(), 'interactive_vid_offline.zip');

if (!existsSync(outputDir)) {
  throw new Error('Static export folder "out" was not found. Run `npm run export` first.');
}

rmSync(packageDir, { recursive: true, force: true });
rmSync(zipPath, { force: true });
mkdirSync(packageDir, { recursive: true });

execFileSync('cp', ['-R', `${outputDir}/.`, packageDir], { stdio: 'inherit' });
execFileSync('zip', ['-r', zipPath, '.'], { cwd: packageDir, stdio: 'inherit' });

console.log(`\nOffline package created: ${zipPath}`);
console.log('Unzip it and open index.html directly in a browser without internet.');
