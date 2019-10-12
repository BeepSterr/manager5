// Compiled using marko@4.9.2 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/components/logItem/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_escapeXml = marko_helpers.x,
    marko_escapeScript = marko_helpers.xs;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"item\"><div class=\"row\"><div class=\"col s2 m2 l1 eventitem\"><br><input type=\"checkbox\" class=\"checkbox-manager\" id=\"log-enabled-" +
    marko_escapeXmlAttr(input.event) +
    "\" name=\"log-enabled-" +
    marko_escapeXmlAttr(input.event) +
    "\"><label for=\"log-enabled-" +
    marko_escapeXmlAttr(input.event) +
    "\"></label></div><div class=\"col s10 m10 l5\"><h5 onclick=\"\">" +
    marko_escapeXml(input.name) +
    "</h5><i onclick=\"\">" +
    marko_escapeXml(input.desc) +
    "</i></div><div class=\"col s12 m12 l5\"><br class=\"hide-on-large-only\"><div class=\"input-field\"><select class=\"text-channel-select\" id=\"log-channel-" +
    marko_escapeXmlAttr(input.event) +
    "\" name=\"log-channel-" +
    marko_escapeXmlAttr(input.event) +
    "\"><option value=\"DEFAULT\">Use the default channel.</option></select><label>Logging Channel</label></div> </div></div><hr class=\"hide-on-large-only\"><script>\n\n        log.push('" +
    marko_escapeScript(input.event) +
    "')\n\n    </script></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/manager-web3$1.0.0/src/components/logItem/index.marko"
  };
