export default {
  data() {
    return {
      map: '',   //地图
      pointer: [{Longitude: 104.06,latitude: 30.67,name: "怡润·溪镇商住小区1"}, {Longitude: 104.26,latitude: 30.27,name: "怡润·溪镇商住小区2"}],
    }
  },
  methods: {
    // 绘制地图
    DrawMap() {
      this.map = new BMap.Map("container", {
        enableMapClick: false
      }); //创建地图
      var point = new BMap.Point(104.06, 30.67); //设置中心点
      this.map.centerAndZoom(point, 11); //地图的缩放级别
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      //自定义图片遮盖物
      // 遍历需要标记的点坐标（经纬度）
      for (let i = 0; i < this.pointer.length; i++) {
        var point2 = new BMap.Point(this.pointer[i].Longitude, this.pointer[i].latitude);
        var myIcon = new BMap.Icon(require('./down.png'), new BMap.Size(48, 48));
        // 创建标注对象并添加到地图
        var marker = new BMap.Marker(point2, {
          icon: myIcon
        });
        this.map.addOverlay(marker);
        console.log(marker)


        // console.log(marker)
        marker.addEventListener("click", () => {

          //点击弹出信息窗口
          var indo =
            `<p style="font-size:14px;padding-bottom:10px;font-weight:700;border-bottom: 1px solid #ece5e5;">${this.pointer[i].name}</p><p style="margin:5px 0"><span style="display: inline-block;width:70px;  text-align: right;color: #707070;font-size:14px;padding: 4px;line-hight:20px;margin-right:5px">行政区域:</span><span style="font-size:14px">犍为县</span></p><p style="margin:5px 0"><span style="display: inline-block;width:70px;text-align: right;color: #707070;font-size:14px;padding: 4px;line-hight:20px;margin-right:5px;">项目地址:</span><span style="font-size:14px;display:inline-block;width:240px;">四川省乐山市犍为县圣泉路466附近</span></p><p style="margin:5px 0"><span style="display: inline-block;width:70px;text-align: right;color: #707070;font-size:14px;padding: 4px;line-hight:20px;margin-right:5px">视频数量:</span><span style="font-size:14px">2</span></p><p style="margin:5px 0"><span style="display: inline-block;width:70px;text-align: right;color: #707070;font-size:14px;padding: 4px;line-hight:20px;margin-right:5px">扬尘数量:</span><span style="font-size:14px">10</span></p><p style="margin:5px 0"><span style="display: inline-block;width:70px;text-align: right;color: #707070;font-size:14px;padding: 4px;line-hight:20px;margin-right:5px">相关信息:</span><span style="font-size:12px;background-color: #f0f9eb;border-color: #e1f3d8;color: #67c23a;display:inline-block;padding:5px">在建</span></p>`
          var infoWindow = new BMap.InfoWindow(indo); // 创建信息窗口对象

          this.map.openInfoWindow(infoWindow, new BMap.Point(this.pointer[i].Longitude, this.pointer[i]
          .latitude)); // 打开信息窗口
        });
      }
    },
    // 子传父
    ModifyPass(index) {
      this.$emit('toIndex', index)
    }
  },
  mounted() {
    this.DrawMap()   //地图
  }
}
