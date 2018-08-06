'use strict'

module.exports = function (cuk) {
  const { _, util } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    params.bar = params.bar || lib.attrFromParent('bar', params, ['value', 'striped', 'animated', 'context',
      'label', 'barId', 'tt', 'ttDir', 'po', 'poDir', 'poContainer', 'poTitle', 'poNoDismiss'])
    let bar = _.isArray(params.bar) ? params.bar : [params.bar]
    if (params.height) params.style = (params.style || '') + ';height:' + params.height + 'px'
    let content = `<div class="progress" ${lib.attr(params)}>\n`
    delete params.height
    _.each(bar, b => {
      let value = b.value || '0'
      content += `<div class="progress-bar `
      if (b.striped) content += `progress-bar-striped `
      if (b.striped && b.animated) content += `progress-bar-animated `
      if (b.context) content += `bg-${b.context} `
      content += `" role="progressbar" style="width:${value}%" aria-valuenow="${value}"
        aria-valuemin="0" aria-valuemax="100" ${lib.attr(b)}>\n`
      if (b.label) {
        let label = _.isBoolean(b.label) ? (value + '%') : (b.label.indexOf('%') === -1 ? b.label : util.format(b.label, value))
        content += `${label}`
      }
      content += `</div>\n`
    })
    content += `</div>\n`
    return content
  }
}
