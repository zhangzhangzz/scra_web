<template>
    <div>
        <div id="div1">
            <p>这是初始化的内容</p>
        </div>
        <el-button type="primary" @click="onsubmit" >提交</el-button>
    </div>
</template>
<script>
import E from "wangeditor";
export default {
    data() {
        return {
            texttxt: "",
            editor:''
        };
    },
    mounted: function () {
        const editor = new E("#div1");
        editor.config.menus = [
            'head',  // 标题   
            'bold',  // 粗体  
            'fontSize',  // 字号 
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'image',  // 插入图片
            'table',  // 表格
            'undo',  // 撤销
            'redo'  // 重复 
        ];
        
        editor.config.showLinkImg = false;
        editor.config.uploadImgMaxSize = 3 * 1024 * 1024;
        editor.config.uploadImgHooks = {
            before: function(xhr) {
                console.log(xhr)

                // 可阻止图片上传
                return {
                    prevent: true,
                    msg: '需要提示给用户的错误信息'
                }
            },
            fail: (xhr, editor, result) => {
                // 插入图片失败回调
                console.log(result);
            },
            success: (xhr, editor, result) => {
                // 图片上传成功回调
                console.log(result);
            },
            timeout: (xhr, editor) => {
                // 网络超时的回调
                console.log('网络超时');
            },
            error: (xhr, editor) => {
                // 图片上传错误的回调
                console.log('上传错误');
            },
            //回显
            customInsert: (insertImg, result, editor) => {
                console.log(result);
                let id = result.data.fileId;
                let a = result.data.fileName.split('.')[1];
                let str = id + '/' + a;
                let url =
                '图片下载地址？fileId=' +
                str;
                insertImg(url);
            },
        }
        // editor.config.customUploadImg = function (files, insert) {
        //      // files 是 input 中选中的文件列表
        //      // insert 是获取图片 url 后，插入到编辑器的方法
        //      files.forEach((item) => {
        //         let fd = new FormData();
        //         fd.append('file', item); // 上传的文件： 键名，键值
        //         // 以下是上传图片的接口，视情况而更改就可以啦                                                     
        //         teachService.FileUploadInTencent(fd).then((data) => {
        //         // 上传代码返回结果之后，将图片插入到编辑器中       
        //         insert(data.url)
        //         })
        //      })
        // };
        editor.config.onchange = (newHtml) => {
        this.editorData = newHtml;
        };
        //创建   --创建之后可以重新初始化内容:editor.txt.html('初始化')
        editor.create();
    
        this.texttxt = editor;
    },
    methods:{
        onsubmit(){
            let result = this.texttxt.txt.html();   
            console.log(result)
            this.axios.post('http://yun.leoli.wang:20028/test/upload', {content:result },
            ).then((res) => {
                console.log(res)
            
            });
        }
    }
}
</script>
<style lang="sss" scoped>

</style>