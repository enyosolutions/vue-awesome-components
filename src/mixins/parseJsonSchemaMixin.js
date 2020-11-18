import _ from 'lodash';

export default {
  methods: {

    getFormtype(property) {
      let { type } = property;
      if (Array.isArray(type)) {
        const possibleTypes = ['string', 'number', 'boolean'];
        for (let i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }

      if (property.enum) {
        return 'select';
      }
      if (property.relation || property.relationUrl) {
        return 'VSelect';
      }
      switch (type) {
        case 'string':
          return 'input';
        case 'integer':
        case 'number':
          return 'input';
        case 'boolean':
          return 'select'; // put enyoSelect after debugging all the issues...enyoSelect
        default:
          return 'input';
      }
    },

    getFormInputType(property) {
      let { type } = property;
      if (Array.isArray(type)) {
        const possibleTypes = ['string', 'number', 'boolean'];
        for (let i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }

      switch (type) {
        case 'string':
          switch (property.format) {
            case 'email':
              return 'email';
            case 'date-time':
              return 'datetime';
            default:
              return 'text';
          }
        case 'number':
        case 'integer':
          return 'number';
        case 'boolean':
        case 'array':
        case 'object':
          return 'string';
        default:
          // console.error("type not known ", type, property);
          return type;
      }
    },

    getColumnType(property) {
      if (property.column && property.column.type) {
        return property.column.type;
      }
      if (property.columnType) {
        return property.columnType;
      }
      let { type } = property;
      if (Array.isArray(type)) {
        const possibleTypes = ['string', 'number', 'boolean'];
        for (let i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }
      if (property.relation) {
        return 'relation';
      }
      switch (type) {
        case 'string':
          switch (property.format) {
            case 'date-time':
              return 'text';
            default:
              return 'text';
          }
        case 'number':
        case 'integer':
          return 'number';
        case 'boolean':
          return 'boolean';
        case 'array':
        case 'object':
          return 'object';
        default:
          return 'text';
      }
    },


    parseSchema(schema, prefix = '') {
      if (!schema.properties) {
        return [];
      }
      if (prefix && schema.$schema) {
        // console.warn("possible recursive parseSchema call", schema);
        return;
      }
      const fields = [];
      const size = Object.keys(schema.properties).length;
      Object.keys(schema.properties).forEach((key) => {
        if ([this.primaryKey].indexOf(key) === -1) {
          const prop = schema.properties[key];
          if (prop.field && prop.field.hidden) {
            return;
          }
          if (prop.type === 'object' && !(prop.field && prop.field.type)) {
            const subSchema = this.parseSchema(prop, `${prefix}${key}.`);
            subSchema.legend = prop.title || _.startCase(key);
            subSchema.type = 'group';
            subSchema.styleClasses = `subgroup  ${(prop.field && prop.field.styleClasses) || 'card'}`;
            fields.push(subSchema);
          } else {
            const relationUrl = this.getRelationUrl(prop);
            const relationKey = this.getRelationKey(prop);
            const relationLabel = this.getRelationLabel(prop);
            if (prop.field && prop.relation && prop.field.fieldOptions) {
              prop.field.fieldOptions.url = relationUrl || prop.relationUrl || prop.relation;
              prop.field.fieldOptions.trackBy = relationKey || prop.foreignKey;
              prop.field.fieldOptions.searchable = true;
            }
            const field = {
              type: (prop.field && prop.field.type) || this.getFormtype(prop),
              label: prop.title || prop.description || _.startCase(key),
              placeholder: prop.description || prop.title || _.startCase(key),
              default: prop.default,
              fieldOptions: (prop.field && prop.field.fieldOptions) || {
                placeholder: prop.description || prop.title || _.startCase(key),
                url: relationUrl || prop.relationUrl || prop.relation,
                trackBy: relationKey || prop.foreignKey || 'id',
                label: relationLabel || 'label', // key label for enyo select >
                name: relationLabel || 'label', // key label for native select
                step: prop.field && prop.field.step,
                readonly: this.displayMode === 'view' || (prop.field && prop.field.readonly),
                disabled: this.displayMode === 'view' || (prop.field && prop.field.readonly),
                relation: prop.relation,
                foreignKey: relationKey,
                relationKey,
                relationLabel,
                relationUrl
              },
              values:
                (prop.field &&
                  prop.field.fieldOptions &&
                  (prop.field.fieldOptions.values || this.getSelectEnumFromStore(prop.field.fieldOptions.enum))) ||
                prop.enum ||
                (prop.items && prop.items.enum) ||
                [],
              required: prop.field && prop.field.required,
              hint: prop.description,
              model: prefix + key,
              validator: prop.field && prop.field.validator,
              min: prop.min,
              max: prop.max,
              multi: prop.type === 'array',
              readonly: this.displayMode === 'view' || (prop.field && prop.field.readonly),
              disabled: this.displayMode === 'view' || (prop.field && prop.field.readonly),
              styleClasses: (prop.field && (prop.field.classes || prop.field.styleClasses)) || (this.layout || size < 8 ? 'col-12' : 'col-6'),
              relation: prop.relation,
              foreignKey: relationKey || prop.foreignKey,
              relationKey,
              relationLabel,
              group: prop.field ? prop.field.group : undefined
            };
            if (!field.fieldOptions.inputType) {
              field.fieldOptions.inputType =
                (prop.field && prop.field.inputType) || this.getFormInputType(prop) || 'text';
            }
            if (
              prop.type === 'boolean' &&
              (field.type === 'select' || field.type === 'enyoSelect') &&
              (!field.values || !field.values.length)
            ) {
              field.values = [
                { id: true, label: 'Yes' },
                { id: false, label: 'No' },
                { id: '', label: '-' }
              ];
            }
            // datetime picker icons
            if (field.type === 'dateTime') {
              field.fieldOptions.icons = {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-arrow-up',
                down: 'fa fa-arrow-down'
              };
            }

            // default items for selects
            if (field.type === 'enyoSelect' && !field.fieldOptions.options) {
              field.options = field.values;
            }

            if (field.required) {
              if (!field.validator) {
                field.validator = [];
              }
              if (typeof (field.validator) === 'string') {
                field.validator = [field.validator];
              }
              field.validator.push('required');
            }
            if (field.viewOptions && !field.displayOptions) {
              console.warn('@deprecated, please rename field.viewOptions into field.displayOptions');
              field.viewOptions = field.displayOptions;
            }
            field.displayOptions = prop.field && prop.field.displayOptions || {
              ...prop.column,
              type: this.getColumnType(prop),
              classes: (prop.column && prop.column.classes),
              styles: (prop.column && prop.column.styles)
            }
            field.displayOptions.relation = field.displayOptions.relation || prop.relation;
            field.displayOptions.relationUrl = field.displayOptions.relationUrl || relationUrl;
            field.displayOptions.relationKey = field.displayOptions.relationKey || relationKey;
            field.displayOptions.relationLabel = field.displayOptions.relationLabel || relationLabel;
            fields.push(field);
          }
        }
      });
      // let groups = this.parseSchemaGroups(schema);
      // groups = this.distributeFieldsInGroups(groups, fields);

      return { fields };
    },

    parseColumns(properties) {
      const newcolumns = [];
      Object.keys(properties).forEach((key) => {
        let newCol = {};
        const prop = properties[key];
        if (!prop.hidden && !(prop.column && prop.column.hidden)) {
          newCol.field = key;
          newCol.type = this.getColumnType(prop);
          newCol.label = _.startCase((prop.column && prop.column.title) || prop.title || key);
          newCol.filterOptions = { enabled: false };
          newCol.enum = (prop.column && prop.column.enum) || prop.enum;
          newCol.sortable = prop.column && prop.column.sortable !== undefined ? prop.column.sortable : true;
          newCol = { ...newCol, ...prop.column };
          if (prop.relation) {
            newCol.relation = prop.relation;
            newCol.relationKey = this.getRelationKey(prop);
            newCol.relationUrl = this.getRelationUrl(prop);
            newCol.relationLabel = this.getRelationLabel(prop);
          }
          newcolumns.push(newCol);
        }
      });

      if (!newcolumns.find((col) => col.field === '__ACTIONS')) {
        newcolumns.push({
          field: '__ACTIONS',
          label: 'Actions',
          type: 'ACTIONS',
          filterable: false,
          enabled: false
        });
      }
      return newcolumns;
    },

    parseSchemaGroups(schema) {
      let groups = [];
      if (!schema.formGroups) {
        return {};
      }
      schema.formGroups.forEach((group) => {
        if (!groups[group.id]) {
          groups.push({
            fields: [],
            ...group,
            legend: this.$t(group.title),
            type: 'group'
          });
        }
      });
      if (groups.length < 1) {
        groups = [{ legend: '', fields: schema.fields }];
      }
      return groups;
    },

    distributeFieldsInGroups(groups, fields) {
      fields.forEach((f) => {
        if (f.group) {
          const keys = f.group.split('.');
          let targetGroup = { groups };
          keys.forEach((key) => {
            targetGroup = _.find(targetGroup.groups, { id: key });
          });
          if (targetGroup) {
            if (!targetGroup.fields) {
              targetGroup.fields = [];
            }
            targetGroup.fields.push(f);
          }
        }
      });
      return groups;
    },
  }
}