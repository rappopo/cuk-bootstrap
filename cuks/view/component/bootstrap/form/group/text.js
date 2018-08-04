'use strict'

module.exports = function(cuk) {
  const { _ } = cuk.pkg.core.lib

  return (params = {}, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)
    const items = ['name', 'value', 'readonly', 'plain', 'placeholder', 'textSize',
      'disabled', 'inputId', 'inputCls',
      'tt', 'ttDir', 'po', 'poDir', 'poTitle', 'poContainer', 'poNoDismiss']
    const input = {}

    _.each(items, item => {
      if (params[item]) {
        const key = item.substr(0, 5) === 'input' ? _.lowerFirst(item.substr(5)) : item
        input[key] = params[item]
      }
    })
    params = _.merge(params, {
      input: cmpt('text', params.input ? params.input : input)
    })
    return cmpt('formGroup', params)
  }
}