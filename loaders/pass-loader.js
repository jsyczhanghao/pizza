const Postcss = require('postcss');
const plugin = Postcss([Postcss.plugin('pass', function (options) {
  return function (css, options) {
    css.walkRules(function (rule) {
      rule.selector = rule.selector.split(/\s*,\s*/).map((str) => {
        if (/^[a-z]/i.test(str)) {
          return 'pizza-' + str;
        }

        return str;
      }).join(', ');
    });
  }
})]);

module.exports = function (source) {
  this.cacheable(true);
  return plugin.process(source).css;
};