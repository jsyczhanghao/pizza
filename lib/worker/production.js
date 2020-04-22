export default () => {
  let f;

  window.nativePostMessage2js = function(data) {
    f.call(this, {
      type: 'message',
      data
    });
  };

  return {
    addEventListener(type, fn) {
      f = fn;
    },  
    postMessage(data) {
      window.flutter_inappwebview.callHandler('jsPostMessage2native', data);
    }
  };
};