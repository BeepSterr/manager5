// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/dash/overview/index.marko",
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
    site_layout_template = marko_loadTemplate(require.resolve("../../../components/site-layout")),
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
              "</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<div class=\"container\" id=\"welcomer\"><script>\n\n        editor = false;\n      \n        guild = " +
              marko_escapeScript(JSON.stringify(input.guild)) +
              ";\n        settings = " +
              marko_escapeScript(JSON.stringify(input.settings)) +
              ";\n    \n      </script><h1> <img class=\"icon\" style=\"max-height: 100px\" src=\"" +
              marko_escapeXmlAttr(input.guild.icon) +
              "\"> " +
              marko_escapeXml(input.guild.name) +
              " </h1><ul id=\"dashmenu\" class=\"collapsible expandable\"><li><div class=\"collapsible-header\"><i class=\"material-icons\">bar_chart</i>Server Details</div><div class=\"collapsible-body\"><table><thead><tr><th>Overview</th></tr></thead><tbody><tr><td>Server ID</td><td>" +
              marko_escapeXml(input.guild.id) +
              "</td></tr><tr><td>Members</td><td>" +
              marko_escapeXml(input.guild.memberCount) +
              "</td></tr><tr><td>Roles</td><td>" +
              marko_escapeXml(input.guild.roleCount) +
              "</td></tr></tbody></table> <br><table><thead><tr><th>Roles</th></tr></thead><tbody>");

            var for__38 = 0;

            marko_forEach(input.guild.roles, function(key) {
              var keyscope__39 = "[" + ((for__38++) + "]");

              out.w("<tr style=\"background-color: " +
                marko_escapeXmlAttr(key.color) +
                "26 \"><td>" +
                marko_escapeXml(key.name) +
                "</td><td>" +
                marko_escapeXml(key.id) +
                "</td></tr>");
            });

            out.w("</tbody></table></div></li><li class=\"active\"><div class=\"collapsible-header\"><i class=\"material-icons\">dashboard</i>Manager Features</div><div class=\"collapsible-body\"><div class=\"module-list row\"><div class=\"col s12 m12 l6\"><div class=\"card white\"><div class=\"card-content black-text\"><span class=\"card-title\">General</span><p>Set the prefix, Language, Ranks & Blocked commands here.</p><br><a href=\"./server/edit\" class=\"waves-effect waves-light btn-flat\">Modify Settings</a></div></div></div><div class=\"col s12 m12 l6\"><div class=\"card white\"><div class=\"card-content black-text\"><span class=\"card-title\">Private Rooms</span><p>Allow members to create their own temporary rooms!</p><br><a href=\"./rooms/edit\" class=\"waves-effect waves-light btn-flat\">Modify Settings</a></div></div></div><div class=\"col s12 m12 l6\"><div class=\"card white\"><div class=\"card-content black-text\"><span class=\"card-title\">Server Logs</span><p>Log actions on your server to text channels!</p><br><a href=\"./logs/edit\" class=\"waves-effect waves-light btn-flat\">Modify Settings</a></div></div></div><div class=\"col s12 m12 l6\"><div class=\"card white\"><div class=\"card-content black-text\"><span class=\"card-title\">Levels & Ranking</span><p>Allow your members to earn XP to level up and earn rewards!</p><br><a href=\"./levels/edit\" class=\"waves-effect waves-light btn-flat\">Modify Settings</a><a href=\"./leaderboard\" class=\"waves-effect waves-light btn-flat\">Leaderboards</a></div></div></div><div class=\"col s12 m12 l6\"><div class=\"card white\"><div class=\"card-content black-text\"><span class=\"card-title\">Moderation</span><p>Automatically Moderate your channels.</p><br><a href=\"./automod/edit\" class=\"waves-effect waves-light btn-flat\">Modify Settings</a></div></div></div><div class=\"col s12 m12 l6\"><div class=\"card white\"><div class=\"card-content black-text\"><span class=\"card-title\">Analytics</span><p>See when your members are most active, and more!</p><br><a href=\"./analize\" class=\"waves-effect waves-light btn-flat\">View Data</a></div></div></div></div></div></li></ul></div><script>\n      $(function(){\n        $('.collapsible').collapsible('open', 1);\n      })\n    </script>");
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
    id: "/manager-web3$1.0.0/src/routes/dash/overview/index.marko",
    tags: [
      "../../../components/site-layout"
    ]
  };
