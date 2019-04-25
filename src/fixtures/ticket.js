export default {
    $id: 'http://enyosolutions.com/schemas/ticket.json',
    type: 'object',
    required: ['type', 'subject', 'body', 'status', 'regionId', 'type', 'userId'],
    properties: {
      _id: {
        $id: '_id',
        type: 'number',
        title: 'numéro de course',
        description: 'Identifiant de la course',
      },
      type: {
        type: 'string',
        title: 'Type de ticket',
        description: 'type de ticket',
        field: {
          required: true,
        },
      },
      status: {
        type: 'string',
        title: 'Statut',
        description: 'Statut du ticket',
        enum: ['new', 'opened', 'treated', 'archived'],
        field: {
          enum: ['new', 'opened', 'treated', 'archived'],
          required: true,
          type: 'select',
        },
      },
      regionId: {
        type: 'number',
        title: 'numéro région',
        description: 'Identifiant de la région de course',
        field: {
          required: true,
        },
      },
      userId: {
        type: 'number',
        relation: '/user',
        title: 'numéro utilisateur',
        description: 'Identifiant utilisateur',
        foreignKey: '_id',
        label: 'email',
        field: {
          required: false,
          type: "EnyoSelect",
          fieldOptions: {
            trackBy: '_id',
            label: 'email'
          }
        },
      },
      subject: {
        type: 'string',
        title: 'Sujet',
        description: 'Sujet du ticket',
        field: {
          required: true,
        },
      },
      body: {
        type: 'string',
        title: 'Message',
        description: 'Texte saisi dans le ticket',
        field: {
          required: true,
          type: 'textArea',
        },
        createdOn: {
          type: ['string', 'object'],
          format: 'date-time',
          readonly: true,
          column: { type: 'datetime' },
        },
        lastModifiedOn: {
          type: ['string', 'object'],
          format: 'date-time',
          readonly: true,
          column: { type: 'datetime' },
        },
      },
    },
  }
