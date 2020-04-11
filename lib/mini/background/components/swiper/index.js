import style from 'raw-loader!./index.pass';
import template from './index.paml';

const DURATION = 1000;

export default {
  style,
  template,

  data: {
    index: 0,
    animating: false,
    innerTransformStyle: ''
  },

  lifetimes: {
    mounted() {
      this.pos = 0;
      this.perScreenWidth = 0;
      this.translate = 0;
      console.log(this);
    }
  },

  methods: {
    onTouchStart(e) {
      this.perScreenWidth = e.viewport.width; 
      this.startX = e.touches[0].pageX;
      this.nowX = 0;
    },

    onTouchMove(e) {
      this.nowX = e.touches[0].pageX - this.startX;
      this.innerTransformStyle = `transform: translate3d(${this.nowX + this.translate}px, 0px, 0px)`;
      console.log(e);
    },

    onTouchEnd() {
      this.translate = this.nowX + this.translate;
      let i = this.translate / this.perScreenWidth;
      this.animateTo(Math.round(Math.abs(i)));
    },

    onTransitionEnd() {
      this.animating = false;
      setTimeout(() => {
        this.innerTransformStyle = 'transform: translate3d(0px, 0px, 0px)';
        this.scrollPos = this.perScreenWidth * this.index;
      }, 0);
    },

    animateTo(i) {
      console.log(i);
      return false;
      if (this.scrollPos == this.pos) return false;

      this.index = i;
      this.scrollPos = this.pos;
      this.animating = true;
      let translate = this.pos - this.perScreenWidth * i;
      this.innerTransformStyle = `transform: translate3d(${translate}px, 0px, 0px)`;
    }
  },
};