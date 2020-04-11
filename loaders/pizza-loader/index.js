const path = require('path');
const fs = require('fs');

function isPage(instance) {
  const rid = path.relative(instance.rootContext, instance.resourcePath);
  const pageid = path.join(path.dirname(rid), path.basename(rid, '.js'));
  const appConfigs = require(path.join(instance.rootContext, 'app.json'));
  return appConfigs.pages.indexOf(pageid) > -1;
}

module.exports = function(source) {
  this.cacheable(true);
  const id = path.relative(this.context, this.resourcePath);
  const filename = path.basename(id, '.js');
  const fullname = path.join(this.context, filename);
  
  if (id == 'app.js') return source;

  let configs;

  try {
    configs = require(`${fullname}.json`);
  } catch (e) {
    return source;
  }

  if (!isPage(this) && !configs.component) return false;

  this.addContextDependency(this.context);
  
  let _import = `
import __$$template from './${filename}.paml';
import __$$configs from './${filename}.json';
  `;
  let components = configs.usingComponents || {}, i = 0;
  let _ = [];

  for (let key in components) {
    let importName = '__$' + i++;
    this.addDependency(path.join(this.context, components[key] + '.js'));
    _import += `import ${importName} from "${components[key]}";\n`;
    _.push(`'${key}': ${importName}`);
  }

  if (fs.existsSync(`${fullname}.pass`)) {
    _import += `import __$$style from 'raw-loader!./${filename}.pass';\n`;
  }

  source = source.replace(/export default/, () => 'let __$$component = ');
  source = `
${_import}
${source};
__$$component.template = __$$template;
__$$component.style = typeof __$$style == 'undefined' ? null : __$$style;
__$$component.components = {${_.join(', ')}};
__$$component.configs = __$$configs;
export default __$$component;
  `;

  console.log(source);

  return source;
}