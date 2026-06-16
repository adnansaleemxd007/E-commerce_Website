const { spawn } = require('child_process');
const path = require('path');

// Spawn the Express backend
const backend = spawn('node', [path.join(__dirname, 'backend', 'server.js')], {
  stdio: 'inherit',
  shell: true
});

// Spawn the React frontend
const frontend = spawn('npx', ['vite'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env }
});

backend.on('close', (code) => {
  console.log(`Backend server exited with code ${code}`);
  process.exit(code);
});

frontend.on('close', (code) => {
  console.log(`React frontend exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
});

process.on('SIGTERM', () => {
  backend.kill('SIGTERM');
  frontend.kill('SIGTERM');
});
