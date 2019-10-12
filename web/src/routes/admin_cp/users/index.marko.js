// Compiled using marko@4.9.2 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/admin_cp/users/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    acpnav_template = marko_loadTemplate(require.resolve("../../../components/acpnav")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    acpnav_tag = marko_loadTag(acpnav_template),
    site_layout_template = marko_loadTemplate(require.resolve("../../../components/site-layout")),
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
            out.w("<nav style=\"height: 40px;\"><div class=\"nav-wrapper grey darken-4\" style=\"padding-left: 25px; line-height:40px\"><div class=\"col s12\"><a href=\"/\" class=\"breadcrumb\">Manager</a><a href=\"/acp\" class=\"breadcrumb\">ACP</a><a href=\"/acp/users\" class=\"breadcrumb\">users</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<div class=\"row center\"><div class=\"col offset-s0 offset-l1 l3 center\">");

            acpnav_tag({}, out, __component, "12");

            out.w("</div><div class=\"col l7 left-align\"><br><br><h4>Users</h4><script>\n\n            var lastTerm = \"\";        \n\n            function searchUsers( elem ) {\n\n              var E = $(elem);\n              if(E.val() == lastTerm){ return; }\n\n              lastTerm = E.val()\n\n              $.ajax({\n                dataType: \"json\",\n                url: '/api/acp/searchUser?term=' + lastTerm,\n                success: (data)=>{\n\n                  var target  = $('#searchResults')\n                  var members = JSON.parse(data);\n\n                  target.html('');\n                  members.forEach( member => {\n                    console.log(member)\n                    $('#searchResults').append(`\\n            <div class=\"col s12\">\\n              <div class=\"card-panel grey lighten-5 z-depth-1\">\\n                <img src=\"/static/manager-web3$1.0.0/src/components/userbar/unknown_server.png\" alt=\"\" class=\"left-align circle\" height=\"45px\" style=\"margin-right: 20px; vertical-align:middle;\"> <!-- notice the \"circle\" class -->\\n                <span class=\"black-text left-align\" style=\"font-size: 120%; line-height:45px;\">\\n                  `+member.known_name+`\\n                </span>                \\n                <span class=\"black-text right\" style=\"line-height:45px;\">\\n                  <a href=\"/acp/user/`+member.user+`\" class=\"waves-effect btn-flat grey-text text-lighten-1\"><i class=\"material-icons\">edit</i></a>\\n                </span>\\n              </div>\\n            </div>\\n                            `)\n                  })\n\n                }\n              });\n\n            }\n\n            setInterval( ()=>{\n              searchUsers( $('#search') )\n            },1000)\n\n          </script><nav class=\"grey darken-3\"><div class=\"nav-wrapper\"><form><div class=\"input-field\"><input onchange=\"searchUsers(this);\" onsubmit=\"e.preventDefault();\" id=\"search\" type=\"search\" required><label class=\"label-icon\" for=\"search\" style=\"margin-top: -10px;\"><i class=\"large material-icons\">search</i></label><i class=\"material-icons\">close</i></div></form></div></nav><div id=\"searchResults\" style=\"padding: 50px\"></div></div></div>");
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
    id: "/manager-web3$1.0.0/src/routes/admin_cp/users/index.marko",
    tags: [
      "../../../components/acpnav",
      "../../../components/site-layout"
    ]
  };
