// Compiled using marko@4.9.2 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/dash/overview/scripts/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_escapeScript = marko_helpers.xs,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    site_layout_template = marko_loadTemplate(require.resolve("../../../../components/site-layout")),
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
      content: {
          renderBody: function renderBody(out) {
            out.w("<script>\n    \n      guild = " +
              marko_escapeScript(JSON.stringify(input.guild)) +
              ";\n      settings = " +
              marko_escapeScript(JSON.stringify(input.settings)) +
              ";\n      try { settings.roomsWhitelist = JSON.parse(settings.roomsWhitelist); }catch(ex){ settings.roomsWhitelist = []; }\n      try { settings.roomsBlacklist = JSON.parse(settings.roomsWhitelist); }catch(ex){ settings.roomsBlacklist = []; }\n      try { settings.roomsDefaults = JSON.parse(settings.roomsDefaults); }catch(ex){ settings.roomsDefaults = []; }\n      try { settings.roomsPermissions = JSON.parse(settings.roomsPermissions); }catch(ex){ settings.roomsPermissions = []; }\n    \n    </script><div class=\"container\" id=\"welcomer\"><br><br><h1> " +
              marko_escapeXml(input.guild.name) +
              " </h1><span class=\"guild-id\">Assistant Scripts</span></div><div class=\"container\" id=\"config-content\"><form action=\"\" method=\"POST\"><div id=\"rooms-toggle\"><div class=\"card-panel gray darken-4\"><div class=\"col s6 m8 left\"><span class=\"card-title black-text\"> Auto-response test </span></div><div class=\"col s6 m4 right\"><i class=\"material-icons blue-text\">edit</i></div><br></div><div class=\"card-panel gray darken-4\"><div class=\"col s6 m8 left\"><span class=\"card-title black-text\"> Give role on join </span></div><div class=\"col s6 m4 right\"><i class=\"material-icons blue-text\">edit</i></div><br></div></div><br><div class=\"center\"><a class=\"waves-effect blue waves-light btn modal-trigger\" href=\"#modal1\"><i class=\"material-icons left\">add</i>New Script</a></div></form><div id=\"modal1\" class=\"modal white-text grey darken-3\" style=\"overflow:visible\"><div class=\"modal-content\"><h4>Create a new Script</h4><div class=\"step\" id=\"step1\" style=\"padding-right:20px\"><p>Step 1: Select a trigger</p><select style=\"z-index: 1000 !important;\"><option value=\"\" disabled selected>Choose a Trigger</option><optgroup label=\"Discord Message\"><option value=\"message\"> New Message</option><option value=\"messageUpdate\"> Deleted Message</option><option value=\"messageUpdate\"> Pinned Message</option></optgroup><optgroup label=\"Discord Members\"><option value=\"GuildMemberAdd\"> Member Join</option><option value=\"3\"> Member Leave</option></optgroup><optgroup label=\"Timed Events\"><option value=\"3\"> Every 5 Minutes</option><option value=\"3\"> Every 30 Minutes</option><option value=\"3\"> Every Hour</option></optgroup><optgroup label=\"Manager Events\"><option value=\"3\"> Private Room Summon</option><option value=\"3\"> Private Room Revoke</option></optgroup></select></div><div class=\"step hidden\" id=\"step2\"><p>Step 2: Add Conditions</p></div></div><div class=\"modal-footer grey darken-4 white-text\"><a href=\"#!\" class=\"waves-effect btn-flat white-text\">Next</a><a href=\"\" class=\"waves-effect btn-flat red-text left\">Exit</a></div></div></div>");
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
    id: "/manager-web3$1.0.0/src/routes/dash/overview/scripts/index.marko",
    tags: [
      "../../../../components/site-layout"
    ]
  };
