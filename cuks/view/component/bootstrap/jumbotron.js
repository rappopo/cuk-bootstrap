'use strict'

module.exports = function (cuk) {
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    let content = `<div class="jumbotron${params.fluid ? ' jumbotron-fluid' : ''}" ${lib.attr(params)}>\n`
    if (params.fluid) content += `<div class="container">\n`
    if (params.title) content += `<h1 class="display-4">${params.title}</h1>\n`
    if (params.lead) content += `<p class="lead">${params.lead}</p>\n`
    if (params.divider) content += `<hr class="my-4" />\n`
    if (params.content) content += params.content
    if (params.fluid) content += `</div>\n`
    content += `</div>\n`
    return content
  }
}
