'use strict'

module.exports = function (cuk) {
  const { _, helper } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    let content = '<p>'
    params.trigger = _.isArray(params.trigger) ? params.trigger : [params.trigger]
    if (params.target) {
      params.target = _.isArray(params.target) ? params.target : [params.target]
      _.each(params.target, (t, k) => {
        if (_.isString(t)) t = { content: t }
        if (!t.id) t.id = 'cmpt-collapse-' + helper('core:makeId')()
        params.target[k] = t
      })
    }
    _.each(params.trigger, t => {
      if (!t.context) t.context = 'primary'
      let cls = lib.cls(t, ['cls', 'textSize', 'context'])
      content += `<${t.aTag ? 'a' : 'button type="button"'} data-toggle="collapse" `
      content += `class="btn ${cls}" `
      content += (t.aTag ? `href="` : `data-target="`) + `${t.target}" `
      content += `role="button" aria-expanded="false" aria-controls="${t.target}">\n`
      content += `${t.title}\n</${t.aTag ? 'a' : 'button'}>\n`
    })
    content += `</p>\n`
    if (params.target) {
      _.each(params.target, t => {
        content += `<div class="collapse${params.target.length > 1 ? ' multi-collapse' : ''}" id="${t.id}">\n`
        content += `${t.content || ''}\n</div>\n`
      })
    }
    return content
  }
}
