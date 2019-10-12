// Compiled using marko@4.9.2 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/status/index.marko",
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
            out.w("Status");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<div class=\"container\"><div class=\"row center\"><br><br><div class=\"col s12\"><h5>Manager Status</h5><br><br><div class=\"card-panel orange\"><span class=\"white-text\"><b>Identified:</b><br> I'm aware of issues with twitter based flow triggers. Working on a solution.</span></div><br><br><div class=\"collection left-align\"><a class=\"collection-item\">Shards <span class=\"badge green white-text\">Online</span></a><a class=\"collection-item\">Flow <span class=\"badge orange white-text\">Issue</span></a><a class=\"collection-item\">InviteShield <span class=\"badge red white-text\">Offline</span></a></div></div></div></div>");
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
    id: "/manager-web3$1.0.0/src/routes/status/index.marko",
    tags: [
      "../../components/site-layout"
    ]
  };
