export default {
  data() {
    return {
      images: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586432186139&di=76509761988388611631741afacafa3b&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F161203%2F3-1612030ZG5.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586432186139&di=3a5ab5857bc955aa87ca66dee8663e53&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181118%2Fe553a90bb9fa4574822c5de49f08d3b2.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586432186139&di=b4a948e2d461c75aec19aff4069e7756&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201508%2F10%2F20150810150356_hnves.jpeg'
      ]
    };
  },

  lifetimes: {
    mounted() {
      setTimeout(() => {
        this.images = this.images.concat(this.images);
      }, 3000);
    }
  }
}