// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/dash/overview/rooms_edit/index.marko",
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
              "/rooms/edit\" class=\"breadcrumb\">Private Rooms</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<script>\n\n      editor = true;\n    \n      guild = " +
              marko_escapeScript(JSON.stringify(input.guild)) +
              ";\n      settings = " +
              marko_escapeScript(JSON.stringify(input.settings)) +
              ";\n      try { settings.logs = JSON.parse(settings.logging); }catch(ex){ settings.logs = {}; }\n\n      settings.roomsWhitelist   = JSON.parse(settings.roomsWhitelist);\n      settings.roomsBlacklist   = JSON.parse(settings.roomsBlacklist);\n      \n      settings.roomsPermissions = JSON.parse(settings.roomsPermissions);\n      settings.roomsDefaults = JSON.parse(settings.roomsDefaults);\n\n      saveURL = '/api/guild/'+guild.id+'/submitChanges/rooms'\n      //saveURL = 'https://rqbintt.herokuapp.com/usidk6us'\n\n      function createSettingsObject(){\n\n          var result = {}\n          \n          result.enable = getBool('roomsEnable');\n          \n          result.room_defaults_name             = $('#room_defaults_name').val();\n          result.room_defaults_nsfw             = getBool('room_defaults_nsfw');\n          result.room_defaults_links            = getBool('room_defaults_links');\n          result.room_defaults_ptt              = getBool('room_defaults_ptt');\n          result.room_defaults_member_limit     = Number($('#room_defaults_member_limit').val());\n          result.room_defaults_files            = getBool('room_defaults_files');\n          result.room_defaults_bitrate          = Number($('#room_defaults_bitrate').val());\n          result.room_defaults_unlock           = getBool('rooms_defaults_unlock');\n\n          result.roomsWhitelist                 = $('#roomsWhitelist').val();\n          result.roomsBlacklist                 = $('#roomsBlacklist').val();\n\n          result.category_text                  = $('#rooms_category_text').val();\n          result.category_voice                 = $('#rooms_category_voice').val();\n\n          result.roomsInactiveTimer             = $('#roomsInactiveTimer').val();\n          result.roomsSummonChannel             = $('#roomsSummonChannel').val();\n\n          result.rooms_perms_nsfw               = getBool('rooms_perms_nsfw');\n          result.rooms_perms_members            = getBool('rooms_perms_members');\n          result.rooms_perms_bitrate            = getBool('rooms_perms_bitrate');\n          result.rooms_perms_speaker            = getBool('rooms_perms_speaker');\n          result.rooms_perms_embed              = getBool('rooms_perms_embed');\n          result.rooms_perms_name               = getBool('rooms_perms_name');\n          result.rooms_perms_unlock             = getBool('rooms_perms_unlock');\n          result.rooms_perms_ptt                = getBool('rooms_perms_ptt');\n          result.rooms_perms_files              = getBool('rooms_perms_files');\n\n          result.roomsBots                      = getBool('roomsBots');\n          result.roomsVisiblity                 = getBool('roomsVisible');\n\n          result.roomsType                      = getRadio('roomType')\n\n        return JSON.stringify(result);\n\n      }\n    \n    </script><div class=\"container\" id=\"welcomer\"><br><br><h1> <a class=\"yellow-text\" href=\"/g/" +
              marko_escapeXmlAttr(input.guild.id) +
              "/\"><</a> " +
              marko_escapeXml(input.guild.name) +
              " </h1><span class=\"guild-id\">Private Rooms - Settings</span></div><div class=\"container\" id=\"config-content\"><form method=\"POST\"><div id=\"rooms-toggle\"><br><br><div class=\"row\"><div class=\"col s12 m12 l8 left-align\"><h5>Enable Rooms</h5><i>Enable this module, Members with access can create their own private channels.</i></div><div class=\"col s12 m12 l4 right-align\"><br><div class=\"switch\"><label>Off ");

            if (input.settings.roomsEnabled) {
              out.w("<input type=\"checkbox\" id=\"roomsEnable\" name=\"roomsEnable\" checked>");
            } else {
              out.w("<input type=\"checkbox\" id=\"roomsEnable\" name=\"roomsEnable\">");
            }

            out.w("<span class=\"lever\"></span> On</label></div></div> </div></div><hr><div id=\"rooms-settings\"><div class=\"row\"><br><div class=\"col s12\"><h5>Room Type</h5><i>What types of channels should be attached to the room?</i></div></div><div class=\"row\"><div class=\"col s12\"><br><div class=\"col s12 m4\"><div class=\"card-panel m-dark clickable\"><input name=\"roomType\" type=\"radio\" id=\"VOICE\" value=\"VOICE\"><label>Voice</label></div></div><div class=\"col s12 m4\"><div class=\"card-panel m-dark clickable\"><input name=\"roomType\" type=\"radio\" id=\"TEXT\" value=\"TEXT\"><label>Text</label></div></div><div class=\"col s12 m4\"><div class=\"card-panel m-dark clickable\"><input name=\"roomType\" type=\"radio\" id=\"BOTH\" value=\"BOTH\"><label>Voice & Text</label></div></div></div></div></div><hr><div id=\"rooms-details\"><div class=\"row\"><br><div class=\"col s12 m12 l8 left-align\"><h5>Visibility</h5><i>Should rooms be visible to those who can't join them?</i></div><div class=\"col s12 m12 l4 right-align\"><br><div class=\"switch\"><label>Off ");

            if (input.settings.roomsDefaults.visible == true) {
              out.w("<input type=\"checkbox\" id=\"roomsVisible\" name=\"roomsVisible\" checked>");
            } else {
              out.w("<input type=\"checkbox\" id=\"roomsVisible\" name=\"roomsVisible\">");
            }

            out.w("<span class=\"lever\"></span> On</label></div><br><br></div> </div> <hr><div class=\"row\"><br><div class=\"col s12 m12 l8 left-align\"><h5>Bots</h5><i>Should we add any bots on the server to the room?</i></div><div class=\"col s12 m12 l4 right-align\"><br><div class=\"switch\"><label>Off ");

            if (input.settings.roomsDefaults.bots) {
              out.w("<input type=\"checkbox\" id=\"roomsBots\" name=\"roomsBots\" checked>");
            } else {
              out.w("<input type=\"checkbox\" id=\"roomsBots\" name=\"roomsBots\">");
            }

            out.w("<span class=\"lever\"></span> On</label></div><br><br></div> </div><hr><div class=\"row\"><br><div class=\"col s12 m12 l8 left-align\"><h5>Lobby Channel</h5><i>Select a voice channel to act as a lobby for private rooms, When a user joins this channel. A room will be assigned to them. (Will only work with Voice / Voice & Text Rooms)</i></div><div class=\"col s12 m12 l4 right-align\"><br><div class=\"input-field col s12\"><select id=\"roomsSummonChannel\" name=\"roomsSummonChannel\" class=\"voice-channel-select\"><option value=\"NONE\" selected>No Channel</option></select></div></div> </div><hr><div class=\"row\"><br><div class=\"col s12 m12 l8 left-align\"><h5>Idle Limit</h5><i>How long should rooms remain empty / inactive before being deleted?</i></div><div class=\"col s12 m12 l4 right-align\"><br><div class=\"input-field col s12\"><select id=\"roomsInactiveTimer\" name=\"roomsInactiveTimer\"><option value=\"0\" disabled selected>Choose your option</option><option value=\"30\">30 Seconds</option><option value=\"60\">1 Minute</option><option value=\"300\">5 Minutes</option><option value=\"1800\">30 Minutes</option><option value=\"3600\">1 Hour</option><option value=\"-1\">Indefinetly</option></select></div></div> </div></div><hr><div id=\"rooms-default\"><div class=\"row\"><div class=\"col s12\"><h5>Room Permissions</h5><i>Control Exactly who can create / modify rooms</i><br><br></div></div><div class=\"row\"><div class=\"col s12 m6\"><div class=\"row\">Whitelisted Roles (Can Summon):<br><div class=\"input-field col s10\" id=\"whitelistCollection\"><input hidden data-collection=\"whitelistCollection\" value=\"[]\" id=\"roomsWhitelist\" name=\"roomsWhitelist\" type=\"text\"><br><div class=\"chip bold manager-yellow\" data-target=\"whitelistCollection\" data-type=\"role\" onclick=\"addRole(this);\"> + </div></div></div></div><div class=\"col s12 m6\"><div class=\"row\">Blacklisted Roles (Cannot Summon:<br><sub class=\"left\">Takes priority over whitelist.</sub><div class=\"input-field col s10\" id=\"blacklistCollection\"><input hidden data-collection=\"blacklistCollection\" value=\"[]\" id=\"roomsBlacklist\" name=\"roomsBlacklist\" type=\"text\"><br><div class=\"chip bold manager-yellow\" data-target=\"blacklistCollection\" data-type=\"role\" onclick=\"addRole(this);\"> + </div></div></div><script> \n                $(function() {\n                  updateChips();\n                }); \n              </script><div id=\"dialog-select\" class=\"modal bottom-sheet grey darken-4\" style=\"overflow:visible\"><div class=\"modal-content\"><div class=\"input-field col s12\" style=\"z-index: 1000 !important;\"><select class=\"role-filled\" onchange=\"addSelected(this, 'role', false)\"><option id=\"inputReset\" value=\"NONE\" disabled selected>Select a role...</option>");

            var for__144 = 0;

            marko_forEach(input.guild.roles, function(item) {
              var keyscope__145 = "[" + ((for__144++) + "]");

              out.w("<option style=\"color: #" +
                marko_escapeXmlAttr(item.color) +
                ";\" data-icon=\"/api/color/" +
                marko_escapeXmlAttr(item.color) +
                "\" value=\"" +
                marko_escapeXmlAttr(item.id) +
                "\"> " +
                marko_escapeXml(item.name) +
                "</option>");
            });

            out.w("</select><label>Add A Role</label></div></div></div></div></div></div><hr><div id=\"rooms-default\"><div class=\"row\"><div class=\"col s12\"><h5>Room Customization</h5><i>Check the items you want members to be able to change</i><br><br></div></div><div class=\"row\"><div class=\"col s12\"><div class=\"card-panel m-dark white-text\"><h5>Both Channels</h5><p><input type=\"checkbox\" class=\"checkbox-manager\" id=\"rooms_perms_name\" name=\"rooms_perms_name\"><label for=\"rooms_perms_name\" class=\"white-text\">Channel Name</label></p> <p><input type=\"checkbox\" class=\"checkbox-manager\" id=\"rooms_perms_unlock\" name=\"rooms_perms_unlock\"><label for=\"rooms_perms_unlock\" class=\"white-text\">Locking / Unlocking</label></p></div></div><div class=\"col s12 m6 l6\"><div class=\"card-panel m-dark white-text\"><h5>Voice Channel</h5><p><input type=\"checkbox\" class=\"checkbox-manager\" id=\"rooms_perms_ptt\" name=\"rooms_perms_ptt\"><label for=\"rooms_perms_ptt\" class=\"white-text\">Push To Talk</label></p> <p><input type=\"checkbox\" class=\"checkbox-manager\" id=\"rooms_perms_bitrate\" name=\"rooms_perms_bitrate\"><label for=\"rooms_perms_bitrate\" class=\"white-text\">Bitrate</label></p><p><input type=\"checkbox\" class=\"checkbox-manager\" id=\"rooms_perms_members\" name=\"rooms_perms_members\"><label for=\"rooms_perms_members\" class=\"white-text\">Member Limit</label></p> <p><input type=\"checkbox\" class=\"checkbox-manager\" id=\"rooms_perms_speaker\" name=\"rooms_perms_speaker\"><label for=\"rooms_perms_speaker\" class=\"white-text\">Priority Speakers</label></p></div></div><div class=\"col s12 m6 l6\"><div class=\"card-panel m-dark white-text\"><h5>Text Channel</h5><p><input type=\"checkbox\" class=\"checkbox-manager\" id=\"rooms_perms_files\" name=\"rooms_perms_files\"><label for=\"rooms_perms_files\" class=\"white-text\">File Uploads</label></p><p><input type=\"checkbox\" class=\"checkbox-manager\" id=\"rooms_perms_embed\" name=\"rooms_perms_embed\"><label for=\"rooms_perms_embed\" class=\"white-text\">Link Embeds</label></p><p><input type=\"checkbox\" class=\"checkbox-manager\" id=\"rooms_perms_nsfw\" name=\"rooms_perms_nsfw\"><label for=\"rooms_perms_nsfw\" class=\"white-text\">NSFW Tag</label></p></div></div></div></div><hr><div id=\"rooms-default\"><div class=\"row\"><div class=\"col s12\"><h5>Room Defaults</h5><i>The default values for your server.</i><br><br></div></div><div class=\"row\"><div class=\"col s12\"><div class=\"card-panel m-dark white-text\"><h5>Both Channels</h5><sub>Channel Name</sub><input placeholder=\"Private Rooms [{user}]\" id=\"room_defaults_name\" name=\"room_defaults_name\" type=\"text\" class=\"validate\"><p><input type=\"checkbox\" class=\"checkbox-manager\" id=\"rooms_defaults_unlock\" name=\"rooms_defaults_unlock\"><label for=\"rooms_defaults_unlock\" class=\"white-text\">Start Unlocked</label></p></div></div><div class=\"col s12 m6 l6\"><div class=\"card-panel m-dark white-text\"><h5>Voice Channel</h5><br><sub>Channel Category</sub><select class=\"category-channel-select\" id=\"rooms_category_voice\" name=\"rooms_category_voice\"><option value=\"NONE\">No Category</option></select><br><div class=\"row\"><div class=\"col s6 m6 l8\">Push To Talk</div><div class=\"col s6 m6 l4 right-align\"><div class=\"switch\"><label>No <input type=\"checkbox\" id=\"room_defaults_ptt\" name=\"room_defaults_ptt\"><span class=\"lever\"></span> Yes</label></div></div><br><br></div><p class=\"range-field\"><span>Member Limit:</span><input type=\"range\" id=\"room_defaults_member_limit\" name=\"room_defaults_member_limit\" min=\"0\" max=\"99\"></p> <p class=\"range-field\"><span>Bitrate: (x1000)</span><input type=\"range\" id=\"room_defaults_bitrate\" name=\"room_defaults_bitrate\" min=\"8\" max=\"96\"></p></div></div><div class=\"col s12 m6 l6\"><div class=\"card-panel m-dark white-text\"><h5>Text Channel</h5><br><sub>Channel Category</sub><select class=\"category-channel-select\" id=\"rooms_category_text\" name=\"rooms_category_text\"><option value=\"NONE\">No Category</option></select><br><div class=\"row\"><div class=\"col s6 m6 l8\">NSFW Flag</div><div class=\"col s6 m6 l4 right-align\"><div class=\"switch\"><label>No <input type=\"checkbox\" id=\"room_defaults_nsfw\" name=\"room_defaults_nsfw\"><span class=\"lever\"></span> Yes</label></div></div><br></div><div class=\"row\"><div class=\"col s6 m6 l8\">Allow Files</div><div class=\"col s6 m6 l4 right-align\"><div class=\"switch\"><label>No <input type=\"checkbox\" id=\"room_defaults_files\" name=\"room_defaults_files\"><span class=\"lever\"></span> Yes</label></div></div><br></div><div class=\"row\"><div class=\"col s6 m6 l8\">Allow Link Embeds</div><div class=\"col s6 m6 l4 right-align\"><div class=\"switch\"><label>No <input type=\"checkbox\" id=\"room_defaults_links\" name=\"room_defaults_links\"><span class=\"lever\"></span> Yes</label></div></div><br></div></div></div></div></div></form>");

            unsavedChanges_tag({}, out, __component, "265");

            out.w("<script>\n\n      $( document ).ready(function() {\n          \n        //roomsEnable\n         $('#roomsEnable').prop('checked', settings.roomsEnabled )     \n         $('#roomsBots').prop('checked', settings.roomsDefaults.bots )   \n         $('#roomsVisible').prop('checked', settings.roomsDefaults.visible )          \n         \n         //RoosmType\n         if( settings.roomsType == \"VOICE\" ) $('#VOICE').prop('checked', true);         \n         if( settings.roomsType == \"TEXT\" ) $('#TEXT').prop('checked', true);   \n         if( settings.roomsType == \"BOTH\" ) $('#BOTH').prop('checked', true);   \n\n        //roomsPermissions\n        settings.roomsWhitelist.forEach( i => {\n          $('#whitelistCollection').append('<div class=\"chip chip-item\" data-item-id=\"'+i+'\" data-type=\"role\" onclick=\"removeChip(this)\"></div>')\n        })        \n        settings.roomsBlacklist.forEach( i => {\n          $('#blacklistCollection').append('<div class=\"chip chip-item\" data-item-id=\"'+i+'\" data-type=\"role\" onclick=\"removeChip(this)\"></div>')\n        })\n\n        // Room Permissions\n        $('#rooms_perms_name').prop('checked', settings.roomsPermissions.name); \n        $('#rooms_perms_members').prop('checked', settings.roomsPermissions.memberlimit); \n        $('#rooms_perms_bitrate').prop('checked', settings.roomsPermissions.bitrate); \n        $('#rooms_perms_ptt').prop('checked', settings.roomsPermissions.ptt); \n        $('#rooms_perms_embed').prop('checked', settings.roomsPermissions.embeds); \n        $('#rooms_perms_files').prop('checked', settings.roomsPermissions.files); \n        $('#rooms_perms_nsfw').prop('checked', settings.roomsPermissions.nsfw); \n        $('#rooms_perms_speaker').prop('checked', settings.roomsPermissions.speaker); \n        $('#rooms_perms_unlock').prop('checked', settings.roomsPermissions.allowLock); \n\n\n        // Room Defaults\n        $('#room_defaults_name').val(settings.roomsDefaults.name); \n\n        $('#room_defaults_member_limit').val(settings.roomsDefaults.memberlimit); \n        $('#room_defaults_bitrate').val(settings.roomsDefaults.bitrate); \n        $('#room_defaults_ptt').prop('checked', settings.roomsDefaults.ptt); \n        $('#rooms_defaults_unlock').prop('checked', settings.roomsDefaults.startUnlock); \n\n        $('#room_defaults_embed').prop('checked', settings.roomsDefaults.embeds); \n        $('#room_defaults_files').prop('checked', settings.roomsDefaults.files); \n        $('#room_defaults_nsfw').prop('checked', settings.roomsDefaults.nsfw); \n\n        $('select[name=rooms_category_voice]').val(settings.roomsCategory)\n        $('select[name=rooms_category_text]').val(settings.roomsCategoryText)\n\n        $('select[name=roomsInactiveTimer]').val(settings.roomsInactiveTimer)\n        $('select[name=roomsSummonChannel]').val(settings.roomsSummonChannel)\n\n        $('select').material_select();\n\n      });\n\n\n      $(\"form\").submit(function(e) {\n\n         $.ajax({\n          type: \"POST\",\n          url: saveURL,\n          data: createSettingsObject(), // serializes the form's elements.    \n          dataType: 'json',\n          contentType: \"application/json\", // send as JSON\n          success: function(response)\n          {\n\n            Materialize.toast(response.message, 1000)\n            if(response.error == undefined){\n              $(\"#UnsavedChanges\").slideUp(\"fast\");\n            }\n          },\n          complete: function(data){\n            console.log(data);\n          }\n        });\n\n        e.preventDefault(); // avoid to execute the actual submit of the form.\n\n      });\n\n      </script></div>");
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
    id: "/manager-web3$1.0.0/src/routes/dash/overview/rooms_edit/index.marko",
    tags: [
      "../../../../components/unsavedChanges",
      "../../../../components/site-layout"
    ]
  };
