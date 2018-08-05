'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    params.context = params.context || 'primary'
    let cls = `alert alert-${params.context} `
    if (params.dismiss) cls += `alert-dismissable `
    if (!params.noAnimation) cls += `fade show `
    if (params.cls) cls += `${params.cls} `
    let content = `<div role="alert" class="${_.trim(cls)}" `
    content += lib.attr('alert', params, ['id', 'disabled', 'style', 'rel'])
    content += `>${params.content}`
    if (params.dismiss) {
      content += `
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>`
    }
    content += '\n</div>'
    return content
  }
}
