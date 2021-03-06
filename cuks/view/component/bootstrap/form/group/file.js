'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../../../_lib')(cuk)

  return (params = {}, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)
    const items = ['name', 'value', 'readonly', 'placeholder', 'textSize',
      'disabled', 'inputId', 'inputCls', 'inpurRel', 'inputStyle', 'custom', 'noChangePlaceholderScript',
      'tt', 'ttDir', 'po', 'poDir', 'poTitle', 'poContainer', 'poNoDismiss']
    const input = lib.attrFromParent('input', params, items)
    params = _.merge(params, {
      input: cmpt('file', params.input ? params.input : input)
    })
    return cmpt('formGroup', params, ctx)
  }
}
