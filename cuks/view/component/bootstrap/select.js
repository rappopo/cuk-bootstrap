'use strict'

module.exports = function (cuk) {
  const { _, helper } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    let value = params.value || ''
    let values = []
    if (params.multiple && _.isString(value)) value = helper('core:makeChoices')(value)
    if (params.choose && !params.multiple) {
      values.push(_.isString(params.choose) ? params.choose : {
        id: '', text: 'Choose'
      })
    }
    if (_.isPlainObject(params.values)) {
      _.forOwn(params.values, (v, k) => {
        values.push({ id: k, text: v })
      })
    } else if (_.isArray(params.values)) {
      _.each(params.values, v => {
        values.push(_.isString(v) ? { id: v, text: v } : { id: v.id, text: v.text })
      })
    }
    let attr = lib.attr(params, 'select', ['name', 'value', 'readonly', 'disabled', 'placeholder', 'multiple'])
    let cls = `${params.custom ? 'custom-select' : 'form-control'} `
    if (params.cls) cls += `${params.cls} `
    if (params.textSize) cls += `form-control-${params.textSize} `
    if (params.textColor) cls += `content-${params.textColor} `
    let content = `<select class="${_.trim(cls)}" `
    if (params.rows) {
      content += `size="${params.rows}" `
      delete params.rows
    }
    content += `${attr}>\n`
    _.each(values, v => {
      if (params.multiple) {
        content += `<option value="${v.id}"${value.indexOf(v.id) > -1 ? ' selected' : ''}>`
      } else {
        content += `<option value="${v.id}"${v.id === value ? ' selected' : ''}>`
      }
      content += `${v.text}</option>\n`
    })
    content += `</select>\n`
    return content
  }
}
