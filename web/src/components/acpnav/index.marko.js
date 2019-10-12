// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/components/acpnav/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<br><br><div class=\"card white\"><div class=\"card-content black-text\"><h5>ACP</h5><p>Admin Control Panel</p><br><a href=\"/acp/overview\" class=\"waves-effect waves-black btn-flat\">Overview</a><br><a href=\"/acp/user\" class=\"waves-effect waves-black btn-flat\">Users</a><br><a href=\"/acp/rooms\" class=\"waves-effect waves-black btn-flat\">Rooms</a><br><a href=\"/acp/faq\" class=\"waves-effect waves-black btn-flat\">FAQ</a><br></div></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/manager-web3$1.0.0/src/components/acpnav/index.marko"
  };
