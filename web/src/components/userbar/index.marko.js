// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/components/userbar/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_forEach = marko_helpers.f,
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_loadTag = marko_helpers.t,
    asset_var_tag = marko_loadTag(require("@lasso/marko-taglib/taglib/asset-var/renderer")),
    marko_attr = marko_helpers.a;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"userbar\">");

  if (input.isAuth == true) {
    var for__1 = 0;

    marko_forEach(input.guilds, function(item) {
      var keyscope__2 = "[" + ((for__1++) + "]");

      out.w("<a class=\"tooltipped\" data-position=\"bottom\" data-delay=\"50\" data-tooltip=\" " +
        marko_escapeXmlAttr(item.name) +
        " \" href=\"/g/" +
        marko_escapeXmlAttr(item.id) +
        "\"><img class=\"icon\" src=\"" +
        marko_escapeXmlAttr(item.icon) +
        "\"></a>");
    });

    out.w("<a href=\"/invite\" class=\"tooltipped\" data-position=\"bottom\" data-delay=\"50\" data-tooltip=\"Invite manager\">");

    asset_var_tag({
        values: [
            require.resolve("./add_server.png")
          ],
        renderBody: function renderBody(out, __src) {
          out.w("<img class=\"icon\"" +
            marko_attr("src", __src.url) +
            ">");
        }
      }, out, __component, "14");

    asset_var_tag({
        values: [
            require.resolve("./unknown_server.png")
          ],
        renderBody: function renderBody(out, __src) {
          out.w("<img class=\"icon\" style=\"width:0px;height:0px;position:fixed;top:-999px;display:none;\"" +
            marko_attr("src", __src.url) +
            ">");
        }
      }, out, __component, "15");

    out.w("</a><i class=\"spacer\"></i><a href=\"/user/" +
      marko_escapeXmlAttr(input.user.id) +
      "\" class=\"tooltipped\" data-position=\"bottom\" data-delay=\"50\" data-tooltip=\" " +
      marko_escapeXmlAttr(input.user.username) +
      " \"><img class=\"icon\" src=\"https://cdn.discordapp.com/avatars/" +
      marko_escapeXmlAttr(input.user.id) +
      "/" +
      marko_escapeXmlAttr(input.user.avatar) +
      ".jpg\"></a>");
  } else {
    out.w("<a href=\"/auth\" class=\"tooltipped\" data-position=\"bottom\" data-delay=\"50\" data-tooltip=\" Login \">");

    asset_var_tag({
        values: [
            require.resolve("./add_server.png")
          ],
        renderBody: function renderBody(out, __src) {
          out.w("<img class=\"icon\"" +
            marko_attr("src", __src.url) +
            ">");
        }
      }, out, __component, "16");

    out.w("</a><i class=\"spacer\"></i>");
  }

  out.w("</div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/manager-web3$1.0.0/src/components/userbar/index.marko",
    tags: [
      "@lasso/marko-taglib/taglib/asset-var/renderer"
    ]
  };
