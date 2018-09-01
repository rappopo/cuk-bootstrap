'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    params.context = params.context || 'primary'
    let attr = lib.attr(params)
    let cls = 'btn '
    let content = `<${params.aTag ? 'a' : 'button'} `
    if (params.aTag) {
      content += params.href ? `href="${params.href}" ` : `href="#" role="button" `
      if (params.disabled) {
        cls += `disabled `
        content += `tabindex="-1" aria-disabled="true" `
      }
    } else {
      content += `type="${params.type || 'button'}" `
      if (params.disabled) content += `disabled `
    }
    if (params.cls) cls += `${params.cls} `
    if (params.textSize) cls += `btn-${params.textSize} `
    if (params.context) cls += `btn${params.outline ? '-outline' : ''}-${params.context} `
    if (params.block) cls += `btn-block `
    if (params.active) {
      cls += `active `
      content += `aria-pressed="true" `
    }
    content += `${attr} class="${_.trim(cls)}">${params.title}</${params.aTag ? 'a' : 'button'}>\n`
    return content
  }
}
