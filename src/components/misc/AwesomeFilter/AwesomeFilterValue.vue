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
        v-if="
          ((currentField.type === 'text' || currentField.type === 'string' || currentField.type === 'url') &&
            !currentField.enum) ||
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
            currentField.enum
        "
      >
        <button
          class="btn btn-default dropdown-toggle p-0 mr-2 ml-2"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {{ Object.keys(value).length ? value : $t('AwesomeFilter.labels.values') }}
        </button>
        <div class="dropdown-menu" aria-labelledby="field">
          <a href="" @click.prevent="value = ''" class="dropdown-item">{{ $t('AwesomeFilter.labels.values') }}</a>
          <a
            href=""
            @click.prevent="value = field"
            class="dropdown-item"
            v-for="(field, index) in currentField.enum"
            :key="index"
          >
            {{ field }}
          </a>
        </div>
      </div>
      <!-- TYPE NUMBER BETWEEN/NOTBETWEEN -->
      <div
        class="form-element between"
        v-if="
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
      <div v-if="currentField.type === 'boolean'" class="form-element">
        <select v-model="value" class="form-control">
          <option value="true">true</option>
          <option value="false">false</option>
          <option :value="'NULL'">Null</option>
        </select>
      </div>
      <!-- TYPE DATETIME/DATE SIMPLE -->
      <div
        class="form-element"
        v-if="
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
        v-if="
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
        v-if="currentField.type === 'relation'"
        class="form-control input-group-sm"
        :schema="{
          ...currentField,
          model: currentField.field,
          hidden: false,
          fieldOptions: { ...currentField, hidden: false }
        }"
        :model="{}"
        :multiple="currentFilter && currentFilter.value === '$in'"
        :placeholder="$t('AwesomeFilter.labels.filterValue')"
        :url="currentField.relationUrl"
        v-model="value"
      />
    </div>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import dayjs from 'dayjs';
import i18nMixin from '../../../mixins/i18nMixin';
import localeData from 'dayjs/plugin/localeData';
import FieldVSelect from '../../crud/fields/FieldVSelect';

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
      type: [String, Object, Number, Array],
      required: true
    },
    permanentInput: {
      type: Boolean
    }
  },
  data: () => ({
    value: '',
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
  methods: {
    updateValue(value) {
      this.$emit('update:current-value', value);
    },
    onDateFilter(value) {
      if (!value) {
        return;
      }
      if (this.currentFilter.value !== '$notBetween' && this.currentFilter.value !== '$between') {
        this.value = dayjs(value.startDate.toISOString()).format('YYYY-MM-DD hh:mm');
      } else {
        this.value = {
          from: value.startDate.toISOString().slice(0, 10),
          to: value.endDate.toISOString().slice(0, 10)
        };
      }
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
    height: 28px;
    padding: 2px;
  }

  .vs__selected-options {
    display: inline-block;
    overflow: auto;
    display: block;
    white-space: nowrap;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
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
