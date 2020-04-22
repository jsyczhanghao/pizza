import register from './_register';

export default {
  boundingClientRect: register('dom.boundingClientRect', (context, selector) => {
    return {
      id: context.$componentId,
      selector
    }
  }),

  screen: register('dom.screen'),
}