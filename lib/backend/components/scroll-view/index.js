import template from './index.paml';
import style from 'raw-loader!./index.pass';

export default {
  template,
  style,

  props: {
    style: ''
  },

  methods: {
    onScroll(e) {
      this.$emit('scroll', e);
    }
  }
};