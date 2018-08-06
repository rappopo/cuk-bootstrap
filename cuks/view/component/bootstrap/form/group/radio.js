'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../../../_lib')(cuk)

  return (params = {}, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)
    let input
    if (!params.input) {
      const items = ['name', 'value', 'checked', 'inputStyle', 'inputRel', 'textSize', 'disabled', 'inputId', 'inputCls',
        'inputLabel', 'tt', 'ttDir', 'po', 'poDir', 'poTitle', 'poContainer', 'poNoDismiss']
      input = [lib.attrFromParent('input', params, items)]
    } else {
      input = _.isArray(params.input) ? params.input : [params.input]
    }
    _.each(['name', 'inline', 'custom'], item => {
      if (params[item]) {
        _.each(input, (v, i) => {
          input[i][item] = params[item]
        })
      }
    })
    params = _.merge(params, {
      input: cmpt('radioGroup', input, ctx)
    })
    return cmpt('formGroup', params, ctx)
  }
}
