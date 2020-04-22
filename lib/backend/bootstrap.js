let _;

global.getApp = () => _;

export default (app) => {
  _ = app;
  _.onLaunch && _.onLaunch();
};