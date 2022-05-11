export default {
  data() {
    return {

    }
  },
  methods: {
    ModifyPass(index) {
      this.$emit('toIndex', index)
    }
  }
}
