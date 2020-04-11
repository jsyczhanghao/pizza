var arr = [
  {
    name: 'A',
    fav: ['eat', 'drink']
  },

  {
    name: 'B',
    fav: ['eat', 'play']
  }
];

let _ = [];

for (let i = 0; i < 2; i++) {
  arr.forEach((item, j) => {
    _.push({
      name: item.name,
      fav: item.fav,
    });
  });
}

export default _;