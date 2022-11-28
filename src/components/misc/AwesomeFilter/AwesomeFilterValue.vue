<template>
  <div
    v-if="!['$isNull', '$isNotNull', '$isDefined', '$isNotDefined'].includes(currentFilter.value)"
    class="column awesome-filter-value"
  >
    <div v-if="Object.keys(currentField).length || permanentInput">
      <!-- TYPE NUMBER -->
      <input
        v-if="
          (currentField.type === 'number' || currentField.type === 'integer') &&
            currentFilter.value !== '$between' &&
            currentFilter.value !== '$notBetween'
        "
        v-model.number="value"
        type="number"
        class="form-control input-group-sm"
        :placeholder="$t('AwesomeFilter.labels.filterValue')"
      />

      <!-- TYPE STRING/TEXT -->
      <input
        v-else-if="
          ((currentField.type === 'text' ||
            currentField.type === 'html' ||
            currentField.type === 'string' ||
            currentField.type === 'url') &&
            !currentFieldEnum) ||
            permanentInput
        "
        v-model="value"
        type="text"
        class="form-control input-group-sm"
        :placeholder="$t('AwesomeFilter.labels.filterValue')"
      />
      <!-- TYPE STRING/TEXT WITH ENUM -->
      <div
        class="dropdown"
        v-if="
          (currentField.type === 'text' || currentField.type === 'string' || currentField.type === 'url') &&
            currentFieldEnum
        "
      >
        <select v-model="value" class="form-control" aria-labelledby="field">
          <option disabled selected>{{ $t('AwesomeFilter.labels.values') }}</option>
          <option v-for="(field, index) in currentFieldEnum" :key="index" :selected="field === value">
            {{ field }}
          </option>
        </select>
      </div>
      <!-- TYPE NUMBER BETWEEN/NOTBETWEEN -->
      <div
        class="form-element between"
        v-else-if="
          (currentField.type === 'number' || currentField.type === 'integer') &&
            (currentFilter.value === '$between' || currentFilter.value === '$notBetween')
        "
      >
        <input
          v-model.number="value.from"
          type="number"
          class="form-control"
          :placeholder="$t('AwesomeFilter.labels.from')"
        />
        <input v-model="value.to" type="number" class="form-control" :placeholder="$t('AwesomeFilter.labels.to')" />
      </div>
      <!-- TYPE BOOLEAN -->
      <div v-else-if="currentField.type === 'boolean'" class="form-element">
        <select v-model="value" class="form-control">
          <option value="true">true</option>
          <option value="false">false</option>
          <option :value="'NULL'">Null</option>
        </select>
      </div>
      <!-- TYPE DATETIME/DATE SIMPLE -->
      <div
        class="form-element"
        v-else-if="
          (currentField.type === 'datetime' || currentField.type === 'date') &&
            currentFilter.value !== '$notBetween' &&
            currentFilter.value !== '$between'
        "
      >
        <date-range-picker
          class="form-group"
          :locale-data="dateRangePicker.locale"
          :date-range="dateRangePicker"
          :single-date-picker="true"
          :time-picker="true"
          :open="'left'"
          :time-picker-increment="1"
          :show-week-numbers="false"
          :show-dropdowns="false"
          :ranges="false"
          @update="onDateFilter"
        />
      </div>
      <!-- TYPE DATETIME/DATE RANGE-->
      <div
        class="form-element"
        v-else-if="
          (currentField.type === 'datetime' || currentField.type === 'date') &&
            (currentFilter.value === '$notBetween' || currentFilter.value === '$between')
        "
      >
        <date-range-picker
          class="form-group vgt-date-range"
          :date-range="dateRangePicker"
          :locale-data="dateRangePicker.locale"
          :open="'left'"
          @update="onDateFilter"
        />
      </div>
      <!-- ADD SELECT FOR RELATION / OBJECT -->
      <FieldVSelect
        v-else-if="currentField.type === 'relation'"
        class="form-control input-group-sm"
        :schema="{
          ...currentField,
          model: currentField.field,
          hidden: false,
          fieldOptions: { ...currentField, hidden: false }
        }"
        :model="{}"
        :multiple="currentFilter && currentFilter.value === '$in'"
        taggable
        :placeholder="$t('AwesomeFilter.labels.filterValue')"
        :url="currentField.relationUrl"
        clientID
        v-model="value"
      />
      <!-- ADD SELECT FOR object / array -->
      <input
        v-else-if="currentField.type === 'object'"
        v-model.number="value"
        type="text"
        class="form-control input-group-sm"
        :placeholder="$t('AwesomeFilter.labels.filterValue')"
      />
      <!-- TYPE TIME -->
      <input
        v-else-if="currentField.type === 'time'"
        v-model="value"
        type="time"
        class="form-control input-group-sm"
        :placeholder="$t('AwesomeFilter.labels.filterValue')"
      />
      <!-- the rest -->
      <input
        v-if="isUnsupportedType"
        v-model="value"
        type="text"
        class="form-control input-group-sm v-else"
        :class="`field-type-${currentField.type}`"
        :placeholder="$t('AwesomeFilter.labels.filterValue')"
      />
    </div>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import dayjs from 'dayjs';
import i18nMixin from '../../../mixins/i18nMixin';
const localeData = require('dayjs/plugin/localeData');
import FieldVSelect from '../../crud/fields/FieldVSelect.vue';

dayjs.extend(localeData);
export default {
  name: 'AwesomeFilterValue',
  mixins: [i18nMixin],
  components: {
    DateRangePicker,
    FieldVSelect
  },
  props: {
    currentField: {
      type: Object,
      required: true
    },
    currentFilter: {
      type: Object,
      required: true
    },
    currentValue: {
      required: true
    },
    currentValueLabel: {
      type: String,
      required: false
    },
    permanentInput: {
      type: Boolean
    }
  },
  data: () => ({
    value: '',
    valueLabel: '',
    dateRangePicker: {
      startDate: dayjs(),
      endDate: dayjs().add(7, 'days'),
      locale: {
        direction: 'ltr', // direction of text
        format: 'yyyy-mm-dd', // fomart of the dates displayed
        separator: ' - ', // separator between the two ranges
        applyLabel: 'Appliquer',
        cancelLabel: 'Annuler',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: dayjs.weekdaysMin(),
        monthNames: dayjs.monthsShort(),
        firstDay: 1
      }
    }
  }),
  computed: {
    currentFieldEnum() {
      return (
        this.currentField.enum ||
        (this.currentField.filterOptions && this.currentField.filterOptions.filterDropdownItems)
      );
    },
    isUnsupportedType() {
      return (
        !this.currentField.type ||
        ['string', 'number', 'integer', 'boolean', 'datetime', 'date', 'time', 'relation', 'object', 'text'].indexOf(
          this.currentField.type
        ) === -1
      );
    }
  },
  methods: {
    updateValue(value) {
      this.$emit('update:current-value', value);
    },
    onDateFilter(value) {
      if (!value) {
        return;
      }
      if (this.currentFilter.value !== '$notBetween' && this.currentFilter.value !== '$between') {
        this.value = dayjs(value.startDate.toISOString()).format('YYYY-MM-DD HH:mm');
      } else {
        this.value = {
          from: value.startDate.toISOString().slice(0, 10),
          to: value.endDate.toISOString().slice(0, 10)
        };
      }
    },

    onRelationValueChanged(value) {
      if (this.currentField.relation && this.currentField.relationLabel) {
        // @todo improve to user template tags also.
        this.valueLabel = value[this.currentField.relationLabel];
      }

      if (this.valueLabel) {
        this.$emit('update:current-value-label', this.valueLabel);
        return;
      }
      // this.$emit('update:current-value-label', value);
    }
  },
  watch: {
    value(newValue) {
      this.updateValue(newValue);
    },

    currentField(newField) {
      if (newField && typeof newField === 'object' && Object.keys(newField).length) {
        if (newField.type === 'datetime' || newField.type === 'date') {
          this.value = new Date().toISOString();
        } else if (newField.type === 'boolean') {
          this.value = true;
        } else {
          this.value = '';
        }
      } else {
        this.value = '';
      }
    },

    currentFilter(newFilter) {
      if (newFilter.value === '$between' || newFilter.value === '$notBetween') {
        this.value = {
          from: '',
          to: ''
        };
      }
    }
  },
  mounted() {
    this.value = this.currentValue;
    this.dateRangePicker.locale.applyLabel = this.$t('dateRangePicker.applyLabel');
    this.dateRangePicker.locale.cancelLabel = this.$t('dateRangePicker.cancelLabel');
    this.dateRangePicker.locale.weekLabel = this.$t('dateRangePicker.weekLabel');
    this.dateRangePicker.locale.customRangeLabel = this.$t('dateRangePicker.customRangeLabel');
  }
};
</script>

<style lang="scss">
.awesome-filter-value {
  .awesome-vue-select {
    height: auto;
    padding: 0px;
    .vs__dropdown-toggle {
      border: none;
    }
  }

  .vs__selected-options {
    display: inline-block;
    overflow: auto;
    display: block;
    white-space: nowrap;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    min-width: 100px;
    width: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .vs1__listbox {
    min-width: 250px;
    width: auto;
  }

  .vs__dropdown-toggle-menu::-webkit-scrollbar {
    display: none;
  }
  .vs_actions {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
