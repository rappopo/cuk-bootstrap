'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params, ctx) => {
    let attr = lib.attr(params)
    let content = ''
    if (params.srcSet) {
      content += `<picture><source srcset="${params.srcSet}" `
      if (params.type) content += `type="${params.type}" `
      content += '>\n'
    }
    if (params.holder) params.src = 'holder.js/' + (_.isString(params.holder) ? params.holder : '100x100')
    content += `<img ${attr} data-src="${params.src || ''}" class="img-fluid `
    if (params.rounded) content += `rounded `
    if (params.thumbnail) content += `img-thumbnail ${params.cls || ''} `
    content += '" '
    if (params.alt) content += `alt="${params.alt}" `
    content += `${attr}>\n`
    if (params.srcSet) content += '</picture>\n'
    return content
  }
}
