// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/commands/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_escapeScript = marko_helpers.xs,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    site_layout_template = marko_loadTemplate(require.resolve("../../components/site-layout")),
    marko_loadTag = marko_helpers.t,
    site_layout_tag = marko_loadTag(site_layout_template);

function render(input, out, __component, component, state) {
  var data = input;

  site_layout_tag({
      title: {
          renderBody: function renderBody(out) {
            out.w("Commands");
          }
        },
      crumbs: {
          renderBody: function renderBody(out) {
            out.w("<nav style=\"height: 40px;\"><div class=\"nav-wrapper grey darken-4\" style=\"padding-left: 25px; line-height:40px\"><div class=\"col s12\"><a href=\"/\" class=\"breadcrumb\">Manager</a><a href=\"/commands\" class=\"breadcrumb\">Commands</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<script>\n\n          commands = " +
              marko_escapeScript(JSON.stringify(input.commands)) +
              "\n          categories = [];\n\n          $(document).ready( ()=>{\n            commands.forEach ( ( command )=>{\n\n              if( !categories.includes(command.category) )\n                categories.push(command.category);\n\n              $('#commands tr:last').after('<tr class=\"commanditem cat-'+command.category+'\"><td>'+command.example+'</td><td>'+command.permissionLevel+'</td><td>'+command.description+'</td><td>'+command.category+'</td><td>'+command.dm+'</td></tr>');\n\n            })\n\n\n            $.each(categories,function(key, value) {\n\n              $('.command-category-select').append('<option value=' + value + '> ' + value + '</option>');\n\n            });\n          });\n\n          function updateHidden(){\n\n            var selectedVal = $('#hidden-cats').val();\n            console.log(selectedVal)\n\n\n            $('.commanditem').hide()\n            $('.cat-' + selectedVal).show()\n\n            if(selectedVal == \"DISPLAY_ALL\"){\n              $('.commanditem').show()\n            }\n\n          }\n\n\n\n        </script><div class=\"center container row\"><br><br><div class=\"input-field col s12\"><select id=\"hidden-cats\" class=\"command-category-select\" onchange=\"updateHidden();\"><option value=\"DISPLAY_ALL\" selected>All Commands</option></select><label>Command Category Select</label></div><br><br><span class=\"gray-text\">The default prefix for manager is <span class=\"red-text\">m!</span>. Find out the custom prefix by typing <span class=\"red-text\">@Manager</span></span><br><span class=\"gray-text\">Arguments inside < > are required, Arguments inside [ ] are optional.</span><br><br><br><div class=\"col s12\"><table id=\"commands\"><thead><tr><th>Command</th><th>Rank</th><th>Description</th><th>Category</th><th>Where</th></tr></thead><tbody><tr></tr></tbody></table></div></div>");
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
    id: "/manager-web3$1.0.0/src/routes/commands/index.marko",
    tags: [
      "../../components/site-layout"
    ]
  };
