<!--
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-12-21 09:38:55
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-12-21 10:38:31
-->
<template>
  <div class="">
    <span>测试edit</span>
    <Edit
      v-model="form.content"
      class="editor"
      @change="editorChange"
      style="overflow-y: auto; height: calc(100vh - 300px)"
    ></Edit>
  </div>
</template>

<script>
import Edit from "../components/Editor01.vue";
export default {
  name: "",
  components: {
    Edit,
  },
  data() {
    return {
      form: {
        id: "",
        content: "",
      },
    };
  },
  methods: {
    //富文本编辑
    editorChange(e) {
      // if(e)
      this.form.content = e;
      console.log(this.form.content);
    },
  },
};
</script>

<style lang="" scoped>
/* .editor {
  overflow-y: auto;
  height: calc(100vh - 300px);
} */
</style>