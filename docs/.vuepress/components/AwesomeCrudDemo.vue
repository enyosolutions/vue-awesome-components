<template>
  <div>
    <!-- Latest compiled and minified CSS -->
    ``
    <h3>Simple Crud</h3>
    <pre style="color:white">
      < AwesomeCrud@
      :columns="['col1', 'col2', 'col3', 'col4']"
      :rows="[
      {col1: 'qq', col2:'some data', col3: 'oopsie',
      notDisplayedColumn: 'ghosted'},
      {col1: 'qq2', col2:'some moore data', col3: 'oopsie',
      notDisplayedColumn: 'ghosted'},
      {col1: 'qq3', col2:'a third data', col3: 'oopsie',
      notDisplayedColumn: 'ghosted'},
      ]"
      :options="{actions: {noActions: false}}"
      />
    </pre>

    <AwesomeCrud
      model-name="ticket"
      :schema="ticketModel"
      :columns="['col1', 'col2', 'col3']"
      modal-mode="slide"
      :rows="[
        {
          col1: 'qq',
          col2: 'some data',
          col3: 'oopsie',
          notDisplayedColumn: 'ghosted'
        },
        {
          col1: 'qq2',
          col2: 'some moore data',
          col3: 'oopsie',
          notDisplayedColumn: 'ghosted'
        },
        {
          col1: 'qq3',
          col2: 'a third data',
          col3: 'oopsie',
          notDisplayedColumn: 'ghosted'
        }
      ]"
      :options="{ detailPageMode: 'modal', actions: { create: true } }"
    />

    <br />
    <br />
    <br />
    <h3>Table with details opening in slide mode</h3>

    <AwesomeCrud
      model-name="ticket2"
      :schema="ticketModel"
      :columns="['col1', 'col2', 'col3']"
      :rows="[
        {
          col1: 'qq',
          col2: 'some data',
          col3: 'oopsie',
          notDisplayedColumn: 'ghosted'
        },
        {
          col1: 'qq2',
          col2: 'some moore data',
          col3: 'oopsie',
          notDisplayedColumn: 'ghosted'
        },
        {
          col1: 'qq3',
          col2: 'a third data',
          col3: 'oopsie',
          notDisplayedColumn: 'ghosted'
        }
      ]"
      :options="{ detailPageMode: 'slide', actions: { create: true } }"
    />
  </div>
</template>

<script>
import AwesomeCrud from '../../../src/components/crud/AwesomeCrud.vue';
import ticketModel from '../../../examples/fixtures/ticket.js';

export default {
  name: 'AwesomeCrudDemo',
  components: { AwesomeCrud },
  props: {},
  mounted() {},
  data() {
    return {
      ticketModel
    };
  }
};
</script>

<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '../../../src/main.scss';

table {
  margin: 0px;
}
.ajax-table-card-body {
  padding: 0;
}

.table {
  .radio,
  .checkbox {
    position: relative;
    height: 20px;
    display: block;
    width: 20px;
    padding: 0px 0px;
    margin: 0px 5px;
    text-align: center;

    .icons {
      left: 5px;
    }
  }

  > thead > tr > th,
  > tbody > tr > th,
  > tfoot > tr > th,
  > thead > tr > td,
  > tbody > tr > td,
  > tfoot > tr > td {
    padding: 12px 8px;
    vertical-align: middle;
  }

  > thead > tr > th,
  > tfoot > tr > th {
    border-bottom-width: 1px;
    font-size: 12px;
    text-transform: uppercase;
    color: #333;
    font-weight: 400;
    padding-bottom: 5px;
    border-top: none !important;
    border-bottom: none;
    text-align: left !important;
  }

  .td-actions .btn {
    opacity: 0.36;

    &.btn-xs {
      padding-left: 3px;
      padding-right: 3px;
    }
  }

  .td-actions {
    min-width: 90px;
  }

  > tbody > tr {
    position: relative;

    &:hover {
      .td-actions .btn {
        opacity: 1;
      }
    }
  }

  .btn:focus {
    box-shadow: none !important;
  }

  &.vgt-table {
    font-size: 16px;
    border-collapse: collapse;
    background-color: white;
    width: 100%;
    max-width: 100%;
    table-layout: auto;
    /* border: 1px solid #DCDFE6; */
    border: none;

    thead > tr > th {
      border-bottom-width: 1px;
      font-size: 12px;
      text-transform: uppercase;
      color: #555;
      font-weight: 400;
      padding-bottom: 5px;
      border-top: none !important;
      border-bottom: none;
      text-align: left !important;
      background: transparent;
      margin-top: 10px;
    }

    &.striped {
      tbody {
        tr:nth-of-type(odd) {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
    }

    td {
      border-bottom: 1px solid #e9ecef;
      padding: 12px 8px;
      vertical-align: middle;
      text-align: left;
      color: #212529;
    }
  }

  &-standup {
    .form-group {
      margin-bottom: 0;
    }

    .button-row {
      text-align: left !important;
      padding-right: 0 !important;
      width: 35px;
    }
  }
}

.table-upgrade {
  .table {
    tr {
      td {
        width: 100%;
      }
    }
  }
}

.vgt-global-search,
.vgt-wrap__footer {
  background: none;
  border: none;
}

.vgt-global-search {
  justify-content: flex-end;

  .vgt-global-search__input {
    flex-grow: 0.2;
  }
}

@media (max-width: 720px) {
  .vgt-global-search {
    justify-content: flex-end;

    .vgt-global-search__input {
      flex-grow: 1;
      flex: auto;
    }
  }
}
</style>
