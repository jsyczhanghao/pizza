import register from './_register';

export default {
  show: register('toast.show', (message, duration = 1000) => {
    return {
      message, duration
    };
  })
};