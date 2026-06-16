const { execSync } = require('child_process');
try {
  const out = execSync('npx react-scripts build', { stdio: 'pipe', cwd: __dirname });
  console.log('Build succeeded:\n', out.toString());
} catch (e) {
  console.error('Build failed:');
  console.error(e.stdout ? e.stdout.toString() : '');
  console.error(e.stderr ? e.stderr.toString() : '');
}
