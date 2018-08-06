const exec = require('child_process').exec;

const threshold = 'high';

exec('npm audit', (error, stdout, stderr) => {
  console.log(stdout);
  const vulnerabilities = stdout.split('\n').filter((line) => {
    return /[lL]ow|[mM]oderate|[hH]igh|[cC]ritical/.test(line);
  });
  for (const vulnerability of vulnerabilities) {
    if (vulnerability.toLowerCase().indexOf(threshold) > -1) process.exit(1);
  }
});
