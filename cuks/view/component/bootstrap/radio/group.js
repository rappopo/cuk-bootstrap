'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib

  return (params = {}, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)
    let content = ''
    _.each(params, (p, i) => {
      p.seq = i + 1
      content += cmpt('radio', p, ctx)
    })
    return content
  }
}
