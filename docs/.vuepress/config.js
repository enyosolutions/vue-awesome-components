module.exports = {
  title: "Vue Awesome Components",
  description: "Components to speed up the development of a backoffice.",
  base: "/vue-awesome-components/",
  // base: "/",
  head: [
    ['meta', {name: 'theme-color', content: 'orange'}],
    ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
    ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
    [
      "link",
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      }
    ],
    ["script", {src: "https://code.jquery.com/jquery-3.3.1.min.js"}],
    [
      "script",
      {
        src:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"
      }
    ]
  ],
  themeConfig: {
    logo: "https://www.enyosolutions.com/theme/images/rocket.svg",
    nav: [
      {text: "Home", link: "/"},
      {text: "Getting started", link: "/guide/"},
      {text: "AwesomeCrud", link: "/guide/awesomecrud/"},
      {text: "AwesomeTable", link: "/guide/awesometable/"},
      {
        text: "Github",
        link: "https://github.com/enyosolutions-team/vue-awesome-components/"
      }
    ],
    sidebar: [
      {
        title: "Introduction", // required
        path: "/", // optional, which should be a absolute path.
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1, // optional, defaults to 1
        children: [
          {title: "Home", path: "/"},
          {title: "Getting started", path: "/guide/"}
        ]
      },
      {
        title: 'Components',
        children: [
          {
            title: "Awesome Table",
            path: "/guide/awesometable/",
            sidebarDepth: 1,
            collapsable: true,
            children: [
              {title: "Presentation", path: "/guide/awesometable/"},
              {title: "Props", path: "/guide/awesometable/props.md"},
              { title: "Saving state", path: "/guide/awesometable/saving-config-state.md" },
          {
                title: "Events",
                path: "/guide/awesometable/events.md"
              },
              {
                title: "Examples",
                path: "/guide/awesometable/examples.md"
              }
            ]
          },
          {
            title: "Awesome Crud",
            path: "/guide/awesomecrud/",
            sidebarDepth: 1,
            collapsable: true,
            children: [
              {title: "Introduction", path: "/guide/awesomecrud/"},
              {
                title: "Props",
                path: "/guide/awesomecrud/props.md"
              },
              {
                title: "Configuration of the schema",
                path: "/guide/awesomecrud/schema-configuration.md"
              },
              {
                title: "Configuration Options",
                path: "/guide/awesomecrud/configuration-options.md"
              },

              {
                title: "Actions",
                path: "/guide/awesomecrud/actions.md"
              },
              {
                title: "Events (wip)",
                path: "/guide/awesomecrud/events.md"
              },
              {
                title: "Css classes",
                path: "/guide/awesomecrud/classes.md"
              },
              {
                title: "Examples",
                path: "/guide/awesomecrud/examples.md"
              }
            ]
          },
          {title: "Awesome Form", path: "/guide/awesomeform/"},
          {title: "Awesome Kanban", path: "/guide/awesomekanban/"},
          {title: "Awesome List", path: "/guide/awesomelist/"},
          {title: "Awesome Layout", path: "/guide/awesomelayout/"},
          {title: "Awesome Builder", path: "/guide/awesomebuilder/"},
          {title: "Awesome Event Bus", path: "/guide/awesomeBus/"},
          {title: "TableAndChartsCard", path: "/guide/tableandchartscard"},
          {title: "EnyoStats", path: "/guide/enyostats.md"},
          {title: "EnyoChartCard", path: "/guide/enyochartcard.md"},
          {title: "EnyoSelect", path: "/guide/enyoselect.md"},
        ]
      },
      {
        title: "Next steps",
        path: "/next-steps.md"
      },
      {
        title: "Github",
        path: "https://github.com/enyosolutions-team/vue-awesome-components/"
      }
    ]
  }
};
