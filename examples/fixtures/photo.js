module.exports = {
  $id: "http://acme.com/schemas/photo.json",
  type: "object",
  required: ["type", "subject", "body", "status", "regionId", "type", "userId"],
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
      $id: "id",
      type: "integer",
      title: "Id",
      description: "",
      field: {
        group: "infos"
      }
    },

    author: {
      type: "string",
      title: "Author",
      description: "Author of the picture",
      column: {
        type: 'string'
      },
      field: {
        required: true,
        group: "infos.metaData"
      }
    },

    "width": {
      type: "integer",
      title: "Witdh",

      field: {
        required: true
      }
    },
    height: {
      type: "integer",
      title: "Witdh",
      field: {
        required: true
      }
    },

    url: {
      type: "string",
      title: "Url",
      format: 'url',
      column: {
        type: 'url'
      },
      field: {
        required: true
      }
    },
    download_url: {
      type: "string",
      format: 'url',
      title: "download url",
      column: {
        type: 'image'
      },
      field: {
        required: true,
        type: "textArea"
      },
    },
    notes: {
      type: "string",
      title: "Notes",
      column: {
        type: 'text'
      },
      field: {
        required: true,
        type: "textArea",
        displayOptions: {
          type: 'html'
        }
      },
    }

  }
};
