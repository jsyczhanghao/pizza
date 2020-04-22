var portfinder = require('portfinder');

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || 8090;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      resolve(process.env.PORT = port);
    }
  });
});