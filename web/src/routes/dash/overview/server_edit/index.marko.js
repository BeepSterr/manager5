// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/dash/overview/server_edit/index.marko",
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
    unsavedChanges_template = marko_loadTemplate(require.resolve("../../../../components/unsavedChanges")),
    marko_loadTag = marko_helpers.t,
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
              "/server/edit\" class=\"breadcrumb\">General Settings</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<script>\n\n      editor = true;\n    \n      guild = " +
              marko_escapeScript(JSON.stringify(input.guild)) +
              ";\n      settings = " +
              marko_escapeScript(JSON.stringify(input.settings)) +
              ";\n      try { settings.logs = JSON.parse(settings.logging); }catch(ex){ settings.logs = {}; }\n\n      settings.disabledFeatures = JSON.parse(settings.disabledFeatures);\n\n      saveURL = '/api/guild/'+guild.id+'/submitChanges/server'\n\n      function createSettingsObject(){\n\n        var result = {}\n\n        result.blockedCommands    = $('#BlockedCommands').val();\n        result.disabled           = getBool('disabled');\n        \n        \n        result.stickers           = getBool('stickers');\n        result.embeds             = getBool('embeds');\n\n        \n        result.mods               = $('#modList').val();\n        result.admins             = $('#adminList').val();\n\n\n        result.prefix             = $('#prefix').val();\n        result.lang               = $('#lang').val();\n\n        return JSON.stringify(result);\n\n      }\n    \n    </script><div class=\"container\" id=\"welcomer\"><br><br><h1> <a class=\"yellow-text\" href=\"/g/" +
              marko_escapeXmlAttr(input.guild.id) +
              "/\"><</a> " +
              marko_escapeXml(input.guild.name) +
              " </h1></div><div class=\"container\" id=\"config-content\"><form method=\"POST\"><div id=\"rooms-toggle\"><h3>Usability</h3><div class=\"row\"><div class=\"col s12 m12 l8 left-align\"><h5>Disable Manager</h5><i>Check this if you want manager to not work on your server.</i></div><div class=\"col s12 m12 l4 right-align\"><br><div class=\"switch\"><label>Enable Bot ");

            if (input.settings.disabled) {
              out.w("<input type=\"checkbox\" id=\"disabled\" name=\"disabled\" checked>");
            } else {
              out.w("<input type=\"checkbox\" id=\"disabled\" name=\"disabled\">");
            }

            out.w("<span class=\"lever\"></span> Disable Bot</label></div></div> </div></div> <div id=\"rooms-toggle\"><div class=\"row\"><div class=\"col s12 m12 l8 left-align\"><h5>Language</h5><i>Change the langauge Manager will use on your server.</i></div><div class=\"col s12 m12 l4 right-align\"><br><div class=\"input-field col s12\"><select id=\"lang\" name=\"lang\" class=\"lang-select\"><option disabled selected>Choose your option</option></select></div></div> </div></div><hr><div id=\"rooms-toggle\"><h3>Customization</h3><div class=\"row\"><div class=\"col s12 m12 l8 left-align\"><h5>Prefix</h5><i>Change the prefix manager uses.</i></div><div class=\"col s12 m12 l4 right-align\"><br><input value=\"m!\" id=\"prefix\" name=\"prefix\" type=\"text\" placeholder=\"m!\"><br></div> </div></div><div id=\"rooms-default\"><div class=\"row\"><div class=\"col s12 m12 left-align\"><h5>Blocked Commands</h5><i>Add commands to the list below to disable them.</i></div><div class=\"col s12\"><div class=\"row\"><div class=\"input-field col s10\" id=\"blockedCommandCollection\"><input hidden data-collection=\"blockedCommandCollection\" value=\"[]\" id=\"BlockedCommands\" name=\"BlockedCommands\" type=\"text\"><br><div class=\"chip bold manager-yellow\" data-target=\"blockedCommandCollection\" data-type=\"commands\" onclick=\"addRole(this, false);\"> + </div></div></div></div><script> \n                $(function() {\n                  updateChips();\n                }); \n              </script><div id=\"dialog-select\" class=\"modal bottom-sheet grey darken-4\" style=\"overflow:visible\"><div class=\"modal-content\"><span>Select a command to block</span><br><div class=\"input-field col s8 offset-s2 center\" style=\"z-index: 1000 !important;\">");

            var for__69 = 0;

            marko_forEach(input.guild.commands, function(item) {
              var keyscope__70 = "[" + ((for__69++) + "]");

              out.w("<div class=\"chip chip-item tooltipped\" data-position=\"top\" data-tooltip=\"" +
                marko_escapeXmlAttr(item.description) +
                "\" data-type=\"selector\" data-item-id=\"" +
                marko_escapeXmlAttr(item.name) +
                "\" onclick=\"addSelected(this, 'command', true)\">" +
                marko_escapeXml(item.name) +
                "</div>");
            });

            out.w("<br><br></div></div></div></div></div><hr><div class=\"ranks\"><h3>Ranks</h3><div class=\"row\"><div class=\"col s12 m12 left-align\"><h5>Admin Roles</h5><i>Add Roles to be admins / moderators</i><br><br></div> <div class=\"col s12 m6\"><div class=\"row\">Moderators:<br><div class=\"input-field col s10\" id=\"modCollection\"><input hidden data-collection=\"modCollection\" value=\"[]\" id=\"modList\" name=\"modList\" type=\"text\"><br><div class=\"chip bold manager-yellow\" data-modal=\"role\" data-target=\"modCollection\" data-type=\"role\" onclick=\"addRole(this);\"> + </div></div></div></div><div class=\"col s12 m6\"><div class=\"row\">Admins:<br><div class=\"input-field col s10\" id=\"adminCollection\"><input hidden data-collection=\"adminCollection\" value=\"[]\" id=\"adminList\" name=\"adminList\" type=\"text\"><br><div class=\"chip bold manager-yellow\" data-modal=\"role\" data-target=\"adminCollection\" data-type=\"role\" onclick=\"addRole(this);\"> + </div></div></div><script> \n                  $(function() {\n                    updateChips();\n                  }); \n                </script><div id=\"dialog-select-role\" class=\"modal bottom-sheet grey darken-4\" style=\"overflow:visible\"><div class=\"modal-content\"><div class=\"input-field col s12\" style=\"z-index: 1000 !important;\"><select class=\"role-filled\" onchange=\"addSelected(this, 'role', false)\"><option id=\"inputReset\" value=\"NONE\" disabled selected>Select a role...</option>");

            var for__103 = 0;

            marko_forEach(input.guild.roles, function(item) {
              var keyscope__104 = "[" + ((for__103++) + "]");

              out.w("<option value=\"" +
                marko_escapeXmlAttr(item.id) +
                "\" data-icon=\"/api/color/" +
                marko_escapeXmlAttr(item.color) +
                "\">" +
                marko_escapeXml(item.name) +
                " </option>");
            });

            out.w("</select><label>Add A Role</label></div></div></div></div></div></div><hr><div id=\"rooms-toggle\"><h3>Extra Features</h3><div class=\"row\"><div class=\"col s12 m12 l8 left-align\"><h5>Enable Stickers</h5><i>Should members be allowed to use stickers on the server?</i></div><div class=\"col s12 m12 l4 right-align\"><br><div class=\"switch\"><label>Off <input type=\"checkbox\" id=\"stickers\" name=\"stickers\" checked><span class=\"lever\"></span> On</label></div></div> </div></div> <div id=\"rooms-toggle\"><div class=\"row\"><div class=\"col s12 m12 l8 left-align\"><h5>Enable Embeds+</h5><i>Should manager display it's extra embeds?</i></div><div class=\"col s12 m12 l4 right-align\"><br><div class=\"switch\"><label>Off <input type=\"checkbox\" id=\"embeds\" name=\"embeds\" checked><span class=\"lever\"></span> On</label></div></div> </div></div> <br><br><br></form>");

            unsavedChanges_tag({}, out, __component, "134");

            out.w("<script>\n\n      $( document ).ready(function() {\n\n        JSON.parse(settings.disabledCommands).forEach( i => {\n          $('#blockedCommandCollection').append('<div class=\"chip chip-item\" data-item-id=\"'+i+'\" data-type=\"command\" onclick=\"removeChip(this)\">'+i+'</div>')\n        }) \n\n        JSON.parse(settings.mods).forEach( i => {\n          $('#modCollection').append('<div class=\"chip chip-item\" data-item-id=\"'+i+'\" data-type=\"role\" onclick=\"removeChip(this)\">'+i+'</div>')\n        }) \n        JSON.parse(settings.admins).forEach( i => {\n          $('#adminCollection').append('<div class=\"chip chip-item\" data-item-id=\"'+i+'\" data-type=\"role\" onclick=\"removeChip(this)\">'+i+'</div>')\n        }) \n\n        $('select[name=lang]').val(settings.lang)\n        $('#prefix').val(settings.prefix)\n        \n        $('#stickers').prop('checked', !settings.disabledFeatures.includes('stickers') )   \n        $('#embeds').prop('checked', !settings.disabledFeatures.includes('embedsP') )   \n\n      });\n\n\n      $(\"form\").submit(function(e) {\n\n         $.ajax({\n          type: \"POST\",\n          url: saveURL,\n          data: createSettingsObject(), // serializes the form's elements.    \n          dataType: 'json',\n          contentType: \"application/json\", // send as JSON\n          success: function(response)\n          {\n\n            Materialize.toast(response.message, 1000)\n            if(response.error == undefined){\n              $(\"#UnsavedChanges\").slideUp(\"fast\");\n            }\n          },\n          complete: function(data){\n            console.log(data);\n          }\n        });\n\n        e.preventDefault(); // avoid to execute the actual submit of the form.\n\n      });\n\n      </script></div>");
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
    id: "/manager-web3$1.0.0/src/routes/dash/overview/server_edit/index.marko",
    tags: [
      "../../../../components/unsavedChanges",
      "../../../../components/site-layout"
    ]
  };
