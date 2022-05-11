export default {
  data() {
    return {

    }
  },
  methods: {
    setIndex(index) {
      this.$emit('getIndex', index)
    }
  }
}
