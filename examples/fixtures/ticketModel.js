const schema = require('./ticket');

module.exports = {
  identity: 'ticket',
  displayField: 'subject',
  schema,
  formOptions: {
    layout: [{
      "x": 0,
      "y": 0,
      "w": 3,
      "h": 3,
      "i": "aw-layout-item-c5fa67c3-7000-4400-b4e2-f579fbb37ee4",
      "fields": ["type", "regionId", "body"],
      "moved": false
    }, {
      "x": 3,
      "y": 0,
      "w": 3,
      "h": 4,
      "i": "aw-layout-item-b6e613e3-6e36-4346-a0de-24e5610a3a07",
      "fields": ["userId", "userId2", "createdOn", "subject"],
      "moved": false
    }]
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