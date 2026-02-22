import fs from 'fs';
let css = fs.readFileSync('style.css', 'utf-8');

css = css.replace(/background:\s*#ffffff;/gi, 'background: var(--bg-card);');
css = css.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.8\);/gi, 'background: rgba(24, 28, 37, 0.8);');
css = css.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.85\);/gi, 'background: rgba(32, 38, 50, 0.85);');
css = css.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.9\);/gi, 'background: rgba(32, 38, 50, 0.9);');
css = css.replace(/color:\s*#ffffff;/gi, 'color: var(--text-main);');

fs.writeFileSync('style.css', css);
console.log('done');
