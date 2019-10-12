// Compiled using marko@4.9.2 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/dash/overview/automod/index.marko",
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
    marko_forEach = marko_helpers.f,
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
              "/automod/edit\" class=\"breadcrumb\">Moderation</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<script>\n\n      editor = true;\n    \n      guild = " +
              marko_escapeScript(JSON.stringify(input.guild)) +
              ";\n      settings = " +
              marko_escapeScript(JSON.stringify(input.settings)) +
              ";\n      try { settings.logs = JSON.parse(settings.logging); }catch(ex){ settings.logs = {}; }\n\n      settings.autoMod = JSON.parse(settings.autoMod);\n\n      saveURL = '/api/guild/'+guild.id+'/submitChanges/autoMod'\n\n      function createSettingsObject(){\n\n        var result = {}\n\n\n        result.invites      = {}\n        result.badlinks     = {}\n        result.caps         = {}\n        result.listBoost    = {}\n        result.mentions     = {}\n        result.gmentions    = {}\n        result.words        = {}\n\n\n        result.invites.enabled      = getBool('autoMod_Invites');\n        result.invites.ech          = $('#InvitesExclude').val();\n\n        result.badlinks.enabled     = getBool('autoMod_BadLinks');\n        result.badlinks.ech         = $('#BadLinksExclude').val();\n\n        result.caps.enabled         = getBool('autoMod_AllCaps');\n        result.caps.ech             = $('#AllCapsExclude').val();\n        result.caps.range           = Number($('#AllCapsRange').val());\n\n        result.listBoost.enabled    = getBool('autoMod_ListBoost');\n\n        result.mentions.enabled     = getBool('autoMod_Mentions');\n        result.mentions.ech         = $('#MentionsExclude').val();\n        result.mentions.range       = Number($('#MentionsRange').val());\n\n        result.gmentions.enabled    = getBool('autoMod_GhostMentions');\n        result.gmentions.ech        = $('#GMentionsExclude').val();\n\n        result.words.enabled        = getBool('autoMod_words');\n        result.words.ech            = $('#WordsExclude').val();\n        result.words.words          = $('#WordsList').val();\n\n\n\n        return JSON.stringify(result);\n\n      }\n\n      function extraOptionVisibilityToggle( target ){\n\n        var object = $(target);\n        var expandedOptions = $('#' + object.attr('id') + \"_Expanded\")\n\n        if(object.is(\":checked\")){\n          expandedOptions.fadeIn('fast');\n        }else{\n          expandedOptions.fadeOut('fast');\n        }\n\n      }\n    \n    </script><div class=\"container\" id=\"welcomer\"><br><br><h1> <a class=\"yellow-text\" href=\"/g/" +
              marko_escapeXmlAttr(input.guild.id) +
              "/\"><</a> " +
              marko_escapeXml(input.guild.name) +
              " </h1></div><div class=\"container\" id=\"config-content\"><form method=\"POST\"><h3>AutoMod Detections</h3><br><div class=\"row\"><div class=\"col s12\"><div class=\"item card-panel grey darken-4\"><div class=\"row\"><div class=\"col s2 m2 l1 eventitem center-align\"><br><input onchange=\"extraOptionVisibilityToggle(this)\" type=\"checkbox\" class=\"checkbox-manager\" id=\"autoMod_Invites\" name=\"autoMod_Invites\"><label for=\"autoMod_Invites\"></label></div><div class=\"col s10 m10 l11\"><h5 onclick=\"\">Discord Invites</h5><i onclick=\"\">Disallow invites to other discord servers.</i></div></div><div class=\"row\" id=\"autoMod_Invites_Expanded\"><div class=\"col s12\"><div class=\"row\"><div class=\"col s12 m12 l5 left-align offset-l1\"><br><b>Excluded Channels</b><br><i>Discord Invites will not be deleted in these channels.</i></div><div class=\"col s12 m12 l6 left-align\"><div class=\"input-field col s10\" id=\"InvitesExcludeCollection\"><input hidden data-collection=\"InvitesExcludeCollection\" value=\"[]\" id=\"InvitesExclude\" name=\"InvitesExclude\" type=\"text\"><br><div class=\"chip bold manager-yellow\" data-modal=\"txt\" data-target=\"InvitesExcludeCollection\" data-type=\"textChannel\" onclick=\"addRole(this);\"> + </div></div></div> </div></div></div></div><div class=\"item card-panel grey darken-4\"><div class=\"row\"><div class=\"col s2 m2 l1 eventitem center-align\"><br><input onchange=\"extraOptionVisibilityToggle(this)\" type=\"checkbox\" class=\"checkbox-manager\" id=\"autoMod_BadLinks\" name=\"autoMod_BadLinks\"><label for=\"autoMod_BadLinks\"></label></div><div class=\"col s10 m10 l11\"><h5 onclick=\"\">Bad Links</h5><i onclick=\"\">Links posted will be checked for Phishing & Malware against the Google Safe Browsing API.</i></div></div><div class=\"row\" id=\"autoMod_BadLinks_Expanded\"><div class=\"col s12\"><div class=\"row\"><div class=\"col s12 m12 l5 left-align offset-l1\"><br><b>Excluded Channels</b><br><i>Bad Links will not be deleted in these channels.</i></div><div class=\"col s12 m12 l6 left-align\"><div class=\"input-field col s10\" id=\"BadLinksExcludeCollection\"><input hidden data-collection=\"BadLinksExcludeCollection\" value=\"[]\" id=\"BadLinksExclude\" name=\"BadLinksExclude\" type=\"text\"><br><div class=\"chip bold manager-yellow\" data-modal=\"txt\" data-target=\"BadLinksExcludeCollection\" data-type=\"textChannel\" onclick=\"addRole(this);\"> + </div></div></div> </div></div></div></div><div class=\"item card-panel grey darken-4\"><div class=\"row\"><div class=\"col s2 m2 l1 eventitem center-align\"><br><input onchange=\"extraOptionVisibilityToggle(this)\" type=\"checkbox\" class=\"checkbox-manager\" id=\"autoMod_AllCaps\" name=\"autoMod_AllCaps\"><label for=\"autoMod_AllCaps\"></label></div><div class=\"col s10 m10 l11\"><h5 onclick=\"\">All Caps</h5><i onclick=\"\">DELETES MESSAGES LIKE THIS LOLOLOL</i></div></div><div class=\"row\" id=\"autoMod_AllCaps_Expanded\"><div class=\"col s12\"><div class=\"row\"><div class=\"col s12 m12 l5 left-align offset-l1\"><br><b>EXCLUDED CHANNELS</b><br><i>MESSAGES WITH ALL CAPS WILL NOT BE DELETED IN THESE CHANNELS</i></div><div class=\"col s12 m12 l6 left-align\"><div class=\"input-field col s10\" id=\"AllCapsExcludeCollection\"><input hidden data-collection=\"AllCapsExcludeCollection\" value=\"[]\" id=\"AllCapsExclude\" name=\"AllCapsExclude\" type=\"text\"><br><div class=\"chip bold manager-yellow\" data-modal=\"txt\" data-target=\"AllCapsExcludeCollection\" data-type=\"textChannel\" onclick=\"addRole(this);\"> + </div></div></div> </div> <br> <div class=\"row\"><div class=\"col s12 m12 l5 left-align offset-l1\"><b>CAPS%</b><br><i>HOW MUCH % OF THE MESSAGE SHOULD BE CAPITAL LETTERS TO BE CONSIDERED ALL CAPS</i></div><div class=\"col s12 m12 l6 left-align\"><p class=\"range-field\"><span>Capital Letter %:</span><input type=\"range\" id=\"AllCapsRange\" name=\"AllCapsRange\" min=\"50\" max=\"100\" step=\"5\"></p> </div> </div></div></div></div><div class=\"item card-panel grey darken-4\"><div class=\"row\"><div class=\"col s2 m2 l1 eventitem center-align\"><br><input onchange=\"extraOptionVisibilityToggle(this)\" type=\"checkbox\" class=\"checkbox-manager\" id=\"autoMod_ListBoost\" name=\"autoMod_ListBoost\"><label for=\"autoMod_ListBoost\"></label></div><div class=\"col s10 m10 l11\"><h5 onclick=\"\">Listboosting</h5><i onclick=\"\">Resets NickNames of members trying to use special characters like !, ~ and ? to appear on the top of the member list.</i></div></div><div class=\"row\" id=\"autoMod_ListBoost_Expanded\"><div class=\"col s12\"><div class=\"row\"><div class=\"col s12 m12 l5 left-align offset-l1\"><i>There isn't any extra options to configure..</i></div> </div></div></div></div><div class=\"item card-panel grey darken-4\"><div class=\"row\"><div class=\"col s2 m2 l1 eventitem center-align\"><br><input onchange=\"extraOptionVisibilityToggle(this)\" type=\"checkbox\" class=\"checkbox-manager\" id=\"autoMod_Mentions\" name=\"autoMod_Mentions\"><label for=\"autoMod_Mentions\"></label></div><div class=\"col s10 m10 l11\"><h5 onclick=\"\">Mass-Mention</h5><i onclick=\"\">Delets messages mentioning many people.</i></div></div><div class=\"row\" id=\"autoMod_Mentions_Expanded\"><div class=\"col s12\"><div class=\"row\"><div class=\"col s12 m12 l5 left-align offset-l1\"><br><b>Excluded Channels</b><br><i>Channels where Mass Mentioning will be allowed.</i></div><div class=\"col s12 m12 l6 left-align\"><div class=\"input-field col s10\" id=\"MentionsExcludeCollection\"><input hidden data-collection=\"MentionsExcludeCollection\" value=\"[]\" id=\"MentionsExclude\" name=\"MentionsExclude\" type=\"text\"><br><div class=\"chip bold manager-yellow\" data-modal=\"txt\" data-target=\"MentionsExcludeCollection\" data-type=\"textChannel\" onclick=\"addRole(this);\"> + </div></div></div> </div> <br> <div class=\"row\"><div class=\"col s12 m12 l5 left-align offset-l1\"><b>Minimum Mentions to trigger</b><br><i>How many people need to be mentioned before this is triggered?</i></div><div class=\"col s12 m12 l6 left-align\"><p class=\"range-field\"><span>Mentions Required:</span><input type=\"range\" id=\"MentionsRange\" name=\"MentionsRange\" min=\"3\" max=\"10\" step=\"1\"></p> </div> </div></div></div></div><div class=\"item card-panel grey darken-4\"><div class=\"row\"><div class=\"col s2 m2 l1 eventitem center-align\"><br><input onchange=\"extraOptionVisibilityToggle(this)\" type=\"checkbox\" class=\"checkbox-manager\" id=\"autoMod_GhostMentions\" name=\"autoMod_GhostMentions\"><label for=\"autoMod_GhostMentions\"></label></div><div class=\"col s10 m10 l11\"><h5 onclick=\"\">Ghost Ping</h5><i>Will inform those affected where they were ghostpinged.</i></div></div><div class=\"row\" id=\"autoMod_GhostMentions_Expanded\"><div class=\"col s12\"><div class=\"row\"><div class=\"col s12 m12 l5 left-align offset-l1\"><br><b>Excluded Channels</b><br><i>Ghost pings are allowed in these channels.</i></div><div class=\"col s12 m12 l6 left-align\"><div class=\"input-field col s10\" id=\"GhostMentionsExcludeCollection\"><input hidden data-collection=\"GhostMentionsExcludeCollection\" value=\"[]\" id=\"GMentionsExclude\" name=\"GMentionsExclude\" type=\"text\"><br><div class=\"chip bold manager-yellow\" data-modal=\"txt\" data-target=\"GhostMentionsExcludeCollection\" data-type=\"textChannel\" onclick=\"addRole(this);\"> + </div></div></div> </div> </div></div></div><div class=\"item card-panel grey darken-4\"><div class=\"row\"><div class=\"col s2 m2 l1 eventitem center-align\"><br><input onchange=\"extraOptionVisibilityToggle(this)\" type=\"checkbox\" class=\"checkbox-manager\" id=\"autoMod_words\" name=\"autoMod_words\"><label for=\"autoMod_words\"></label></div><div class=\"col s10 m10 l11\"><h5 onclick=\"\">Banned Words</h5><i>Filter out messages containing words you don't like having blasted onto your eyes</i></div></div><div class=\"row\" id=\"autoMod_words_Expanded\"><div class=\"col s12\"><div class=\"row\"><div class=\"col s12 m12 l5 left-align offset-l1\"><br><b>Excluded Channels</b><br><i>Messages with banned words won't be deleted in these channels.</i></div><div class=\"col s12 m12 l6 left-align\"><div class=\"input-field col s10\" id=\"WordsExcludeCollection\"><input hidden data-collection=\"WordsExcludeCollection\" value=\"[]\" id=\"WordsExclude\" name=\"WordsExclude\" type=\"text\"><br><div class=\"chip bold manager-yellow\" data-modal=\"txt\" data-target=\"WordsExcludeCollection\" data-type=\"textChannel\" onclick=\"addRole(this);\"> + </div></div></div> </div> <div class=\"row\"><div class=\"col s12 m12 l5 left-align offset-l1\"><br><b>Word List</b><br><i>These words will trigger it.</i></div><div class=\"col s12 m12 l6 left-align\"><div class=\"input-field col s10\" id=\"BannedWordCollection\" style=\"margin-bottom: 15px\"><input hidden data-collection=\"BannedWordCollection\" value=\"[]\" id=\"WordsList\" name=\"WordsList\" type=\"text\"><br></div><input type=\"text\" id=\"BadWordAdder\" placeholder=\"Bad word goes here...\" data-target=\"BannedWordCollection\" data-type=\"string\" onclick=\"addRoleSilent(this);\"><script>\n                            $(\"#BadWordAdder\").on('keyup', function (e) {\n                                if (e.keyCode == 13) {\n                                    if($(\"#BadWordAdder\").val() != \"\"){\n\n                                      addSelected(this, 'string', true, true)\n                                      $(\"#BadWordAdder\").val('');\n\n                                    }\n                                }\n                            });\n                          </script></div> </div> </div></div></div></div></div></form></div>");

            unsavedChanges_tag({}, out, __component, "200");

            out.w("<script>\n\n      $( document ).ready(function() {\n\n        $('[id$=_Expanded]').hide();\n\n        $('#autoMod_Invites').prop('checked', settings.autoMod.filters.invites.enabled).trigger('change');\n        $('#autoMod_BadLinks').prop('checked', settings.autoMod.filters.bad_links.enabled).trigger('change');\n        $('#autoMod_AllCaps').prop('checked', settings.autoMod.filters.all_caps.enabled).trigger('change'); \n        $('#autoMod_ListBoost').prop('checked', settings.autoMod.filters.list_boost.enabled).trigger('change');\n        $('#autoMod_Mentions').prop('checked', settings.autoMod.filters.mass_ping.enabled).trigger('change');\n        $('#autoMod_GhostMentions').prop('checked', settings.autoMod.filters.ghost_ping.enabled).trigger('change');\n        $('#autoMod_words').prop('checked', settings.autoMod.filters.bad_words.enabled).trigger('change');\n\n        $('#AllCapsRange').val( settings.autoMod.filters.all_caps.caps_pct );\n        $('#MentionsRange').val( settings.autoMod.filters.mass_ping.max_pings );\n\n        //Excluded Channels\n        JSON.parse(settings.autoMod.filters.invites.excluded_channels).forEach( i => {\n          $('#InvitesExcludeCollection').append('<div class=\"chip chip-item\" data-item-id=\"'+i+'\" data-type=\"textChannel\" onclick=\"removeChip(this)\"></div>')\n        })          \n        JSON.parse(settings.autoMod.filters.bad_links.excluded_channels).forEach( i => {\n          $('#BadLinksExcludeCollection').append('<div class=\"chip chip-item\" data-item-id=\"'+i+'\" data-type=\"textChannel\" onclick=\"removeChip(this)\"></div>')\n        })          \n        JSON.parse(settings.autoMod.filters.all_caps.excluded_channels).forEach( i => {\n          $('#AllCapsExcludeCollection').append('<div class=\"chip chip-item\" data-item-id=\"'+i+'\" data-type=\"textChannel\" onclick=\"removeChip(this)\"></div>')\n        })          \n        JSON.parse(settings.autoMod.filters.mass_ping.excluded_channels).forEach( i => {\n          $('#MentionsExcludeCollection').append('<div class=\"chip chip-item\" data-item-id=\"'+i+'\" data-type=\"textChannel\" onclick=\"removeChip(this)\"></div>')\n        })          \n        JSON.parse(settings.autoMod.filters.ghost_ping.excluded_channels).forEach( i => {\n          $('#GhostMentionsExcludeCollection').append('<div class=\"chip chip-item\" data-item-id=\"'+i+'\" data-type=\"textChannel\" onclick=\"removeChip(this)\"></div>')\n        })            \n        JSON.parse(settings.autoMod.filters.bad_words.excluded_channels).forEach( i => {\n          $('#WordsExcludeCollection').append('<div class=\"chip chip-item\" data-item-id=\"'+i+'\" data-type=\"textChannel\" onclick=\"removeChip(this)\"></div>')\n        })  \n        JSON.parse(settings.autoMod.filters.bad_words.list).forEach( i => {\n          $('#BannedWordCollection').append('<div class=\"chip chip-item\" data-item-id=\"'+i+'\" data-type=\"string\" onclick=\"removeChip(this)\"></div>')\n        })  \n\n        updateChips();\n        SuspendUnsaved();\n              \n\n      });\n\n\n      $(\"form\").submit(function(e) {\n\n         $.ajax({\n          type: \"POST\",\n          url: saveURL,\n          data: createSettingsObject(), // serializes the form's elements.    \n          dataType: 'json',\n          contentType: \"application/json\", // send as JSON\n          success: function(response)\n          {\n\n            Materialize.toast(response.message, 1000)\n            if(response.error == undefined){\n              $(\"#UnsavedChanges\").slideUp(\"fast\");\n            }\n          },\n          complete: function(data){\n            console.log(data);\n          }\n        });\n\n        e.preventDefault(); // avoid to execute the actual submit of the form.\n\n      });\n\n      $(function() {\n        updateChips();\n      }); \n    </script><div id=\"dialog-select-txt\" class=\"modal bottom-sheet grey darken-4\" style=\"overflow:visible\"><div class=\"modal-content\"><span>Select a Text Channel</span><br><div class=\"input-field col s8 offset-s2 center\" style=\"z-index: 1000 !important;\"><select class=\"textChannel-filled\" onchange=\"addSelected(this, 'textChannel', false)\"><option id=\"inputReset\" value=\"NONE\" disabled selected>Select a channel...</option>");

            marko_forEach(input.guild.channels.text, function(item) {
              out.w("<option value=\"" +
                marko_escapeXmlAttr(item.id) +
                "\"> " +
                marko_escapeXml(item.name) +
                " </option>");
            });

            out.w("</select></div></div></div>");
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
    id: "/manager-web3$1.0.0/src/routes/dash/overview/automod/index.marko",
    tags: [
      "../../../../components/unsavedChanges",
      "../../../../components/site-layout"
    ]
  };
