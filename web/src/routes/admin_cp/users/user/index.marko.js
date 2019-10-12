// Compiled using marko@4.9.2 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/admin_cp/users/user/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    acpnav_template = marko_loadTemplate(require.resolve("../../../../components/acpnav")),
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
            out.w("<nav style=\"height: 40px;\"><div class=\"nav-wrapper grey darken-4\" style=\"padding-left: 25px; line-height:40px\"><div class=\"col s12\"><a href=\"/\" class=\"breadcrumb\">Manager</a><a href=\"/acp\" class=\"breadcrumb\">ACP</a><a href=\"/acp/users\" class=\"breadcrumb\">users</a><a href=\"/acp/user/" +
              marko_escapeXmlAttr(input.target_user.id) +
              "\" class=\"breadcrumb\"> " +
              marko_escapeXml(input.target_user.name) +
              " </a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<div class=\"row center\"><div class=\"col offset-s0 offset-l1 l3 center\">");

            acpnav_tag({}, out, __component, "13");

            out.w("</div><div class=\"col l7 left-align\"><br><br><h4>User - " +
              marko_escapeXml(input.target_user.name) +
              " </h4><iframe src=\"/user/" +
              marko_escapeXmlAttr(input.target_user.id) +
              "\" width=\"100%\" height=\"500px\"></iframe><br><p>Actions:</p>");

            if (input.target.ban_content == 0) {
              out.w("<a class=\"waves-effect waves-light btn red\" href=\"/api/acp/user/ban/" +
                marko_escapeXmlAttr(input.target_user.id) +
                "\">Content Ban</a>");
            } else {
              out.w("<a class=\"waves-effect waves-light btn green\" href=\"/api/acp/user/unban/" +
                marko_escapeXmlAttr(input.target_user.id) +
                "\">Undo Content Ban</a>");
            }

            out.w("<i class=\"spacer\"></i><a class=\"waves-effect waves-light btn orange\" href=\"/api/acp/user/clearb/" +
              marko_escapeXmlAttr(input.target_user.id) +
              "\">Clear Bio</a><i class=\"spacer\"></i><a class=\"waves-effect waves-light btn orange\" href=\"/api/acp/user/clears/" +
              marko_escapeXmlAttr(input.target_user.id) +
              "\">Clear Stickers</a></div></div>");
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
    id: "/manager-web3$1.0.0/src/routes/admin_cp/users/user/index.marko",
    tags: [
      "../../../../components/acpnav",
      "../../../../components/site-layout"
    ]
  };
