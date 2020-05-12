export default {
  props: {
    options: {
    },
    value: [String,Boolean,Array],
    type: String,
    src: String,
    row: Array,
    field: String,
    style: String,
    class:String
  },
  data() {
    return {
    };
  },
  methods:{
    clickOnItem(item){
        this.$emit('view', item);
    }
  }
};
