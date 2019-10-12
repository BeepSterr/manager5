// Compiled using marko@4.9.2 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/dash/overview/logs/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_escapeScript = marko_helpers.xs,
    marko_attr = marko_helpers.a,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    logItem_template = marko_loadTemplate(require.resolve("../../../../components/logItem")),
    marko_loadTag = marko_helpers.t,
    logItem_tag = marko_loadTag(logItem_template),
    unsavedChanges_template = marko_loadTemplate(require.resolve("../../../../components/unsavedChanges")),
    unsavedChanges_tag = marko_loadTag(unsavedChanges_template),
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
            out.w("<nav style=\"height: 40px;\"><div class=\"nav-wrapper grey darken-4\" style=\"padding-left: 25px; line-height:40px\"><div class=\"col s12\"><a href=\"/\" class=\"breadcrumb\">Manager</a><a href=\"/g/" +
              marko_escapeXmlAttr(input.guild.id) +
              "\" class=\"breadcrumb\">" +
              marko_escapeXml(input.guild.name) +
              "</a><a href=\"/g/" +
              marko_escapeXmlAttr(input.guild.id) +
              "/logs/edit\" class=\"breadcrumb\">Logging</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<script>\r\n\r\n      editor = true;\r\n      log = [];\r\n    \r\n      guild = " +
              marko_escapeScript(JSON.stringify(input.guild)) +
              ";\r\n      settings = " +
              marko_escapeScript(JSON.stringify(input.settings)) +
              ";\r\n      try { settings.logs = JSON.parse(settings.logging); }catch(ex){ settings.logs = {}; }\r\n\r\n      saveURL = '/api/guild/'+guild.id+'/submitChanges/logging'\r\n\r\n      function createSettingsObject(){\r\n\r\n          var result = {}\r\n          result.enabled = getBool('logging_enable');\r\n          result.default_channel = $('#logging_channel').val();\r\n\r\n          result.logItems = [];\r\n\r\n          log.forEach( item => {\r\n            result.logItems.push( {\r\n              event: item,\r\n               enabled: getBool('log-enabled-' + item),\r\n              channel: $('#log-channel-' + item).find(':selected').val()\r\n            })\r\n          })\r\n\r\n        return JSON.stringify(result);\r\n\r\n      }\r\n    \r\n    </script><div class=\"container\" id=\"welcomer\"><br><br><h1> <a class=\"yellow-text\" href=\"/g/" +
              marko_escapeXmlAttr(input.guild.id) +
              "/\"><</a> " +
              marko_escapeXml(input.guild.name) +
              " </h1><span class=\"guild-id\">Logging - Settings</span></div><div class=\"container\" id=\"config-content\"><form action=\"https://rqbintt.herokuapp.com/rt9ih8rt\" method=\"POST\"><div id=\"logging-toggle\"><br><br><div class=\"row\"><div class=\"col s12 m12 l8 left-align\"><h5>Enable Logging</h5><i>Quickly enable / disable logging.</i></div><div class=\"col s12 m12 l4 right-align\"><br><div class=\"switch\"><label>Off <input type=\"checkbox\" id=\"logging_enable\" name=\"logging_enable\"" +
              marko_attr("checked", JSON.parse(input.settings.logging).enabled) +
              "><span class=\"lever\"></span> On</label></div></div> </div></div><div id=\"logging-channel\"><br><div class=\"row\"><div class=\"col s12 m12 l8 left-align\"><h5>Default Channel</h5><i>All logs will end up in this channel, Unless set to a different channel.</i></div><div class=\"col s12 m12 l4 right-align\"><div class=\"input-field\"><br><select class=\"text-channel-select\" id=\"logging_channel\" name=\"logging_channel\"></select><label>Default Channel</label></div> </div> </div></div><hr><div id=\"rooms-default\"><div class=\"row\"><div class=\"col s12\"><h5>Events to log</h5><i>Check the boxes of the items you want to log, Also change the channel if needed.</i><br><br><a onclick=\"$(&quot;input[id^='log-enabled-']&quot;).prop('checked', true);\" class=\"waves-effect waves-light btn blue\">Check all</a> <span style=\"opacity:0\">spa</span><a onclick=\"$(&quot;input[id^='log-enabled-']&quot;).prop('checked', false);\" class=\"waves-effect waves-light btn red\">Check none</a><br><br></div></div><div class=\"row\"><div class=\"col s12\">");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "guildUpdate",
                name: "Server Changed",
                desc: "When the servers settings are changed."
              }, out, __component, "58");

            out.w("<br>");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "guildMemberAdd",
                name: "Member Joins",
                desc: "When someone joins the server."
              }, out, __component, "60");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "guildMemberRemove",
                name: "Member Leaves",
                desc: "When a member leaves the server."
              }, out, __component, "61");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "guildMemberUpdate",
                name: "Member Updated",
                desc: "When a member gets their roles/name changed"
              }, out, __component, "62");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "joinVoice",
                name: "Join Voice Channel",
                desc: "When someone joins a voice channel."
              }, out, __component, "63");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "leaveVoice",
                name: "Leave Voice Channel",
                desc: "When someone leaves a voice channel."
              }, out, __component, "64");

            out.w("<br>");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "guildBanAdd",
                name: "Member Ban",
                desc: "When a member gets banned."
              }, out, __component, "66");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "guildBanRemove",
                name: "Member Unban",
                desc: "When a member gets unbanned."
              }, out, __component, "67");

            out.w("<br>");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "messageUpdate",
                name: "Message Edits",
                desc: "When a message gets edited."
              }, out, __component, "69");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "messageDelete",
                name: "Mesage Deletion",
                desc: "When a message gets deleted."
              }, out, __component, "70");

            out.w("<br>");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "channelCreate",
                name: "Channel Created",
                desc: "When a channel is Created"
              }, out, __component, "72");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "channelUpdate",
                name: "Channel Changed",
                desc: "When a channel is Changed"
              }, out, __component, "73");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "channelDelete",
                name: "Channel Deleted",
                desc: "When a channel is Deleted"
              }, out, __component, "74");

            out.w("<br>");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "emojiCreate",
                name: "Emoji Created",
                desc: "When a Emoji is Created"
              }, out, __component, "76");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "emojiUpdate",
                name: "Emoji Changed",
                desc: "When a Emoji is Changed"
              }, out, __component, "77");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "emojiDelete",
                name: "Emoji Deleted",
                desc: "When a Emoji is Deleted"
              }, out, __component, "78");

            out.w("<br>");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "roleCreate",
                name: "Role Created",
                desc: "When a Role is Created"
              }, out, __component, "80");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "roleDelete",
                name: "Role Changed",
                desc: "When a Role is Changed"
              }, out, __component, "81");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "roleUpdate",
                name: "Role Deleted",
                desc: "When a Role is Deleted"
              }, out, __component, "82");

            out.w("<br>");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "roomCreated",
                name: "Room Summon",
                desc: "When a private room is created"
              }, out, __component, "84");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "roomDeleted",
                name: "Room Revoke",
                desc: "When a private room is deleted"
              }, out, __component, "85");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "roomUpdated",
                name: "Room Updated",
                desc: "When a private room's settings are changed"
              }, out, __component, "86");

            out.w("<br>");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "configUpdate",
                name: "Config Updated",
                desc: "When the servers configuration is reloaded due to a change."
              }, out, __component, "88");

            out.w("<br>");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "levelUp",
                name: "Level Up",
                desc: "When a member levels up on your server."
              }, out, __component, "90");

            out.w("<br>");

            logItem_tag({
                l: JSON.parse(input.settings.logging),
                event: "autoMod",
                name: "autoMod Detections",
                desc: "When autoMod is triggered."
              }, out, __component, "92");

            out.w("</div></div></div></form>");

            unsavedChanges_tag({}, out, __component, "93");

            out.w("<script>\r\n\r\n      $( document ).ready(function() {\r\n\r\n        \r\n          $('#logging_channel').val(JSON.parse(settings.logging).default_channel);\r\n          \r\n          log.forEach( logItem => { \r\n            \r\n            JSON.parse(settings.logging).logItems.forEach( a =>{\r\n\r\n              if( a.event == logItem){\r\n\r\n                $('select[name=log-channel-'+logItem+']').val(a.channel)\r\n                $('#log-enabled-' + logItem).prop('checked', a.enabled);\r\n\r\n                console.log(a);\r\n\r\n              } \r\n\r\n            }) \r\n        })\r\n\r\n          $('select').material_select();\r\n\r\n      });\r\n\r\n\r\n      $(\"form\").submit(function(e) {\r\n\r\n         $.ajax({\r\n          type: \"POST\",\r\n          url: saveURL,\r\n          data: createSettingsObject(), // serializes the form's elements.    \r\n          dataType: 'json',\r\n          dataType: \"xml/html/script/json\", // expected format for response\r\n          contentType: \"application/json\", // send as JSON\r\n          complete: function(data)\r\n          {\r\n            var response = JSON.parse(data.responseText);\r\n\r\n            Materialize.toast(response.message, 1000)\r\n            if(response.error == undefined){\r\n              $(\"#UnsavedChanges\").slideUp(\"fast\");\r\n            }\r\n          }\r\n        });\r\n\r\n        e.preventDefault(); // avoid to execute the actual submit of the form.\r\n\r\n      });\r\n\r\n      </script></div>");
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
    id: "/manager-web3$1.0.0/src/routes/dash/overview/logs/index.marko",
    tags: [
      "../../../../components/logItem",
      "../../../../components/unsavedChanges",
      "../../../../components/site-layout"
    ]
  };
