// Compiled using marko@4.9.2 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/credits/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    site_layout_template = marko_loadTemplate(require.resolve("../../components/site-layout")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    site_layout_tag = marko_loadTag(site_layout_template);

function render(input, out, __component, component, state) {
  var data = input;

  site_layout_tag({
      title: {
          renderBody: function renderBody(out) {
            out.w("Credits");
          }
        },
      crumbs: {
          renderBody: function renderBody(out) {
            out.w("<nav style=\"height: 40px;\"><div class=\"nav-wrapper grey darken-4\" style=\"padding-left: 25px; line-height:40px\"><div class=\"col s12\"><a href=\"/\" class=\"breadcrumb\">Manager</a><a href=\"/credits\" class=\"breadcrumb\">Credits</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<div class=\"container\"><h2>Manager Bot</h2> Manager was created, Maintained & hosted by Nioxed.<br> The project would never have gotten to where it is now without these people/packages.<br><br><h5>Patreons</h5><div id=\"PatreonArea\" class=\"row\"></div><br><h5>Translators</h5><div id=\"TranslatorArea\" class=\"row\"></div><br><h5>NPM Packages</h5><ul><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/bufferutil\">buffelutil</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/chalk\">chalk</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/dashify\">dashify</a></li><li><a target=\"_blank\" href=\"https://github.com/discordjs/discord.js\">Discord.JS</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/express\">express</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/github-update\">github-update</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/jimp\">jimp</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/knex\">knex</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/mathjs\">mathjs</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/moment\">moment</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/mysql\">mysql</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/node-schedule\">node-schedule</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/node-snowflake\">node-snowflake</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/request\">request</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/safe-browse-url-lookup\">safe-browse-url-lookup</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/shallow-diff\">shallow-diff</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/strip-ansi\">strip-ansi</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/express-fileupload\">express-fileupload</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/install\">install</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/marko\">marko</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/passport\">passport</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/passport-discord\">passport-discord</a></li><li><a target=\"_blank\" href=\"https://www.npmjs.com/package/snekfetch\">snekfetch</a></li></ul><br><h5>Other Credits</h5><div>Icons made by <a href=\"http://www.freepik.com\" title=\"Freepik\">Freepik</a> from <a href=\"https://www.flaticon.com/\" title=\"Flaticon\">www.flaticon.com</a> is licensed by <a href=\"http://creativecommons.org/licenses/by/3.0/\" title=\"Creative Commons BY 3.0\" target=\"_blank\">CC 3.0 BY</a></div><br><h5>And Ofcourse..</h5> You! Everyone who uses manager helps it grow.<br>I Never expected this silly old bot of mine to get on more than a couple hundred servers ever.. And well it has clearly passed that! &lt;3 <br><br></div><script>\n\n      $( document ).ready(function() {\n\n        $.ajax({\n          url: \"/api/credits/translators\",\n          success: function( body ){\n\n            body.forEach( translator => {\n\n              $('#TranslatorArea').append(`  \\n  <a href=\"/user/`+translator.id+`\"<div class=\"col s6 m4\">\\n    <div class=\"card hoverable\">\\n      <div class=\"card-content black-text\">\\n        <p>`+translator.tag+`</p>\\n      </div>\\n    </div></a>\\n         `)\n\n            })\n\n          }\n        });\n        \n        $.ajax({\n          url: \"/api/credits/patreons\",\n          success: function( body ){\n\n            body.forEach( patreon => {\n\n              $('#PatreonArea').append(`  \\n  <a href=\"/user/`+patreon.id+`\"<div class=\"col s6 m4\">\\n    <div class=\"card horizontal hoverable\">\\n      <div class=\"card-image\">\\n        <img height=\"75\" src=\"`+patreon.avatar+`\">\\n      </div>\\n      <div class=\"card-stacked\">\\n        <div class=\"card-content black-text\">\\n          <p>`+patreon.tag+`</p>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n         `)\n\n            })\n\n          }\n        });\n\n      });\n\n    </script>");
          }
        },
      renderBody: function renderBody(out) {
        out.w(" ");
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
    id: "/manager-web3$1.0.0/src/routes/credits/index.marko",
    tags: [
      "../../components/site-layout"
    ]
  };
