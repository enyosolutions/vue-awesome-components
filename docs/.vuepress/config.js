module.exports = {
  title: "Enyo vue components",
  description: "Components to speed up the development of a backoffice.",
  // base: "/vue-aw-components",
  base: "/",
  head: [
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
    logo: "http://www.enyosolutions.com/data/uploads/156320809647.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "Components", link: "/guide/" },
      { text: "AwesomeCrud", link: "/guide/awesomecrud/" },
      { text: "AjaxTable", link: "/guide/ajaxtable/" },
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
        path: "/Guide/", // optional, which should be a absolute path.
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
              {
                title: "Configuration of the schema",
                path: "/guide/awesomecrud/schema-configuration.md"
              },
              {
                title: "Configuration Options",
                path: "/guide/awesomecrud/configuration-options.md"
              },
              {
                title: "Examples",
                path: "/guide/awesomecrud/examples.md"
              }
            ]
          },
          {
            title: "Awesome Table",
            path: "/guide/ajaxtable/",
            sidebarDepth: 1,
            collapsable: true,
            children: [
              { title: "Presentation", path: "/guide/ajaxtable/" },
              {
                title: "Events",
                path: "/guide/ajaxtable/events.md"
              }
            ]
          },
          { title: "Awesome Kanban", path: "/guide/awesomekanban/" },
          { title: "Awesome List", path: "/guide/awesomelist/" },
          { title: "Awesome Layout", path: "/guide/awesomelayout/" },
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
