var portfinder = require('portfinder');

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || 8090;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      resolve(process.env.PORT = port);
    }
  });
});