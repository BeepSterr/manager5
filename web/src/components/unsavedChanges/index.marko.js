// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/components/unsavedChanges/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div id=\"UnsavedChanges\" style=\"position: fixed; width: 100%; left:0px; bottom: 0px; height: 76px; z-index:500;\"><div class=\"row\"><div class=\"col s12 m10 l6 xl4 offset-m1 offset-l3 offset-xl4\"><div class=\"card-panel grey darken-4\"><span class=\"white-text\">You have unsaved changes!</span><a class=\"waves-effect waves-light btn right blue\" style=\"margin-top: -6px\" onclick=\"$('form').submit();\">Save Changes</a></div></div></div></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/manager-web3$1.0.0/src/components/unsavedChanges/index.marko"
  };
