// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/profile/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_escapeXml = marko_helpers.x,
    marko_escapeScript = marko_helpers.xs,
    marko_forEach = marko_helpers.f,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    site_layout_template = marko_loadTemplate(require.resolve("../../components/site-layout")),
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
            out.w("<nav style=\"height: 40px;\"><div class=\"nav-wrapper grey darken-4\" style=\"padding-left: 25px; line-height:40px\"><div class=\"col s12\"><a href=\"/\" class=\"breadcrumb\">Manager</a><a href=\"/user/" +
              marko_escapeXmlAttr(input.user.id) +
              "\" class=\"breadcrumb\">Members</a><a href=\"/user/" +
              marko_escapeXmlAttr(input.user.id) +
              "\" class=\"breadcrumb\">" +
              marko_escapeXml(input.user.name) +
              "</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<div class=\"container\" id=\"welcomer\"><script>\n\n          userEdit  = " +
              marko_escapeScript(input.you) +
              ";\n          user      = " +
              marko_escapeScript(JSON.stringify(input.user)) +
              ";\n          stickers  = " +
              marko_escapeScript(JSON.stringify(input.stickers)) +
              "\n          profile   = " +
              marko_escapeScript(JSON.stringify(input.profile)) +
              "\n\n          function FormFinished(){\n\n            console.log($('#PublishFrame').contents().find(\"html\").html())\n\n            if( $('#PublishFrame').contents().find(\"html\").html() != \"<head></head><body></body>\" ){\n\n              if( $('#PublishFrame').contents().find(\"html\").html() == \"<head></head><body>OK</body>\")\n                location.reload();\n\n              \n              Materialize.toast($('#PublishFrame').contents().find(\"html\").html(), 5000)\n            }\n\n          }\n\n          var currentSticker = \"0\";\n\n        function showStickerPanel( stickerID ){\n\n          stickers.forEach( sticker => {\n            if ( sticker.sticker == stickerID ){\n\n              $('#view-stickerCode').text(sticker.code);\n              $('#view-exmapleUsage').text(';' + sticker.code);\n              $('#view-stickerIMG').attr('src', 'https://stickers.managerbot.me/' + sticker.sticker + '.png');\n\n              $('#ViewSticker').modal('open');\n              currentSticker = stickerID;\n\n            }\n          })\n          \n\n        }\n\n        function deleteCurrentSticker( ){\n\n          var stick = currentSticker;\n          $.ajax({\n            url: '/api/stickers/delete/' + currentSticker,\n            success: (d)=>{\n              console.log(d)\n              location.reload();\n            },\n          });\n\n        }              \n\n      </script><br><br><div class=\"row\"><div class=\"col s12\"><div class=\"card\"><div class=\"card-image\"><img style=\"height: 150px; object-fit: cover;\" src=\"/content/backgrounds/" +
              marko_escapeXmlAttr(input.profile.profile_background) +
              ".png\"><span class=\"card-title black-text\" style=\"margin-bottom: -70px;\"> <img style=\"height: 100px; width: 100px; border-radius: 999%; display: inline; vertical-align: bottom;\" class=\"circle\" src=\"" +
              marko_escapeXmlAttr(input.user.icon) +
              "\"> " +
              marko_escapeXml(input.user.name) +
              "</span></div><br><br><div class=\"card-content black-text\"><span class=\"black-text right\" style=\"margin-top: -55px\"> ");

            if (input.profile.is_patreon) {
              out.w(" <i class=\"material-icons red-text tooltipped\" data-position=\"bottom\" data-tooltip=\"Patreon Supporter\">favorite</i>");
            }

            if (input.profile.is_translator) {
              out.w(" <i class=\"material-icons green-text tooltipped\" data-position=\"bottom\" data-tooltip=\"Translator\">g_translate</i> ");
            }

            if (input.profile.is_admin) {
              out.w(" <i class=\"material-icons blue-text tooltipped\" data-position=\"bottom\" data-tooltip=\"Staff Member\">perm_identity</i> ");
            }

            out.w("</span><br><span style=\"max-height: 300px\">" +
              marko_escapeXml(input.profile.bio) +
              "</span><br><br></div><div class=\"card-action\"><span class=\"card-title black-text\">Stickers</span><br><div class=\"row\">");

            if (input.stickers.length == 0) {
              out.w("<i class=\"grey-text text-darken-2\">" +
                marko_escapeXml(input.user.name) +
                " has no stickers...</i>");
            }

            var for__37 = 0;

            marko_forEach(input.stickers, function(item) {
              var keyscope__38 = "[" + ((for__37++) + "]");

              out.w("<div class=\"col s4 m4 l2\" onclick=\"showStickerPanel( '" +
                marko_escapeXmlAttr(item.sticker) +
                "' );\"><img width=\"100%\" class=\"grow\" src=\"https://stickers.managerbot.me/" +
                marko_escapeXmlAttr(item.sticker) +
                ".png\"></div>");
            });

            out.w("</div>");

            if (input.you == true) {
              out.w("<a class=\"modal-trigger blue-text\" href=\"#addSticker\" onclick=\" $('#stickerCode').focus(); \">Add Sticker</a>");
            }

            out.w("</div>");

            if (input.you == true) {
              out.w("<div class=\"card-action\"><a href=\"/logout\" class=\"right red-text\">Log Out</a><a class=\"blue-text modal-trigger\" href=\"#editProfile\">Edit Profile</a></div>");
            }

            out.w("</div></div></div><div id=\"addSticker\" class=\"modal grey darken-4\" style=\"max-width: 300px\"><div class=\"modal-content white-text\"><h5>New Sticker</h5><form target=\"PublishFrame\" id=\"addStickerForm\" action=\"/api/stickers/add\" method=\"post\" enctype=\"multipart/form-data\"><div><br><div class=\"progress grey darken-3\"><div class=\"determinate yellow\" style=\"width: " +
              marko_escapeXmlAttr((input.stickers.length / 10) * 100) +
              "%\"></div></div>" +
              marko_escapeXml(input.stickers.length) +
              "/10 Sticker Limit</div><br><div class=\"input-field\"><input id=\"stickerCode\" name=\"stickerCode\" type=\"text\" class=\"validate\" placeholder=\"Sticker Code\" data-length=\"15\"></div><img id=\"stickerPreview\" width=\"250px\" height=\"250px\"><div class=\"file-field input-field\"><div class=\"btn\"><span>File</span><input id=\"stickerFile\" name=\"stickerFile\" type=\"file\" accept=\"image/png\"></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\" type=\"text\"></div></div><button class=\"btn waves-effect waves-light center\" style=\"width:100%\" type=\"submit\" name=\"action\">Create Sticker</button></form></div></div>");

            if (input.you == true) {
              out.w("<div id=\"editProfile\" class=\"modal grey darken-4\"><div class=\"modal-content\"><form class=\"pe\"><h5>Profile</h5><div class=\"row\"><div class=\"input-field col s12\"><span>Page Bio</span><textarea id=\"bio\" class=\"materialize-textarea\">" +
                marko_escapeXml(input.profile.bio) +
                "</textarea></div></div><hr><br><h5>Notifications</h5><div class=\"row\" style=\"padding-left: 10px\"><p><input type=\"checkbox\" class=\"checkbox-manager\" id=\"room\" name=\"room\"><label for=\"room\" class=\"white-text\">Private room</label></p><p><input type=\"checkbox\" class=\"checkbox-manager\" id=\"ghostping\" name=\"ghostping\"><label for=\"ghostping\" class=\"white-text\">Ghost Pings</label></p><p><input type=\"checkbox\" class=\"checkbox-manager\" id=\"joinleaves\" name=\"joinleaves\"><label for=\"joinleaves\" class=\"white-text\">Join / Leave Your Voice Channel</label></p></div></form></div><div class=\"modal-footer grey darken-3\"><a href=\"#\" onclick=\"$('.pe').submit()\" class=\"white-text modal-close waves-effect waves-green btn-flat\">Save Changes</a></div></div><script>\n\n          function createSettingsObject(){\n\n            result = {};\n\n            result.bio                      = $('#bio').val();\n            result.room                     = getBool('room');\n            result.ghostping                = getBool('ghostping');\n            result.joinleaves               = getBool('joinleaves');\n\n            return JSON.stringify(result);\n\n          }\n\n          $( document ).ready(function() {\n            $('#room').prop('checked', profile.notifySettings.includes('room')); \n            $('#ghostping').prop('checked', profile.notifySettings.includes('ghostping')); \n            $('#joinleaves').prop('checked', profile.notifySettings.includes('joinleaves')); \n          });\n\n\n          $(\".pe\").submit(function(e) {\n\n            $.ajax({\n              type: \"POST\",\n              url: '/api/user/saveProfile',\n              data: createSettingsObject(), // serializes the form's elements.    \n              dataType: 'json',\n              contentType: \"application/json\", // send as JSON\n              success: function(response)\n              {\n\n                Materialize.toast(response.message, 1000)\n                if(response.error == undefined){\n                  $(\"#UnsavedChanges\").slideUp(\"fast\");\n                }\n              },\n              complete: function(data){\n                console.log(data);\n              }\n            });\n\n            e.preventDefault(); // avoid to execute the actual submit of the form.\n\n          });\n        </script>");
            }

            out.w("<div id=\"ViewSticker\" class=\"modal grey darken-4\" style=\"max-width: 300px\"><div class=\"modal-content white-text center\"><h5 id=\"view-stickerCode\">stickerCode</h5><img id=\"view-stickerIMG\" width=\"250px\" height=\"250px\"><br><br>");

            if (input.you == true) {
              out.w("To use in discord type: <pre id=\"view-exmapleUsage\">$</pre><br><br><a class=\"waves-effect waves-light btn red\" onclick=\"deleteCurrentSticker()\">Delete</a>");
            }

            out.w("</div></div></div><iframe name=\"PublishFrame\" id=\"PublishFrame\" onload=\"FormFinished()\" style=\"display:none;\" width=\"0px\" height=\"0px\"></iframe><script>\n    \n\n          function readURL(input) {\n\n            if (input.files && input.files[0]) {\n              var reader = new FileReader();\n\n              reader.onload = function(e) {\n                $('#stickerPreview').attr('src', e.target.result);\n              }\n\n              reader.readAsDataURL(input.files[0]);\n            }\n          }\n\n          $(\"#stickerFile\").change(function() {\n            readURL(this);\n          });\n\n    </script>");
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
    id: "/manager-web3$1.0.0/src/routes/profile/index.marko",
    tags: [
      "../../components/site-layout"
    ]
  };
