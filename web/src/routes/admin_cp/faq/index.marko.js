// Compiled using marko@4.9.2 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/admin_cp/faq/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    acpnav_template = marko_loadTemplate(require.resolve("../../../components/acpnav")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    acpnav_tag = marko_loadTag(acpnav_template),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
    site_layout_template = marko_loadTemplate(require.resolve("../../../components/site-layout")),
    site_layout_tag = marko_loadTag(site_layout_template);

function render(input, out, __component, component, state) {
  var data = input;

  site_layout_tag({
      title: {
          renderBody: function renderBody(out) {
            out.w("Manager");
          }
        },
      crumbs: {
          renderBody: function renderBody(out) {
            out.w("<nav style=\"height: 40px;\"><div class=\"nav-wrapper grey darken-4\" style=\"padding-left: 25px; line-height:40px\"><div class=\"col s12\"><a href=\"/\" class=\"breadcrumb\">Manager</a><a href=\"/acp\" class=\"breadcrumb\">ACP</a><a href=\"/acp/faq\" class=\"breadcrumb\">FAQ</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<div class=\"row center\"><div class=\"col offset-s0 offset-l1 l3 center\">");

            acpnav_tag({}, out, __component, "12");

            out.w("</div><div class=\"col l7 left-align\"><br><br><h4>FAQ</h4><table><thead><tr><th>#</th><th>Title</th><th>Views</th><th>Actions</th></tr></thead><tbody>");

            marko_forEach(input.faq, function(faq) {
              out.w("<tr><td>" +
                marko_escapeXml(faq.id) +
                "</td><td>" +
                marko_escapeXml(faq.title) +
                "</td><td>" +
                marko_escapeXml(faq.views) +
                "</td><td><a href=\"/acp/faq/edit/" +
                marko_escapeXmlAttr(faq.id) +
                "\" class=\"waves-effect btn-flat white-text blue\"><i class=\"material-icons\">edit</i></a><i class=\"spacer\"></i><a href=\"/api/acp/faq/delete/" +
                marko_escapeXmlAttr(faq.id) +
                "\" class=\"waves-effect btn-flat white-text red\"><i class=\"material-icons\">delete</i></a></td></tr>");
            });

            out.w("</tbody></table><br><a href=\"/acp/faq/new\" class=\"waves-effect btn-flat grey-text text-lighten-1\"><i class=\"material-icons left\">add</i> Add</a></div></div>");
          }
        },
      [hasRenderBodyKey]: true
    }, out, __component, "0");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/manager-web3$1.0.0/src/routes/admin_cp/faq/index.marko",
    tags: [
      "../../../components/acpnav",
      "../../../components/site-layout"
    ]
  };
