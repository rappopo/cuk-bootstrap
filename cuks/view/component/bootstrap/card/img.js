'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../../_lib')(cuk)

  return (params = {}, ctx) => {
    if (params.holder) params.src = 'holder.js/' + (_.isString(params.holder) ? params.holder : '100x100')
    let content = `<img data-src="${params.src || ''}" class="card-img-${params.pos || 'top'} ${params.cls || ''}" `
    delete params.src
    content += `${lib.attr(params)}>\n`
    if (params.overlay) {
      content += `<div class="card-img-overlay">\n${params.overlay}</div>\n`
    }
    return content
  }
}
