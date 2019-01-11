'use strict'

module.exports = function (cuk) {
  const { _, helper } = cuk.pkg.core.lib
  const cfg = helper('core:config')('bootstrap')
  return new Promise((resolve, reject) => {
    _.each(helper('core:pkgs')(), p => {
      let themes = _.get(p, 'cfg.cuks.bootstrap.themes')
      if (themes) {
        cfg.themes = _.concat(cfg.themes || [], themes)
      }
    })
    resolve(true)
  })
}
