'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../../_lib')(cuk)

  return (params = {}, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)
    params = _.omit(params, ['tt', 'ttDir', 'po', 'poDir', 'poContainer', 'poTitle', 'poNoDismiss'])
    params.input = params.input || ''
    params.label = params.label || {}
    let content = `<div class="form-group ${params.stacked ? '' : 'row'} `
    if (params.cls) content += params.cls
    content += `" ${_.trim(lib.attr(params))}>`

    let label = params.label
    if (_.isString(label)) label = { content: label }
    label.content = label.content || ''
    if (params.stacked) {
      content += cmpt('label', label, ctx) + '\n' + params.input + '\n'
      if (params.hint) content += `<small class="form-text text-muted">${params.hint}</small>\n`
    } else {
      let width = _.isArray(params.width) ? params.width : (params.width || '3:9').split(':')
      label.cls = (label.cls || '') + ' col-form-label col-sm-' + width[0]
      if (_.get(params, 'input.id')) label.for = params.input.id
      content += cmpt('label', label, ctx) + '\n'
      content += `<div class="col-sm-${width[1]} ${params.inline ? 'mt-1' : ''}">\n`
      content += params.input + '\n'
      if (params.hint) content += `<small class="form-text text-muted">${params.hint}</small>\n`
      content += '</div>\n'
    }
    content += '</div>'
    return content
  }
}