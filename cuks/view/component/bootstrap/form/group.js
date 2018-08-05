'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../../_lib')(cuk)

  return (params = {}, ctx) => {
    params.label = params.label || {}
    params.input = params.input || ''
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)

    let label = params.label
    if (_.isString(label)) {
      label = lib.attrFromParent('label', params, ['labelCls', 'labelDisabled', 'labelId', 'labelTextSize',
        'labelTt', 'labelTtDir', 'labelPo', 'labelPoDir', 'labelPoTitle', 'labelPoContainer', 'labelPoNoDismiss'])
      label = _.merge(label, { content: params.label })
    }

    let content = `<div class="form-group ${params.stacked ? '' : 'row'} `
    if (params.cls) content += params.cls
    content += `" ${_.trim(lib.attr(params))}>`
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