module.exports = {
  title: "Vue Awesome Components",
  description: "Components to speed up the development of a backoffice.",
  // base: "/vue-aw-components",
  base: "/",
  head: [
    ['meta', { name: 'theme-color', content: 'orange' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
    ,
    [
      "link",
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      }
    ],
    ["script", { src: "https://code.jquery.com/jquery-3.3.1.min.js" }],
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
      { text: "Home", link: "/" },
      { text: "Components", link: "/guide/" },
      { text: "AwesomeCrud", link: "/guide/awesomecrud/" },
      { text: "AwesomeTable", link: "/guide/awesometable/" },
      {
        text: "Github",
        link: "https://github.com/enyosolutions-team/vue-aw-components"
      }
    ],
    sidebar: [
      {
        title: "Introduction", // required
        path: "/", // optional, which should be a absolute path.
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1, // optional, defaults to 1
        children: [
          { title: "Home", path: "/" },
          { title: "Getting started", path: "/guide/" }
        ]
      },
      {
        title: "Components", // required
        path: "/guide/", // optional, which should be a absolute path.
        collapsable: false, // optional, defaults to true
        sidebarDepth: 2, // optional, defaults to 1
        children: [
          {
            title: "Awesome Crud",
            path: "/guide/awesomecrud/",
            sidebarDepth: 2,
            collapsable: true,
            children: [
              { title: "Introduction", path: "/guide/awesomecrud/" },
              { title: "AwesomeCrud Props", path: "/guide/awesomecrud/props.md" },
              {
                title: "Configuration of the schema",
                path: "/guide/awesomecrud/schema-configuration.md"
              },
              {
                title: "Configuration Options",
                path: "/guide/awesomecrud/configuration-options.md"
              },
              {
                title: "Events (wip)",
                path: "/guide/awesomecrud/events/readme.md"
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
          {
            title: "Awesome Table",
            path: "/guide/awesometable/",
            sidebarDepth: 1,
            collapsable: true,
            children: [
              { title: "Presentation", path: "/guide/awesometable/" },
              {
                title: "Events",
                path: "/guide/awesometable/events.md"
              }
            ]
          },

          { title: "Awesome Form", path: "/guide/awesomeform/readme.md" },
          { title: "Awesome Kanban", path: "/guide/awesomekanban/" },
          { title: "Awesome List", path: "/guide/awesomelist/" },
          { title: "Awesome Layout", path: "/guide/awesomelayout/" },
          { title: "Awesome Event Bus", path: "/guide/awesomeBus/readme.md" },
          { title: "TableAndChartsCard", path: "/guide/tableandchartscard" },
          { title: "EnyoStats", path: "/guide/enyostats.md" },
          { title: "EnyoChartCard", path: "/guide/enyochartcard.md" },
          { title: "EnyoSelect", path: "/guide/enyoselect.md" },

        ]
      },
      {
        title: "Next steps",
        path: "/next-steps.md"
      },
      {
        title: "Github",
        path: "https://github.com/enyosolutions-team/vue-aw-components"
      }
    ]
  }
};
