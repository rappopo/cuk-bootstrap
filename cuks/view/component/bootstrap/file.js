'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    let content = ''
    if (params.custom) content += '<div class="custom-file">\n'
    let cls = `${params.custom ? 'custom-file-input' : 'form-control-file'} `
    if (params.cls) cls += `${params.cls} `
    if (params.textSize) cls += `form-control-${params.textSize} `
    if (params.textColor) cls += `content-${params.textColor} `
    content += `<input type="file" ${lib.attr(params, 'file')} class="${_.trim(cls)}">\n`
    if (params.custom) {
      let forId = params.id ? `for="${params.id}"` : ''
      content += `<label class="custom-file-label" ${forId}>${params.placeholder || ''}</label>`
      content += '</div>\n'
    }
    if (params.custom && params.name && !params.noChangePlaceholderScript) {
      content += `
<script>
$(function(){
  $("[type=file][name=${params.name}]").change(function () {
    var fieldVal = $(this).val();
    fieldVal = fieldVal.replace("C:\\\\fakepath\\\\", "")
    if (fieldVal != undefined || fieldVal != "") {
      $(this).next(".custom-file-label").text(fieldVal)
    }
  })
})
</script>
      `
    }
    return content
  }
}
