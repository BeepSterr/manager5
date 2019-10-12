// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/manager-web3$1.0.0/src/routes/dash/overview/analytics/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_escapeScript = marko_helpers.xs,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    site_layout_template = marko_loadTemplate(require.resolve("../../../../components/site-layout")),
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
            out.w("<nav style=\"height: 40px;\"><div class=\"nav-wrapper grey darken-4\" style=\"padding-left: 25px; line-height:40px\"><div class=\"col s12\"><a href=\"/\" class=\"breadcrumb\">Manager</a><a href=\"/g/" +
              marko_escapeXmlAttr(input.guild.id) +
              "\" class=\"breadcrumb\">" +
              marko_escapeXml(input.guild.name) +
              "</a><a href=\"/g/" +
              marko_escapeXmlAttr(input.guild.id) +
              "/analize\" class=\"breadcrumb\">Analytics</a></div></div></nav>");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<script>\n    \n      guild = " +
              marko_escapeScript(JSON.stringify(input.guild)) +
              ";\n      analytics = " +
              marko_escapeScript(JSON.stringify(input.analytics)) +
              ";\n\n\n      function Momentimize(obj){\n\n        // Sorry, This func name is just too much fun :)\n        obj._timestamp = obj.timestamp;\n        obj.timestamp = moment(obj._timestamp);\n\n        return obj;\n\n      }\n\n\n      function buildAnalytics(){\n\n        // Main data structure.\n        data = {\n          now: moment(),\n          graphs: {\n            messagesWeek: [],\n            messagesDay: [],\n            membersWeek: [],\n            memberdiff: []\n          },\n          labels: {\n            messagesWeek: [],\n            messagesDay: [],\n            membersWeek: [],\n            memberdiff: []\n          },\n          temp: {\n            messagesWeek: [],\n            messagesDay: [],\n            membersWeek: [],\n            memberdiff: []\n          }\n        }\n\n        //Seperate all into respective days\n        analytics.message.forEach( message => {\n\n            var obj = Momentimize(message);\n            \n            //Remove time portion of the moment so we can format weekdays.\n            var day = obj.timestamp.format('ddd');\n            var hour = obj.timestamp.format('h A');\n\n            if(data.temp.messagesWeek[day] == undefined){ data.temp.messagesWeek[day] = 0}\n            if(data.temp.messagesDay[hour] == undefined){ data.temp.messagesDay[hour] = 0}\n\n            data.temp.messagesWeek[day]++;\n            data.temp.messagesDay[hour]++;\n\n        })\n\n        for (var items in data.temp.messagesDay){\n            data.labels.messagesDay.push(items)\n            data.graphs.messagesDay.push( data.temp.messagesDay[items] );\n        }\n\n        //Seperate all into respective days\n        analytics.j.forEach( j => {\n\n            var obj = Momentimize(j);\n            \n            //Remove time portion of the moment so we can format weekdays.\n            var day = obj.timestamp.format('ddd');\n\n            if(data.temp.memberdiff[day] == undefined){ data.temp.memberdiff[day] = 0}\n            data.temp.memberdiff[day]++;\n\n        })\n\n        //Seperate all into respective days\n        analytics.l.forEach( l => {\n\n            var obj = Momentimize(l);\n            \n            //Remove time portion of the moment so we can format weekdays.\n            var day = obj.timestamp.format('ddd');\n\n            if(data.temp.memberdiff[day] == undefined){ data.temp.memberdiff[day] = 0}\n            data.temp.memberdiff[day]--;\n\n        })\n\n        for (var items in data.temp.memberdiff){\n            data.labels.memberdiff.push(items)\n            data.graphs.memberdiff.push( data.temp.memberdiff[items] );\n        }\n\n      }\n      \n    \n    </script><div class=\"container\" id=\"welcomer\"><br><br><h1> <a class=\"yellow-text\" href=\"/g/" +
              marko_escapeXmlAttr(input.guild.id) +
              "/\"><</a> " +
              marko_escapeXml(input.guild.name) +
              " </h1><span class=\"guild-id\">Analytical Data</span></div><div class=\"container\" id=\"config-content\"><form method=\"POST\"><div id=\"analytics-base\"><br><br><div class=\"row\"><div class=\"col s12 m12 l6 left-align\"><h5>Member Count</h5><i>This Week</i><canvas id=\"chartMemberChangesWeek\"></canvas><script>\n\n                $( document ).ready(function() {\n\n                  buildAnalytics();\n\n                  setTimeout( ()=> {\n\n                    var ctx = document.getElementById(\"chartMemberChangesWeek\").getContext('2d');\n                    new Chart(ctx, {\n                      data: { \n                        labels: data.labels.memberdiff,\n                        datasets: [ {\n                          label: \"Member Changes\",\n                          data: data.graphs.memberdiff }\n                        ]\n\n                      },\n                      type: 'line',\n                      options: {\n                        scales: {\n                          yAxes: [{\n                            ticks: {\n                              beginAtZero: false\n                            }\n                          }]\n                        }\n                      }\n                    })\n                  \n                  },10)\n\n                });\n\n              </script></div> <div class=\"col s12 m12 l6 left-align\"><h5>Chat Activity</h5><i>Today</i><br><canvas id=\"chartChannelActivity\"></canvas><script>\n\n                $( document ).ready(function() {\n\n                  buildAnalytics();\n\n                  setTimeout( ()=> {\n\n                    var ctx = document.getElementById(\"chartChannelActivity\").getContext('2d');\n                    new Chart(ctx, {\n                      data: { \n                        labels: data.labels.messagesDay,\n                        datasets: [ {\n                          label: \"Messages\",\n                          data: data.graphs.messagesDay }\n                        ]\n\n                      },\n                      type: 'line',\n                      options: {\n                        scales: {\n                          yAxes: [{\n                            ticks: {\n                              beginAtZero: true\n                            }\n                          }]\n                        }\n                      }\n                    })\n                  \n                  },10)\n\n                });\n\n              </script></div></div></div><hr></form></div>");
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
    id: "/manager-web3$1.0.0/src/routes/dash/overview/analytics/index.marko",
    tags: [
      "../../../../components/site-layout"
    ]
  };
