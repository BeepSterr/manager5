// Compiled using marko@4.9.2 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/dash/overview/leveling/leaderboard/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_escapeScript = marko_helpers.xs,
    marko_forEach = marko_helpers.f,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    site_layout_template = marko_loadTemplate(require.resolve("../../../../../components/site-layout")),
    marko_loadTag = marko_helpers.t,
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
            out.w("<nav style=\"height: 40px;\"><div class=\"nav-wrapper grey darken-4\" style=\"padding-left: 25px; line-height:40px\"><div class=\"col s12\"><a href=\"/\" class=\"breadcrumb\">Manager</a><a href=\"/g/" +
              marko_escapeXmlAttr(input.guild.id) +
              "\" class=\"breadcrumb\">" +
              marko_escapeXml(input.guild.name) +
              "</a><a href=\"/g/" +
              marko_escapeXmlAttr(input.guild.id) +
              "/leaderboard\" class=\"breadcrumb\">Leaderboards</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<script>\n\n      editor = false;\n    \n      guild = " +
              marko_escapeScript(JSON.stringify(input.guild)) +
              ";\n      leaders = " +
              marko_escapeScript(JSON.stringify(input.leaders)) +
              ";\n    \n    </script><div class=\"container\" id=\"welcomer\"><br><br><h1>" +
              marko_escapeXml(input.guild.name) +
              "</h1><span class=\"guild-id\">Leaderboards</span></div><div class=\"container\" id=\"config-content\"><div id=\"leaderboard\"><br><br><div class=\"row\"><div class=\"col s12\"><table><tbody>");

            marko_forEach(input.leaders, function(player) {
              if (player.rank <= 50) {
                out.w("<tr id=\"leaderboard-entry-" +
                  marko_escapeXmlAttr(player.rank) +
                  "\" class=\"playerrank\"><td>#" +
                  marko_escapeXml(player.rank) +
                  "</td><td class=\"GetMember\" data-member-id=\"" +
                  marko_escapeXmlAttr(player.member) +
                  "\">" +
                  marko_escapeXml(player.name) +
                  "</td><td>Level " +
                  marko_escapeXml(player.level) +
                  "</td><td>" +
                  marko_escapeXml(player.xpTotal) +
                  " XP</td></tr>");
              }
            });

            out.w("</tbody></table>");

            if (input.leaders.length > 50) {
              out.w("<div class=\"center\"><h5>And " +
                marko_escapeXml(input.leaders.length - 50) +
                " more</h5></div>");
            }

            out.w("<script>\n                  \n                  $('document').ready(function(){\n\n                    // Give rank colors\n\n                    $('#leaderboard-entry-1').addClass('gold');\n                    $('#leaderboard-entry-2').addClass('silver');\n                    $('#leaderboard-entry-3').addClass('bronze');\n\n                  });\n\n                </script></div> </div></div></div>");
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
    id: "/manager-web3$1.0.0/src/routes/dash/overview/leveling/leaderboard/index.marko",
    tags: [
      "../../../../../components/site-layout"
    ]
  };
