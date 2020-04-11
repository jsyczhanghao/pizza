import users from '~/data/users.js';

export default {
  data() {
    return {
      users,
    };  
  },

  methods: {
    onClick(e) {
      console.log(e);
    }
  }
};