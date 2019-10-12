// Compiled using marko@4.9.2 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/dash/overview/leveling/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_escapeScript = marko_helpers.xs,
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
              "/levels/edit\" class=\"breadcrumb\">Levels</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<script>\n\n      editor = true;\n    \n      guild = " +
              marko_escapeScript(JSON.stringify(input.guild)) +
              ";\n      settings = " +
              marko_escapeScript(JSON.stringify(input.settings)) +
              ";\n      try { settings.logs = JSON.parse(settings.logging); }catch(ex){ settings.logs = {}; }\n\n      settings.levels   = JSON.parse(settings.levels);\n\n      saveURL = '/api/guild/'+guild.id+'/submitChanges/levels'\n\n      function createSettingsObject(){\n\n        var result = {}\n\n        result.levels         = settings.levels;\n        result.ranksEnabled   = getBool('ranksEnabled');\n        result.LevelUpNotify  = $('#LevelUpNotify').val();\n\n        return JSON.stringify(result);\n\n      }\n    \n    </script><div class=\"container\" id=\"welcomer\"><br><br><h1> <a class=\"yellow-text\" href=\"/g/" +
              marko_escapeXmlAttr(input.guild.id) +
              "/\"><</a> " +
              marko_escapeXml(input.guild.name) +
              " </h1><span class=\"guild-id\">Levels - Settings</span></div><div class=\"container\" id=\"config-content\"><form method=\"POST\"><div id=\"levels-toggle\"><br><br><div class=\"row\"><div class=\"col s12 m12 l8 left-align\"><h5>XP Gain</h5><i>Should we allow members to gain XP?</i></div><div class=\"col s12 m12 l4 right-align\"><br><div class=\"switch\"><label>No ");

            if (input.settings.ranksEnabled) {
              out.w("<input type=\"checkbox\" id=\"ranksEnabled\" name=\"ranksEnabled\" checked>");
            } else {
              out.w("<input type=\"checkbox\" id=\"ranksEnabled\" name=\"ranksEnabled\">");
            }

            out.w("<span class=\"lever\"></span> Yes</label></div></div> </div></div><div class=\"row\"><div class=\"col s12 m12 l8 left-align\"><h5>Notifications</h5><i>How should we notify people when they level up?</i></div><div class=\"col s12 m12 l4 right-align\"><br><select id=\"LevelUpNotify\" name=\"LevelUpNotify\"><option value=\"0\">No Notification</option><option value=\"1\">React with 🎉</option><option value=\"2\">Send a message</option></select></div> </div><div id=\"levels-area\"><div class=\"row\"><div class=\"col s12 m12 left-align\"><h5>LevelUp Rewards</h5><i>What rewards should be handed out when someone levels up to a certain level?</i><br><br></div><div class=\"col s12\"><div class=\"card-panel grey darken-4\"><table><thead><tr><th>Level</th><th>Reward</th><th class=\"right\">Options</th></tr></thead><tbody id=\"LevelRewardTable\"></tbody></table><br><br><h5>Add Reward</h5><i>Add a new reward to the rewards list.</i><br><br><div class=\"row\"><table><tbody><tr><td><br><input placeholder=\"0\" id=\"addRewardLVNumber\" type=\"number\" class=\"wheelable\" min=\"2\" value=\"2\" autocomplete=\"off\"></td><td><br><select class=\"role-select\" id=\"AddRewardRoleSelector\"></select></td><td><a class=\"waves-effect waves-light blue btn\" onclick=\"addReward();\" style=\"width: 100%\"><i class=\"material-icons\">add</i></a></td></tr></tbody></table></div><script for=\"Syncronize the display of rewards with the actual object.\">\n\n                function updateTable(){\n\n                  var table = $('#LevelRewardTable'); //Actually gets the TBODY!!\n                  table.html('')\n\n                  var indx = 0;\n\n                  settings.levels.rewards.forEach( reward => {\n                    \n                    table.append('<tr><td>'+reward.level+'</td><td class=\"roleID\">'+reward.reward+'</td><td class=\"right\"><a onclick=\"removeReward('+indx+');\" class=\"waves-effect red waves-light btn\"><i class=\"material-icons\">delete</i></a></td></tr>')\n                    indx++;\n                  \n                  })\n\n                  $( \".roleID\" ).each(function( index ) {\n\n                    var roleID = $( this ).text()\n\n                    guild.roles.forEach( role => {\n                      if(role.id == roleID){\n                        $(this).text(role.name)\n                      }\n                    })\n\n                  });\n\n                }\n\n                function removeReward( index ){\n\n                  settings.levels.rewards.splice(index, 1);\n\n                  updateTable();\n                  TriggerUnsaved();\n\n                }\n\n                function addReward(){\n\n                  if( settings.levels.rewards.length > 20){\n                    Materialize.toast(\"You can't have more than 20 rewards.\", 2000);\n                    return;\n                  }\n\n                  var level = Number($('#addRewardLVNumber').val());\n                  var role  = String($('#AddRewardRoleSelector').val());\n\n                  settings.levels.rewards.push( {\n                    level: level,\n                    reward: role,\n                    rewardType: \"role\"\n                  })\n\n                  updateTable();\n                  TriggerUnsaved();\n\n                }\n\n                updateTable();\n\n              </script></div></div></div></div><hr></form>");

            unsavedChanges_tag({}, out, __component, "80");

            out.w("<script>\n\n      $( document ).ready(function() {\n\n        $('#ranksEnabled').prop('checked', settings.levels.enable);\n        $('#LevelUpNotify').val(settings.levels.notify)\n\n      });\n\n\n      $(\"form\").submit(function(e) {\n\n         $.ajax({\n          type: \"POST\",\n          url: saveURL,\n          data: createSettingsObject(), // serializes the form's elements.    \n          dataType: 'json',\n          contentType: \"application/json\", // send as JSON\n          success: function(response)\n          {\n\n            Materialize.toast(response.message, 1000)\n            if(response.error == undefined){\n              $(\"#UnsavedChanges\").slideUp(\"fast\");\n            }\n          },\n          complete: function(data){\n            console.log(data);\n          }\n        });\n\n        e.preventDefault(); // avoid to execute the actual submit of the form.\n\n      });\n\n      </script></div>");
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
    id: "/manager-web3$1.0.0/src/routes/dash/overview/leveling/index.marko",
    tags: [
      "../../../../components/unsavedChanges",
      "../../../../components/site-layout"
    ]
  };
