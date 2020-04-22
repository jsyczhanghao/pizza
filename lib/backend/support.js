let f;

if (process.env.NODE_ENV == 'production') {
  self.addEventListener = function (type, fn) {
    type == 'message' && (f = fn);
  };

  self.postMessage = function (data) {
    jsPostMessage2native(data);
  };

  self.nativePostMessage2js = function (data) {
    f.call(this, {
      event: 'message',
      data
    });
  };
};