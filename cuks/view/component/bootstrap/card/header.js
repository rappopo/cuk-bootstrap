'use strict'

module.exports = function (cuk) {
  const lib = require('../../_lib')(cuk)

  return (params = {}, ctx) => {
    let content = `<${params.tag || 'div'} class="card-header ${params.cls || ''} `
    if (params.context) content += `bg-${params.context} `
    if (params.textColor) content += `text-${params.textColor} `
    if (params.borderColor) content += `border-${params.borderColor} `
    content += `" ${lib.attr(params)}>${params.content || ''}</${params.tag || 'div'}>\n`
    return content
  }
}
