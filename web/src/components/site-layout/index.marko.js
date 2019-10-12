// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/components/site-layout/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    asset_var_tag = marko_loadTag(require("@lasso/marko-taglib/taglib/asset-var/renderer")),
    marko_attr = marko_helpers.a,
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag")),
    lasso_head_tag = marko_loadTag(require("@lasso/marko-taglib/taglib/head-tag")),
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    lasso_body_tag = marko_loadTag(require("@lasso/marko-taglib/taglib/body-tag")),
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html lang=\"en-US\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width\"><meta name=\"description\" content=\"Create Private Rooms, Automatically moderate &amp; Way more in 10+ Languages!\"><meta name=\"theme-color\" content=\"#3a3a3a\">");

  asset_var_tag({
      values: [
          require.resolve("./logo.png")
        ],
      renderBody: function renderBody(out, __href) {
        out.w("<link rel=\"icon\" sizes=\"192x192\"" +
          marko_attr("href", __href.url) +
          ">");
      }
    }, out, __component, "92");

  out.w("<title>");

  include_tag({
      _target: input.title
    }, out, __component, "8");

  out.w("</title>");

  asset_var_tag({
      values: [
          require.resolve("./materialize.css")
        ],
      renderBody: function renderBody(out, __href) {
        out.w("<link type=\"text/css\" rel=\"stylesheet\"" +
          marko_attr("href", __href.url) +
          " media=\"screen,projection\">");
      }
    }, out, __component, "93");

  out.w("<link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">");

  asset_var_tag({
      values: [
          require.resolve("./simplemde.min.css")
        ],
      renderBody: function renderBody(out, __href) {
        out.w("<link" +
          marko_attr("href", __href.url) +
          " rel=\"stylesheet\">");
      }
    }, out, __component, "94");

  out.w("<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-51438158-10\"></script><script>\n    window.dataLayer = window.dataLayer || [];\n    function gtag(){dataLayer.push(arguments);}\n    gtag('js', new Date());\n\n    gtag('config', 'UA-51438158-10');\n  </script><script type=\"text/javascript\" src=\"https://code.jquery.com/jquery-3.2.1.min.js\"></script>");

  asset_var_tag({
      values: [
          require.resolve("./jquery-ui.js")
        ],
      renderBody: function renderBody(out, __src) {
        out.w("<script type=\"text/javascript\"" +
          marko_attr("src", __src.url) +
          "></script>");
      }
    }, out, __component, "95");

  asset_var_tag({
      values: [
          require.resolve("./pre-init.js")
        ],
      renderBody: function renderBody(out, __src) {
        out.w("<script type=\"text/javascript\"" +
          marko_attr("src", __src.url) +
          "></script>");
      }
    }, out, __component, "96");

  asset_var_tag({
      values: [
          require.resolve("./materialize.js")
        ],
      renderBody: function renderBody(out, __src) {
        out.w("<script type=\"text/javascript\"" +
          marko_attr("src", __src.url) +
          "></script>");
      }
    }, out, __component, "97");

  asset_var_tag({
      values: [
          require.resolve("./simplemde.min.js")
        ],
      renderBody: function renderBody(out, __src) {
        out.w("<script type=\"text/javascript\"" +
          marko_attr("src", __src.url) +
          "></script>");
      }
    }, out, __component, "98");

  out.w("<script type=\"text/javascript\" src=\"https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.6/showdown.min.js\"></script>");

  lasso_head_tag({}, out, __component, "20");

  out.w("</head><body class=\"white-text\">");

  component_globals_tag({}, out);

  include_tag({
      _target: input.crumbs
    }, out, __component, "22");

  out.w("<header><nav class=\"z-depth-0 grey darken-4\"><div class=\"nav-wrapper\" style=\"padding-left: 25px; padding-right: 25px;\"><a href=\"/\" class=\"brand-logo\">");

  asset_var_tag({
      values: [
          require.resolve("./logo.png")
        ],
      renderBody: function renderBody(out, __src) {
        out.w("<img" +
          marko_attr("src", __src.url) +
          " alt=\"Manager Logo\" style=\"margin-right: 25px;\">");
      }
    }, out, __component, "99");

  out.w("<span class=\"hide-on-small-only\">");

  include_tag({
      _target: input.title
    }, out, __component, "29");

  out.w("</span></a><ul id=\"nav-desktop hide-on-med-and-down\" class=\"right\"><li class=\"hide-on-med-and-down\"><a href=\"/faq\">FAQ</a></li><li class=\"hide-on-med-and-down\"><a href=\"/commands\">Commands</a></li><li class=\"hide-on-med-and-down\"><a href=\"https://www.patreon.com/Nioxed\" target=\"_blank\">Patreon</a></li><li class=\"hide-on-med-and-down\"><a href=\"/support\">Support Server</a></li><li class=\"account-icon hide-on-med-and-down\"><a onclick=\"$('.userbar').slideToggle('slow'); toggleAccountIcon();\">Servers<i class=\"material-icons right\">keyboard_arrow_down</i></a></li></ul><a href=\"#\" data-activates=\"nav-mobile\" class=\"button-collapse\"><i class=\"material-icons\">menu</i></a><ul id=\"nav-mobile\" class=\"side-nav\"><li><a href=\"/faq\">FAQ</a></li><li><a href=\"/commands\">Commands</a></li><li><a href=\"https://www.patreon.com/Nioxed\" target=\"_blank\">Patreon</a></li><li><a href=\"/support\">Support Server</a></li><li class=\"account-icon nomargin\"><a onclick=\"$('.userbar').slideToggle('slow'); toggleAccountIcon(); $('#nav-mobile').sideNav('hide');\">Servers<i class=\"material-icons right\">keyboard_arrow_down</i></a></li></ul></div></nav></header><main><div id=\"userBarContent\"></div>");

  include_tag({
      _target: input.content
    }, out, __component, "58");

  out.w("</main><footer class=\"page-footer grey darken-4\"><div class=\"container\"><div class=\"row\"><div class=\"col l6 s12\"><h5 class=\"white-text\">Manager</h5><p class=\"grey-text text-lighten-4\">Make your server dynamic, Let Manager do the hard work so you can keep doing whatever you're doing. </p></div><div class=\"col l3 s6\"><h5 class=\"white-text\">Links</h5><ul><li><a class=\"grey-text text-lighten-3\" href=\"/invite\">Invite Manager</a></li><li><a class=\"grey-text text-lighten-3\" href=\"http://github.com/nioxed/manager-lang\">Translate</a></li><li><a class=\"grey-text text-lighten-3\" href=\"/credits\">Credits</a></li></ul></div><div class=\"col l3 s6\"><h5 class=\"white-text\">Media</h5><ul><li><a class=\"grey-text text-lighten-3\" href=\"https://twitter.com/DiscordManager\">Twitter</a></li><li><a class=\"grey-text text-lighten-3\" href=\"https://patreon.com/Nioxed\">Patreon</a></li><li><a class=\"grey-text text-lighten-3\" href=\"/support\">Support Server</a></li></ul></div></div></div><div class=\"footer-copyright\"><div class=\"container\">© 2017-2018 Manager Bot <a class=\"right white-text\" href=\"http://status.managerbot.me\">Status</a></div></div></footer><script src=\"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.bundle.min.js\"></script><script src=\"https://cdnjs.cloudflare.com/ajax/libs/randomcolor/0.5.2/randomColor.min.js\"></script>");

  asset_var_tag({
      values: [
          require.resolve("./moment.js")
        ],
      renderBody: function renderBody(out, __src) {
        out.w("<script type=\"text/javascript\"" +
          marko_attr("src", __src.url) +
          "></script>");
      }
    }, out, __component, "100");

  asset_var_tag({
      values: [
          require.resolve("./init.js")
        ],
      renderBody: function renderBody(out, __src) {
        out.w("<script type=\"text/javascript\"" +
          marko_attr("src", __src.url) +
          "></script>");
      }
    }, out, __component, "101");

  lasso_body_tag({}, out, __component, "90");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "91");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/manager-web3$1.0.0/src/components/site-layout/index.marko",
    tags: [
      "@lasso/marko-taglib/taglib/asset-var/renderer",
      "marko/src/taglibs/core/include-tag",
      "@lasso/marko-taglib/taglib/head-tag",
      "marko/src/components/taglib/component-globals-tag",
      "@lasso/marko-taglib/taglib/body-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
