<template>
  <div class="list">
    <div class="list-content">
      <div class="list-header">
        <div class="list-title">
          {{title}}
        </div>
        <div class="list-actions">
          <div class="dropdown column">
            <button
              class="btn btn-simple btn-alt-style btn-sm p-2"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-ellipsis-h"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="filter">
              <a
                href="#"
                v-for="i in [1,2,3]"
                :key="i"
                class="dropdown-item"
              >Action{{i}}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="list-cards">
        <Draggable
          class="draggable-list"
          :list="list"
          :group="group"
          :animation="animation"
          ghost-class="moving-card"
          :scroll-sensitivity="scrollSensitivity"
        >
          <div class="card" v-for="(data, index) in list" :key="index">
            <KanbanCard :data="data"></KanbanCard>
          </div>
        </Draggable>
      </div>
    </div>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable';
  import KanbanCard from "./KanbanCard";

  export default {
    name: "KanbanList",
    components: {
      Draggable,
      KanbanCard
    },
    props: {
      title: {
        type: String,
        default: 'Title'
      },
      list: {
        type: Array,
        default: () => ([])
      },
      group: {
        type: String,
        default: 'default'
      },
      animation: {
        type: Number,
        default: 200
      },
      scrollSensitivity: {
        type: Number,
        default: 200
      }
    },
    data: () => ({
      //
    })
  }
</script>

<style lang="scss" scoped>
  .list {
    width: 300px;
    margin: 0 4px;
    height: 100%;
    white-space: nowrap;

    .list-content {
      background-color: rgba(black, .1);
      padding: 8px;
      border-radius: 4px;
      margin: 0 10px;
      max-height: 100%;
      display: flex;
      flex-direction: column;

      .list-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 8px;
        flex: 0 0 auto;
        align-items: center;
      }

      .list-cards {
        flex: 1 1 auto;
        overflow-y: auto;
        overflow-x: hidden;
        margin: 0 4px;
        padding: 0 4px;
        min-height: 70px;
        display: flex;
        flex-direction: column;

        .moving-card {
          opacity: 0.4;
          background: #F7FAFC;
          border: 1px solid #4299e1;
        }

        .draggable-list {
          flex: 1 1 auto;
          width: 100%;
        }
      }
    }
  }
</style>