'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../../_lib')(cuk)

  return (params = {}, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)
    let content = `<div class="card-deck" ${lib.attr(params)}>\n`
    if (_.isArray(params)) params = { content: params }
    params.content = _.isArray(params.content) ? params.content : [params.content]
    _.each(params.content, c => {
      if (_.isPlainObject(c)) content += cmpt('card', c, ctx)
      else content += c
    })
    content += '</div>\n'
    return content
  }
}
