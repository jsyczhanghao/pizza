import style from 'raw-loader!./index.pass';
import template from './index.paml';

export default {
  style,
  template,

  props: {
    direction: 'horizontal'
  },

  data: {
    index: 0,
    animating: false,
    innerTransformStyle: ''
  },

  computed: {
    isVertical() {
      return this.direction != 'horizontal';
    },

    wh() {
      return this.isVertical ? 'height' : 'width';
    },

    xy() {
      return this.isVertical ? 'pageY' : 'pageX';
    }
  },

  lifetimes: {
    mounted() {
      this.pos = 0;
      this.perScreenTranslate = 0;
      this.count = 0;
    }
  },

  methods: {
    onTouchStart(e) {
      if (this.animating) {
        return ;
      }

      this.touch = e.touches[0];
      
      Promise.all([
        mini.dom.boundingClientRect(this, '.swiper'),
        mini.dom.boundingClientRect(this, '.swiper-inner')
      ]).then((res) => {
        let [a, b] = res;
        this.perScreenTranslate = a[this.wh];
        this.count = Math.ceil(b[this.wh] / a[this.wh]);
      });
    },

    onTouchMove(e) {
      if (!this.touch) return false;

      this.nowPos = e.touches[0][this.xy] - this.touch[this.xy];
      this.setPos(this.nowPos + this.pos);
    },

    onTouchEnd() {
      if (!this.touch) return false;
      this.touch = null;
      this.pos = this.nowPos + this.pos;
      let i = this.pos / this.perScreenTranslate;
      this.animateTo(this.pos > 0 ? 0 : Math.round(Math.abs(i)));
    },

    onTransitionEnd() {
      this.animating = false;
    },

    animateTo(i) {
      this.index = Math.max(Math.min(i, this.count - 1), 0);
      this.$emit('switch', this.index);
      this.animating = true;
      this.setPos(this.pos = -this.perScreenTranslate * this.index);
    },

    setPos(pos) {
      this.innerTransformStyle = `transform: translate3d(${this.isVertical ? 0 : pos}px, ${this.isVertical ? pos : 0}px, 0px)`;
    }
  },
};