'use strict'

module.exports = function (cuk) {
  const { _, helper } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    if (_.isArray(params)) params = { items: params }
    let attr = lib.attr(params)
    if (!params.id) params.id = 'cmpt-accordion-' + helper('core:makeId')()
    let content = `<div class="accordion" ${attr}>`
    params.items = _.isArray(params.items) ? params.items : [params.items]
    _.each(params.items, (t, i) => {
      if (!t.id) t.id = params.id + '-item-' + i
      content += `<div class="card">\n`
      content += `<div class="card-header" id="${t.id}-h">`
      content += `<h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" `
      content += `aria-expanded="${t.id === params.active ? 'true' : 'false'}" data-target="#${t.id}-c" aria-controls="${t.id}-c">\n`
      content += `${t.title}\n</button></h5>\n</div>\n`
      content += `<div id="${t.id}-c" class="collapse${t.id === params.active ? ' show' : ''}" `
      content += `aria-labelledby="${t.id}-h" data-parent="#${params.id}">\n`
      content += `<div class="card-body">\n${t.content || ''}\n</div>\n</div>\n</div>\n`
    })
    content += `</div>\n`
    return content
  }
}
