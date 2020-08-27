module.exports = {
  $id: "http://enyosolutions.com/schemas/ticket.json",
  type: "object",
  required: ["id", "type", "subject", "body", "status", "regionId", "type", "userId"],
  formGroups: [
    {
      id: "infos",
      title: "informations",
      wrapperClasses: "col-3",
      stylesClasses: "",
      headerClasses: "text-primary",
      type: "group",
      groups: [
        {
          id: "metaData",
          title: "metaData",
          wrapperClasses: "col-6",
          stylesClasses: "",
          headerClasses: "text-primary",
          type: "group"
        }
      ]
    },
    {
      id: "details",
      title: "Détails",
      wrapperClasses: "col-9",
      stylesClasses: "",
      headerClasses: "text-danger"
    }
  ],
  properties: {
    id: {
      $id: "_id",
      type: "number",
      title: "numéro de course",
      description: "Identifiant de la course",
      field: {
        // group: "infos"
      }
    },
    type: {
      type: "string",
      title: "Type de ticket",
      description: "type de ticket",
      field: {
        required: true,
        group: "infos.metaData"
      }
    },
    status: {
      type: "string",
      title: "Statut",
      description: "Statut du ticket",
      enum: ["new", "opened", "treated", "archived"],
      field: {
        group: "details",
        enum: ["new", "opened", "treated", "archived"],
        required: true,
        type: "select"
      }
    },
    regionId: {
      type: "integer",
      title: "numéro région",
      description: "Identifiant de la région de course",
      field: {
        group: "details",
        required: true
      }
    },
    userId: {
      type: "integer",
      relation: "user",
      relationUrl: "/user",
      title: "numéro utilisateur",
      description: "Identifiant utilisateur",
      foreignKey: "_id",
      label: "email",
      field: {
        required: false,
        type: "VSelect",
        group: "infos.metaData",
        fieldOptions: {
          trackBy: "_id",
          label: "email"
        }
      }
    },
    subject: {
      type: "string",
      title: "Sujet",
      description: "Sujet du ticket",
      field: {
        group: "message",
        required: true
      }
    },
    body: {
      type: "string",
      title: "Message",
      description: "Texte saisi dans le ticket",
      field: {
        group: "message",
        required: true,
        type: "textArea"
      },
    },
    createdOn: {
      type: ["string", "object"],
      format: "date-time",
      readonly: true,
      column: { type: "datetime", format: 'DD_MM_YYYY (HH,MM)', classes: 'badge badge-primary' },
      field: {
        group: "metaData",
        type: "dateTime",
      }
    },
    lastModifiedOn: {
      type: ["string", "object"],
      format: "date-time",
      readonly: true,
      column: { type: "datetime" },
      field: {
        group: "metaData",
        type: "dateTime"
      }
    }
  }
};
