module.exports = {
  title: "Enyo vue components",
  description: "Components to speed up the development of a backoffice.",
  base: "/vue-enyo-components/",
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      }
    ]
  ],
  themeConfig: {
    logo: "http://www.enyosolutions.com/data/uploads/156320809647.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting started", link: "/guide/" },
      { text: "Components", link: "/guide/" },
      { text: "CrudComponent", link: "/guide/crudcomponent/" },
      { text: "AjaxTable", link: "/guide/ajaxtable/" },
      {
        text: "Github",
        link: "https://github.com/enyosolutions-team/vue-enyo-components"
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
            title: "CrudComponent",
            path: "/guide/crudcomponent/",
            sidebarDepth: 2,
            collapsable: false,
            children: [
              { title: "Introduction", path: "/guide/crudcomponent/" },
              {
                title: "Configuration of the schema",
                path: "/guide/crudcomponent/schema-configuration.md"
              }
            ]
          },
          {
            title: "EnyoAjaxTable",
            path: "/guide/ajaxtable/",
            sidebarDepth: 2,
            collapsable: true,
            children: [
              { title: "Presentation", path: "/guide/ajaxtable/" },
              {
                title: "Events",
                path: "/guide/ajaxtable/events.md"
              }
            ]
          },
          { title: "TableAndChartsCard", path: "/guide/tableandchartscard" },
          { title: "EnyoStats", path: "/guide/enyostats.md" },
          { title: "EnyoChartCard", path: "/guide/enyochartcard.md" },
          { title: "EnyoSelect", path: "/guide/enyochartcard.md" }
        ]
      },
      {
        title: "Next steps",
        path: "/next-steps.md"
      },
      {
        title: "Github",
        path: "https://github.com/enyosolutions-team/vue-enyo-components"
      }
    ]
  }
};
