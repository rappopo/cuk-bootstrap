'use strict'

module.exports = function (cuk) {
  // const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)
    params.context = params.context || 'primary'
    let content = ''
    let attr = lib.attr(params)

    if (!params.noWrapper) {
      content += `<div class="dropdown `
      if (params.wrapperCls) content += `${params.wrapperCls} `
      if (params.dir) content += `drop${params.dir} `
      if (params.split) content += `btn-group `
      content += `" ${attr}>\n`
    }
    if (params.split) {
      content += `<button type="button" class="btn `
      if (params.context) content += `btn-${params.outline ? 'outline-' : ''}${params.context} `
      if (params.block) content += `btn-block `
      if (params.noWrapper) content += `" ${attr}`
      content += `">\n${params.title}\n</button>\n`
    }
    content += `<button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" `
    let cls = 'btn dropdown-toggle '
    if (params.split) cls += `dropdown-toggle-split `
    if (params.cls) cls += `${params.cls} `
    if (params.context) cls += `btn-${params.outline ? 'outline-' : ''}${params.context} `
    if (params.textSize) cls += `btn-${params.textSize} `
    content += `class="${cls}" `
    if (params.noWrapper && !params.split) content += `" ${attr}`
    content += '>\n'
    if (params.split) {
      content += '<span class="sr-only">Toggle Dropdown</span>\n'
    } else {
      content += params.title
    }
    content += '</button>\n'
    content += cmpt('menu', {
      content: params.menu,
      ariaLabeledby: params.id ? (params.id + '-btn') : null,
      align: params.align
    }, ctx)
    if (!params.noWrapper) {
      content += '</div>\n'
    }

    return content
  }
}
