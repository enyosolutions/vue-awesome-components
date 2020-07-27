const schema = require('./ticket');

module.exports = {
  identity: 'ticket',
  schema,

  layout: {
    columns: [
      {
        cols: 6,
        legend: 'sidebar',
        styleClasses: "p-t-0",
        groups: [
          {
            legend: 'Identity',
            cols: 6,
            fields: [
              'id',
              'type',
              'regionId',
              'userId',
            ],
          },
          {
            legend: 'Stakeholders',
            cols: 6,
            fields: [
              'subject',
              'body',

            ],
          },
        ],
      },
      {
        cols: 6,
        legend: 'body',
        childStyleClasses: "card card-primary p-0",
        tabs: [
          {
            legend: 'ID Card',
            styleClasses: 'card card-primary',
            rows: [
              {
                fields: [
                  'id',
                  'type',
                  'regionId',
                  'userId',
                ],
                groups: [
                  {
                    legend: 'Identity',
                    headerClasses: "bg-primary text-light p-2",
                    styleClasses: "",
                    cols: 6,
                    fields: [
                      'id',
                      'type',
                      'regionId',
                      'userId',
                    ],
                  },
                  {
                    legend: 'Stakeholders',
                    cols: 6,
                    fields: [
                      'subject',
                      'body',

                    ],
                  },
                ],
              },
              {
                groups: [
                  {
                    legend: 'Taxonomy',
                    cols: 6,
                    fields: [
                      'createdOn',
                    ],
                  },
                  {
                    legend: 'Scope of application',
                    cols: 6,
                    fields: [
                      'lastModifiedOn',
                    ],
                  },
                ],
              },

            ],
          },
          {
            legend: 'Properties',
            rows: [
              {
                legend: 'Scope of application',
                fields: [
                  'userId',
                  'lastModifiedOn',
                  'createdOn',
                ],
              },
            ],
          },

        ],
      }
    ]
  },
}