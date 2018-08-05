'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    let cls = 'badge '
    let content = `<${params.aTag ? 'a' : 'span'} `
    if (params.aTag) {
      content += `href="${params.href} || '#'}" `
    }
    if (params.cls) cls += `${params.cls} `
    if (params.context) cls += `badge-${params.context} `
    if (params.pill) cls += `badge-pill `
    content += lib.attr(params, ['id', 'style', 'rel'])
    content += ` class="${_.trim(cls)}">${params.content}</${params.aTag ? 'a' : 'span'}>\n`
    if (params.srOnly) content += `<span class="sr-only">${params.srOnly}</span>\n`
    return content
  }
}
