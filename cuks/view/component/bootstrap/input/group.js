'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../../_lib')(cuk)

  return (params = {}, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)

    const addOns = items => {
      let content = ''
      _.each(items, item => {
        if (_.isString(item)) item = { type: 'text', text: item }
        if (item.type === 'radio') {
          let cm = cmpt('radio', _.merge(item, { plain: true }), ctx)
          content += `<div class="input-group-text">${cm}</div>\n`
        } else if (item.type === 'checkbox') {
          let cm = cmpt('checkbox', _.merge(item, { plain: true }), ctx)
          content += `<div class="input-group-text">${cm}</div>\n`
        } else if (item.type === 'button') {
          content += cmpt('button', _.omit(item, ['block', 'active', 'tag']), ctx)
        } else if (item.type === 'dropdown') {
          content += cmpt('dropdown', _.merge(_.omit(item, ['block', 'active', 'tag']), { noWrapper: true }), ctx)
        } else {
          content += `<span class="input-group-text">${item.text}</span>`
        }
      })
      return content
    }

    let cls = 'input-group '
    if (params.textSize) cls += `input-group-${params.textSize} `
    if (params.cls) cls += params.cls
    let content = `<div class="${_.trim(cls)}" ${lib.attr(params)}>\n`
    if (params.before) {
      content += `<div class="input-group-prepend `
      if (params.before.type === 'dropdown' && params.before.dir) {
        content += `drop${params.before.dir} `
      }
      content += '">\n'
      if (!_.isArray(params.before)) params.before = [params.before]
      content += addOns(params.before) + '</div>\n'
    }
    let input = params.input || lib.attrFromParent('input', params, ['name', 'value', 'values', 'readOnly', 'placeHolder',
      'type', 'disabled', 'inputId', 'inputCls', 'tt', 'ttDir', 'po', 'poDir', 'title', 'poNoDismiss'])
    if (!_.isArray(input)) input = [input]
    _.each(input, i => {
      switch (i.type) {
        case 'select': content += cmpt('select', _.merge(i, { custom: true }), ctx); break
        case 'file': content += cmpt('file', _.merge(i, { custom: true }), ctx); break
        default: content += cmpt('input', i, ctx)
      }
    })
    if (params.after) {
      content += `<div class="input-group-append `
      if (params.after.type === 'dropdown' && params.after.dir) {
        content += `drop${params.after.dir} `
      }
      content += '">\n'
      if (!_.isArray(params.after)) params.after = [params.after]
      content += addOns(params.after) + '</div>\n'
    }
    content += '</div>\n'
    return content
  }
}
