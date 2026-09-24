const { spawn } = require('child_process');

const deploy = spawn('npx', ['surge', './dist', 'legalease-ai-shubham.surge.sh'], {
  shell: true
});

deploy.stdout.on('data', (data) => {
  const output = data.toString();
  console.log('stdout:', output);
  
  if (output.includes('email:')) {
    deploy.stdin.write('dummy-legalease@example.com\n');
  } else if (output.includes('password:')) {
    deploy.stdin.write('dummy123456!\n');
  }
});

deploy.stderr.on('data', (data) => {
  console.error('stderr:', data.toString());
});

deploy.on('close', (code) => {
  console.log('child process exited with code', code);
});
