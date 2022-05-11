export default{
  data(){
    return{
      dialogVisible: true,
    }
  },
  methods:{
    handleClose(){
      this.dialogVisible=false
    }
  },
  mounted(){
    console.log(12344)
  }
}
