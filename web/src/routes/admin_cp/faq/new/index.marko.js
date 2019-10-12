// Compiled using marko@4.9.2 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/admin_cp/faq/new/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    acpnav_template = marko_loadTemplate(require.resolve("../../../../components/acpnav")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    acpnav_tag = marko_loadTag(acpnav_template),
    site_layout_template = marko_loadTemplate(require.resolve("../../../../components/site-layout")),
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
            out.w("<nav style=\"height: 40px;\"><div class=\"nav-wrapper grey darken-4\" style=\"padding-left: 25px; line-height:40px\"><div class=\"col s12\"><a href=\"/\" class=\"breadcrumb\">Manager</a><a href=\"/acp\" class=\"breadcrumb\">ACP</a><a href=\"/acp/faq\" class=\"breadcrumb\">FAQ</a><a href=\"/acp/faq/new\" class=\"breadcrumb\">new</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<div class=\"row center\"><div class=\"col offset-s0 offset-l1 l3 center\">");

            acpnav_tag({}, out, __component, "13");

            out.w("</div><div class=\"col l7 left-align\"><br><br><h4>FAQ - New Post</h4><form action=\"/api/acp/faq/create\" method=\"POST\"><div class=\"row\"><div class=\"input-field col s12\"><span>Post Title</span><input required id=\"pTitle\" name=\"pTitle\" type=\"text\" class=\"validate\"></div></div><div class=\"row\"><div class=\"row\"><div class=\"input-field col s12\"><span>Post Description</span><textarea id=\"pDesc\" name=\"pDesc\" class=\"materialize-textarea\"></textarea></div></div></div><div class=\"row\"><div class=\"row\"><div class=\"input-field col s12\"><span>Post Content (Markdown)</span><textarea id=\"pContent\" name=\"pContent\" class=\"materialize-textarea\"></textarea></div></div><button class=\"btn waves-effect waves-light\" type=\"submit\" name=\"action\">Submit <i class=\"material-icons right\">send</i></button></div></form></div><script>\n        sseditor = new SimpleMDE({ element: document.getElementById(\"pContent\"), forceSync: true, spellChecker: false, toolbar: [\"bold\", \"italic\", \"strikethrough\", \"heading\", \"|\", \"quote\", \"code\", \"table\", \"|\", \"image\", \"link\", \"|\", \"preview\", \"fullscreen\"], });\n      </script></div>");
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
    id: "/manager-web3$1.0.0/src/routes/admin_cp/faq/new/index.marko",
    tags: [
      "../../../../components/acpnav",
      "../../../../components/site-layout"
    ]
  };
