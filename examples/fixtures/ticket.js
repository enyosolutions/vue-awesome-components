module.exports = {
  $id: 'http://enyosolutions.com/schemas/ticket.json',
  type: 'object',
  required: ['id', 'type', 'subject', 'body', 'status', 'regionId', 'type', 'userId'],
  formOptions: {
    optionsLayout: {
      layout: [
        {
          'x': 0, 'y': 0, 'w': 3, 'h': 6, 'i': 0,
          fields: ['type', 'url', 'test', 'id', 'test2']
        },
        {
          'x': 3, 'y': 0, 'w': 3, 'h': 3, 'i': 1,
          fields: ['regionId']
        },
        {
          'x': 6, 'y': 0, 'w': 3, 'h': 3, 'i': 2,
          fields: ['userId']
        },
      ],
    }
  },
  formGroups: [
    {
      id: 'infos',
      title: 'informations',
      wrapperClasses: 'col-3',
      stylesClasses: '',
      headerClasses: 'text-primary',
      type: 'group',
      groups: [
        {
          id: 'metaData',
          title: 'metaData',
          wrapperClasses: 'col-6',
          stylesClasses: '',
          headerClasses: 'text-primary',
          type: 'group'
        }
      ]
    },
    {
      id: 'details',
      title: 'Détails',
      wrapperClasses: 'col-9',
      stylesClasses: '',
      headerClasses: 'text-danger'
    }
  ],
  properties: {
    id: {
      $id: '_id',
      type: 'number',
      title: 'numéro de course',
      description: 'Identifiant de la course',
      field: {
        // group: "infos"
      }
    },
    type: {
      type: 'string',
      title: 'Type de ticket',
      description: 'type de ticket',
      field: {
        required: true,
        group: 'infos.metaData'
      }
    },
    status: {
      type: 'string',
      title: 'Statut',
      description: 'Statut du ticket',
      enum: ['new', 'opened', 'treated', 'archived'],
      field: {
        group: 'details',
        enum: ['new', 'opened', 'treated', 'archived'],
        required: true,
        type: 'select'
      }
    },
    regionId: {
      type: 'integer',
      title: 'numéro région',
      description: 'Identifiant de la région de course',
      field: {
        group: 'details',
        required: true
      }
    },
    userId: {
      type: 'integer',

      title: 'numéro utilisateur',
      description: 'Identifiant utilisateur',
      relation: 'user',
      relationUrl: '/api/users',
      relationKey: 'id',
      relationLabel: 'email',
      field: {
        required: false,
        type: 'VSelect',
        group: 'infos.metaData',
        styleClasses: 'col-6',
        fieldOptions: {
          trackBy: 'id',
          label: 'email',

        }
      }
    },
    userId2: {
      type: 'integer',
      relation: 'user',
      relationUrl: '/api/users',
      relationKey: 'id',
      relationLabel: 'email',
      label: 'email',
      field: {
        required: false,
        type: 'VSelect',
        group: 'infos.metaData',
        styleClasses: 'col-6',
        fieldOptions: {
          trackBy: 'id',
          label: 'email',
          preload: true
        }
      }
    },
    subject: {
      type: 'string',
      title: 'Sujet',
      description: 'Sujet du ticket',
      field: {
        group: 'message',
        required: true,
        styleClasses: 'col-6',
      }
    },
    body: {
      type: 'string',
      title: 'Message',
      description: 'Texte saisi dans le ticket',
      field: {
        group: 'message',
        required: true,
        type: 'textArea',
        classes: 'col-6',
      },
    },
    createdOn: {
      type: ['string', 'object'],
      format: 'date-time',
      readonly: true,
      column: {
        type: 'datetime', format: 'DD_MM_YYYY (HH,MM)',
        classes: 'badge badge-primary'
      },
      field: {
        group: 'metaData',
        type: 'dateTime',
        classes: 'col-6',
        styles: 'display:block'
      }
    },
    lastModifiedOn: {
      type: ['string', 'object'],
      format: 'date-time',
      readonly: true,
      column: { type: 'datetime' },
      field: {
        group: 'metaData',
        type: 'dateTime',
        classes: 'col-6',
      }
    }
  }
};
