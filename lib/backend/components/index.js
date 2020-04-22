import ScrollView from './scroll-view';
import Swiper from './swiper';
import SwiperItem from './swiper-item';
import Page from './page';
import Navigator from './navigator';

export const install = (Pizza) => {
  Pizza.register('scroll-view', ScrollView);
  Pizza.register('swiper', Swiper);
  Pizza.register('swiper-item', SwiperItem);
  Pizza.register('page', Page);
  Pizza.register('navigator', Navigator);
};
