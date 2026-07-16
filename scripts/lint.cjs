const { spawnSync } = require('node:child_process');
const path = require('node:path');

const eslintRoot = path.dirname(require.resolve('eslint/package.json'));
const eslintBin = path.join(eslintRoot, 'bin', 'eslint.js');
const args = [
  '.',
  '--ext',
  '.js,.jsx,.ts,.tsx',
  '--resolve-plugins-relative-to',
  '.'
];

const result = spawnSync(process.execPath, [eslintBin, ...args], {
  stdio: 'inherit',
  env: {
    ...process.env,
    ESLINT_USE_FLAT_CONFIG: 'false'
  }
});

process.exit(result.status ?? 1);
