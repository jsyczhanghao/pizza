import ScrollView from './scroll-view';
import Swiper from './swiper';
import SwiperItem from './swiper-item';

export const install = (Pizza) => {
  Pizza.register('scroll-view', ScrollView);
  Pizza.register('swiper', Swiper);
  Pizza.register('swiper-item', SwiperItem);
};
