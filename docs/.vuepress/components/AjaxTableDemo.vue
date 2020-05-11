<template>
  <div>
    <!-- Latest compiled and minified CSS -->
    ``
    <h3>Simple table</h3>
    <pre style="color:white">
      < EnyoAjaxTable
      :columns="['col1', 'col2', 'col3', 'col4']"
      :rows="[
      {col1: 'qq', col2:'some data', col3: 'oopsie',
      notDisplayedColumn: 'ghosted'},
      {col1: 'qq2', col2:'some moore data', col3: 'oopsie',
      notDisplayedColumn: 'ghosted'},
      {col1: 'qq3', col2:'a third data', col3: 'oopsie',
      notDisplayedColumn: 'ghosted'},
      ]"
      :options="{actions: {noActions: true}}"
      />
    </pre>

    <EnyoAjaxTable
      :columns="['col1', 'col2', 'col3']"
      :rows="[
        {
          col1: 'qq',
          col2: 'some data',
          col3: 'oopsie',
          notDisplayedColumn: 'ghosted',
        },
        {
          col1: 'qq2',
          col2: 'some moore data',
          col3: 'oopsie',
          notDisplayedColumn: 'ghosted',
        },
        {
          col1: 'qq3',
          col2: 'a third data',
          col3: 'oopsie',
          notDisplayedColumn: 'ghosted',
        },
      ]"
      :options="{ actions: { noActions: true } }"
    />

    <br />
    <br />
    <br />
    <h3>Table with custom fields</h3>
    <hr />
    <pre style="color:white">
         < EnyoAjaxTable
      :columns="[{type:'string', field: 'picture'},
        {type: 'url', field: 'url'},
        {type: 'boolean', field: 'myboolean'},
        {type: 'date', field: 'date'},
        {type: 'datetime', field: 'dateTime'},
        ]"
      :rows="[
      {picture: 'https://picsum.photos/200?1', url:'https://mozilla.org', myboolean: false, notDisplayedColumn: 'ghosted', object: {foo: 'bar', john: 'doe', a: {b:1}},
       date: new Date(), dateTime: new Date(), checkbox: true, html:''},
      {picture: 'https://picsum.photos/200?2', url:'https://bing.com', myboolean: true, notDisplayedColumn: 'ghosted', object: {foo: 'bar', john: 'doe', a: {b:1}},
       date: new Date(), dateTime: new Date(), checkbox: false},
      {picture: 'https://picsum.photos/200?3', url:'https://google.com', myboolean: undefined, notDisplayedColumn: 'ghosted', object: {foo: 'bar', john: 'doe', a: {b:1}},
       date: new Date(),
      dateTime: new Date(),},
       ]"
       :options="{actions: {noActions: true}}"
    />
    </pre>
    <EnyoAjaxTable
      :columns="[
        { type: 'string', field: 'picture' },
        { type: 'url', field: 'url' },
        { type: 'boolean', field: 'myboolean' },
        { type: 'date', field: 'date' },
        { type: 'datetime', field: 'dateTime' },
      ]"
      :rows="[
        {
          picture: 'https://picsum.photos/200?1',
          url: 'https://mozilla.org',
          myboolean: false,
          notDisplayedColumn: 'ghosted',
          object: { foo: 'bar', john: 'doe', a: { b: 1 } },
          date: new Date(),
          dateTime: new Date(),
          checkbox: true,
          html: '',
        },
        {
          picture: 'https://picsum.photos/200?2',
          url: 'https://bing.com',
          myboolean: true,
          notDisplayedColumn: 'ghosted',
          object: { foo: 'bar', john: 'doe', a: { b: 1 } },
          date: new Date(),
          dateTime: new Date(),
          checkbox: false,
        },
        {
          picture: 'https://picsum.photos/200?3',
          url: 'https://google.com',
          myboolean: undefined,
          notDisplayedColumn: 'ghosted',
          object: { foo: 'bar', john: 'doe', a: { b: 1 } },
          date: new Date(),
          dateTime: new Date(),
        },
      ]"
      :options="{ actions: { noActions: true } }"
    />

    <br />
    <br />
    <br />
    <h3>Table with even more custom fields</h3>
    <hr />
    <pre style="color:white">
         < EnyoAjaxTable
      :columns="[{type:'image', field: 'picture'},
        {type: 'checkbox', field: 'checkbox'},
        {type: 'html', field: 'html'},
        ]"
      :rows="[
      {picture: 'https://picsum.photos/200?1', url:'https://mozilla.org',
       dateTime: new Date(),},
      {picture: 'https://picsum.photos/200?2', url:'https://bing.com', myboolean: true, notDisplayedColumn: 'ghosted'},
      {picture: 'https://picsum.photos/200?3', url:'https://google.com', myboolean: undefined, notDisplayedColumn: 'ghosted'},
       ]"
       :options="{actions: {noActions: true, search: true}}"
    />
    </pre>
    <EnyoAjaxTable
      :columns="[
        { type: 'image', field: 'picture' },
        { type: 'object', field: 'object' },
        { type: 'checkbox', field: 'checkbox' },
        { type: 'html', field: 'html' },
      ]"
      :rows="[
        {
          picture: 'https://picsum.photos/200?1',
          url: 'https://mozilla.org',
          myboolean: false,
          notDisplayedColumn: 'ghosted',
          object: { foo: 'bar', john: 'doe', a: { b: 1 } },
          date: new Date(),
          dateTime: new Date(),
          checkbox: true,
          html: '<b>bold</b> <hr/> <u>underlined</u>',
        },
        {
          picture: 'https://picsum.photos/200?2',
          url: 'https://bing.com',
          myboolean: true,
          notDisplayedColumn: 'ghosted',
          object: {
            foo: 'bar',
            john: 'doe',
            a: { b: 1, foo: 'bar', john: 'doe' },
            b: { b: 1, foo: 'bar', john: 'doe' },
            c: { b: 1, foo: 'bar', john: 'doe' },
          },
          date: new Date(),
          dateTime: new Date(),
          checkbox: false,
          html: `<iframe width='100%' height='315' src='https://www.youtube.com/embed/wZZ7oFKsKzY' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>`,
        },
      ]"
      :options="{ actions: { noActions: true } }"
    />

    <br />
    <br />
    <br />
    <h3>Table with api</h3>
    <hr />

    <pre style="color:white">
           < EnyoAjaxTable
      :columns="[{type:'number', field: 'userId'},
       {type: 'number', field: 'id'},
       {type: 'boolean', field: 'completed'},
       {type: 'string', field: 'title'}]"
       url="https://jsonplaceholder.typicode.com/todos"
       responseField=""
       :options="{
        fixedHeader: true,
        maxHeight: '50vh',
        actions: {search: true, filter: true}
        }"
    />
    </pre>
    <EnyoAjaxTable
      :columns="[
        { type: 'number', field: 'userId' },
        { type: 'number', field: 'id' },
        { type: 'boolean', field: 'completed' },
        { type: 'string', field: 'title' },
      ]"
      url="https://jsonplaceholder.typicode.com/todos"
      responseField=""
      :options="{
        fixedHeader: true,
        maxHeight: '50vh',
        actions: { search: true, filter: true },
      }"
    />
  </div>
</template>

<script>
import EnyoAjaxTable from '../../../src/components/table/AwesomeTable.vue';

export default {
  name: 'AjaxTableDemo',
  components: { EnyoAjaxTable },
  props: {},
  mounted() {},
  data() {
    return {};
  },
};
</script>

<style lang="css">

@import "~bootstrap/dist/css/bootstrap.min.css";


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

    >thead>tr>th,
    >tbody>tr>th,
    >tfoot>tr>th,
    >thead>tr>td,
    >tbody>tr>td,
    >tfoot>tr>td {
        padding: 12px 8px;
        vertical-align: middle;
    }

    >thead>tr>th,
    >tfoot>tr>th {
        border-bottom-width: 1px;
        font-size: $font-size-small;
        text-transform: uppercase;
        color: $dark-gray;
        font-weight: $font-weight-normal;
        padding-bottom: 5px;
        border-top: none !important;
        border-bottom: none;
        text-align: left !important;
    }

    .td-actions .btn {
        @include opacity(0.36);

        &.btn-xs {
            padding-left: 3px;
            padding-right: 3px;
        }
    }

    .td-actions {
        min-width: 90px;
    }

    >tbody>tr {
        position: relative;

        &:hover {
            .td-actions .btn {
                @include opacity(1);
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

        thead>tr>th {
            border-bottom-width: 1px;
            font-size: $font-size-small;
            text-transform: uppercase;
            color: $dark-gray;
            font-weight: $font-weight-normal;
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
                width: 100%
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

@media(max-width: 720px) {
    .vgt-global-search {
        justify-content: flex-end;

        .vgt-global-search__input {
            flex-grow: 1;
            flex: auto;
        }
    }
}
</style>
