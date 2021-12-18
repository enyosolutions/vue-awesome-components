import { isString, get, isFunction, find, startCase, merge } from 'lodash';
import templatingMixin from './templatingMixin';

export default {
  mxixins: [templatingMixin],
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

    getSelectEnumFromStore(val) {
      const options =
        isString(val) && val.indexOf('$store') === 0 ? get(this.$store.state, val.replace('$store.', '')) : val;
      return options;
    },

    transformStateBooleans(field) {
      ['visible', 'required', 'readonly', 'disabled'].forEach(prop => {
        if (isString(field[prop])) {
          field[prop] = this.templateParseBoolean(field[prop]);
        }
      });
    },

    transformStateFunctions(field) {
      ['visible', 'required', 'readonly', 'disabled'].forEach(prop => {

        if (isFunction(field[prop])) {
          field[prop] = this.templateParseFunc(field[prop]);
        }
      });
    },

    parseSchema(schema, prefix = '') {
      if (!schema.properties) {
        return { title: schema.title, default: {} };
      }
      if (prefix && schema.$schema) {
        // console.warn("possible recursive parseSchema call", schema);
        return;
      }
      const fields = [];
      const size = Object.keys(schema.properties).length;
      Object.keys(schema.properties).forEach((key) => {
        const prop = schema.properties[key];
        if (!prop.field) {
          prop.field = {};
        }
        if (prop.field.hidden) {
          console.warn('hidden is @deprecated, please use visible: false');
          return;
        }
        if (prop.field.visible == false || prop.field.visible == 0) {
          return;
        }
        if (prop.type === 'object' && !(prop.field.type)) {
          const subSchema = this.parseSchema(prop, `${prefix}${key}.`);
          subSchema.legend = prop.title || startCase(key);
          subSchema.type = 'group';
          subSchema.default = {};
          subSchema.id = key;
          subSchema.styleClasses = `subgroup  ${(prop.field.styleClasses) || ''}`;
          fields.push(subSchema);
        } else {
          const relationUrl = this.getRelationUrl(prop);
          const relationKey = this.getRelationKey(prop);
          const relationLabel = this.getRelationLabel(prop);

          const fieldOptions = merge({}, {
            url: relationUrl || prop.relationUrl || prop.relation,
            trackBy: relationKey || prop.foreignKey || 'id',
            label: relationLabel || 'label', // key label for enyo select >
            name: relationLabel || 'label', // key label for native select
            step: prop.field.step,
            readonly: this.displayMode === 'view' || (prop.field.readonly),
            disabled: this.displayMode === 'view' || (prop.field.disabled),
            relation: prop.relation,
            foreignKey: relationKey,
            relationKey,
            relationLabel,
            relationUrl,
          }, { ...prop.field.fieldOptions });

          if (prop.relation) {
            fieldOptions.url = fieldOptions.url || relationUrl || prop.relationUrl || prop.relation;
            fieldOptions.trackBy = relationKey || prop.foreignKey;
            fieldOptions.searchable = true;
          }
          const field = {
            type: (prop.field.type) || this.getFormtype(prop),
            label: prop.title || prop.description || startCase(key),
            placeholder: prop.placeholder,
            values:
              (
                (fieldOptions.values || this.getSelectEnumFromStore(fieldOptions.enum))) ||
              prop.enum ||
              (prop.items && prop.items.enum) ||
              [],
            hint: prop.description,
            model: prefix + key,
            min: prop.min,
            max: prop.max,
            multi: prop.type === 'array',
            styleClasses: ((prop.field.classes || prop.field.styleClasses)) || (this.layout || size < 8 ? 'col-12' : 'col-6'),
            relation: prop.relation,
            foreignKey: relationKey || prop.foreignKey,
            relationUrl,
            relationKey,
            relationLabel,
            ...prop.field,
            readonly: this.displayMode === 'view' || (prop.field.readonly),
            disabled: this.displayMode === 'view' || (prop.field.disabled),
          };

          if (!fieldOptions.inputType) {
            fieldOptions.inputType =
              (prop.field.inputType) || this.getFormInputType(prop) || 'text';
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
          if (field.type === 'dateTime' || field.type === 'date') {
            fieldOptions.icons = {
              time: 'fa fa-clock-o',
              date: 'fa fa-calendar',
              up: 'fa fa-arrow-up',
              down: 'fa fa-arrow-down'
            };
          }


          if (field.type === 'date') {
            field.type = 'dateTime';
            if (!fieldOptions.type) {
              fieldOptions.type = 'date';
            }
          }

          if (field.type === 'time') {
            field.type = 'dateTime';
            if (!fieldOptions.type) {
              fieldOptions.type = 'time';
            }
          }

          // default items for selects
          if (field.type === 'enyoSelect' && !fieldOptions.options) {
            field.options = field.values;
          }

          // default items for selects
          if (field.type === 'vSelect' && fieldOptions.store && !fieldOptions.options) {
            fieldOptions.options = get(this.$store.state, fieldOptions.store);
          }

          this.transformStateBooleans(field);
          this.transformStateFunctions(field);

          if (field.required) {

            if (!field.validator) {
              field.validator = [];
            }
            // always put validators in arrays
            if (typeof (field.validator) === 'string') {
              field.validator = [field.validator];
            }

            // in case the template parser transformed the result
            if (field.required) {
              field.validator.push('required');
            }

          }

          if (field.viewOptions && !field.displayOptions) {
            console.warn('@deprecated, please rename field.viewOptions into field.displayOptions');
            field.viewOptions = field.displayOptions;
          }
          field.displayOptions = prop.field.displayOptions || {
            ...prop.column,
            hidden: undefined,
            type: this.getColumnType(prop),
            classes: (prop.column && prop.column.classes),
            styles: (prop.column && prop.column.styles)
          }
          field.displayOptions.relation = field.displayOptions.relation || prop.relation;
          field.displayOptions.relationUrl = field.displayOptions.relationUrl || relationUrl;
          field.displayOptions.relationKey = field.displayOptions.relationKey || relationKey;
          field.displayOptions.relationLabel = field.displayOptions.relationLabel || relationLabel;

          fields.push({ ...field, fieldOptions });
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
          newCol.label = startCase((prop.column && prop.column.title) || prop.title || key);
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
            id: group.id,
            type: 'group'
          });
        }
      });
      if (groups.length < 1) {
        groups = [{ legend: '', fields: schema.fields, }];
      }
      return groups;
    },

    distributeFieldsInGroups(groups, fields) {
      fields.forEach((f) => {
        if (f.group) {
          const keys = f.group.split('.');
          let targetGroup = { groups };
          keys.forEach((key) => {
            targetGroup = find(targetGroup.groups, { id: key });
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