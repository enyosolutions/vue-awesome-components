module.exports = {
  title: "Vue Awesome Components",
  description: "Components to speed up the development of a backoffice.",
  base: "/vue-awesome-components/",
  // base: "/",
  head: [
    ['meta', { name: 'theme-color', content: 'orange' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ["link", {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    }],
    ["script", { src: "https://code.jquery.com/jquery-3.3.1.min.js" }],
    ["script", { src: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" }]
  ],
  themeConfig: {
    logo: "https://www.enyosolutions.com/theme/images/rocket.svg",
    repo: 'enyosolutions-team/vue-awesome-components',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'develop',
    // defaults to false, set to true to enable
    editLinks: true,
    smoothScroll: true,
    nav: [
      { text: "Home", link: "/" },
      { text: "AwesomeCrud", link: "/guide/awesomecrud/" },
      { text: "AwesomeTable", link: "/guide/awesometable/" },
      { text: "Api", link: "/guide/api/props.md" },
      { text: "Playground", link: "http://vue-enyo-components.dev.enyosolutions.com/" },
    ],
    sidebar: [
      {
        title: 'Getting started',
        collapsable: false,
        children: [
          '/guide/getting-started/presentation',
          '/guide/getting-started/dependencies',
          '/guide/getting-started/installation',
        ]
      },
      {
        title: 'Global configuration',
        path: '/guide/cookbook/global-configuration.md'
      },
      {
        title: 'Awesome Table',
        children: [
          '/guide/awesometable/',
          '/guide/awesometable/props',
          '/guide/awesometable/saving-config-state',
          '/guide/awesometable/events',
          '/guide/awesometable/examples'
        ]
      },
      {
        title: 'Awesome Kanban',
        path: '/guide/awesomekanban/'
      },
      {
        title: 'Awesome List',
        path: '/guide/awesomelist/'
      },
      {
        title: 'Awesome Form',
        path: '/guide/awesomeform/',
      },
      {
        title: 'Awesome Crud',
        children: [
          '/guide/awesomecrud/',
          '/guide/awesomecrud/props',
          '/guide/awesomecrud/schema-configuration',
          '/guide/awesomecrud/configuration-options',
          '/guide/awesomecrud/saving-config-state',
          '/guide/awesomecrud/actions.md',
          '/guide/awesomecrud/custom-actions.md',
          '/guide/awesomecrud/template-parsing-system',
          '/guide/awesomecrud/events',
          '/guide/awesomecrud/classes',
          '/guide/awesomecrud/examples',
        ]
      },
      {
        title: 'Nested models',
        path: '/guide/nestedmodels/'
      },
      {
        title: 'Awesome Layout',
        path: '/guide/awesomelayout/'
      },
      {
        title: 'Awesome Event Bus',
        path: '/guide/awesomeBus/'
      },
      {
        title: 'Api',
        path: '/guide/api/props.md'
      },
      {
        title: 'EnyoStats',
        path: '/guide/enyostats'
      },
      {
        title: 'Table And Charts Card',
        path: '/guide/enyochartcard'
      },
      {
        title: 'Enyo Select',
        path: '/guide/enyoselect'
      },

      {
        title: "Next steps",
        path: "/guide/next-steps.md"
      },
      {
        title: "Github",
        path: "https://github.com/enyosolutions-team/vue-awesome-components/"
      }
    ],
  }
};
