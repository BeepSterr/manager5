// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/faq/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    site_layout_template = marko_loadTemplate(require.resolve("../../components/site-layout")),
    marko_loadTag = marko_helpers.t,
    site_layout_tag = marko_loadTag(site_layout_template);

function render(input, out, __component, component, state) {
  var data = input;

  site_layout_tag({
      title: {
          renderBody: function renderBody(out) {
            out.w("FAQ");
          }
        },
      crumbs: {
          renderBody: function renderBody(out) {
            out.w("<nav style=\"height: 40px;\"><div class=\"nav-wrapper grey darken-4\" style=\"padding-left: 25px; line-height:40px\"><div class=\"col s12\"><a href=\"/\" class=\"breadcrumb\">Manager</a><a href=\"/faq\" class=\"breadcrumb\">FAQ</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<div class=\"center\"><br><h3>Frequently Asked Questions</h3><p>If you can't find our answer here, Join the support server and ask there!</p></div><br><br><div class=\"container black-text\"><div class=\"row\">");

            var for__17 = 0;

            marko_forEach(input.faqs_pinned, function(faq) {
              var keyscope__18 = "[" + ((for__17++) + "]");

              out.w("<div class=\"col s12 m6\"><a href=\"/faq/" +
                marko_escapeXmlAttr(faq.id) +
                "\" class=\"white-text\"><div class=\"card-panel\"><h5 class=\"black-text\">" +
                marko_escapeXml(faq.title) +
                "</h5><span class=\"black-text\">" +
                marko_escapeXml(faq.desc) +
                "</span></div></a></div> ");
            });

            out.w(" </div> </div> <br><div class=\"container\"><div class=\"row\">");

            var for__27 = 0;

            marko_forEach(input.faqs, function(faq) {
              var keyscope__28 = "[" + ((for__27++) + "]");

              out.w("<a href=\"/faq/" +
                marko_escapeXmlAttr(faq.id) +
                "\" class=\"white-text\"><div class=\"col s12\"><b style=\"font-size: 150%\">" +
                marko_escapeXml(faq.title) +
                "</b><br><span>" +
                marko_escapeXml(faq.desc) +
                "</span><br><br></div></a>");
            });

            out.w("</div></div>");
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
    id: "/manager-web3$1.0.0/src/routes/faq/index.marko",
    tags: [
      "../../components/site-layout"
    ]
  };
