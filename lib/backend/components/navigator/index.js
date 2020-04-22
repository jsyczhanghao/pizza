import template from './index.paml';
import style from 'raw-loader!./index.pass';

export default {
  template,
  style,
  props: {
    url: null,
  },
  methods: {
    onClick() {
      this.url && mini.navigator.push(this.url);
      this.$emit('click');
    }
  }
}