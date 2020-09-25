const schema = require('./ticket');

module.exports = {
  identity: 'ticket',
  schema,
  formOptions: {
    layout: [{ "i": "awesomeForm-ticket-1600968855378", "x": 0, "y": 0, "w": 12, "h": 6, "maxW": 12, "minH": 2, "legend": "ticket", "fields": ["type", "createdOn", "lastModifiedOn"], "moved": false }, { "x": 6, "y": 6, "w": 6, "h": 6, "maxW": 12, "minH": 2, "fields": ["body", "userId", "regionId"], "i": "aw-layout-item-1e719dca-1c69-483c-8baf-372cd1d37703", "moved": false, "legend": "third" }, { "x": 0, "y": 6, "w": 6, "h": 6, "maxW": 12, "minH": 2, "fields": ["subject", "status"], "i": "aw-layout-item-fe5341d8-2ede-4df8-98a6-8829c515e268", "moved": false, "legend": "second" }]
  },
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