import messager from '../messager';

export default (method, argsFn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      messager.send('API_CALL', {
        method,
        args: argsFn ? argsFn(...args) : args[0],
      }, ({
        status,
        data,
        err
      }) => !err ? resolve(data) : reject(err));
    });
  };
};