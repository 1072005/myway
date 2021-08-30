<template>
  <b-container fluid class="bv-example-row">
    <Sidebar></Sidebar>
    <b-row>
      <b-col md="10" offset-md="2" class="rightside">
        <b-col md-3 class="data"> {{ items.id }}</b-col>
        <b-col offset-md="2" md-4 class="company"> {{ items.company }}</b-col>
        <b-col offset-md="3" md-3 class="project"> {{ items.project }}</b-col>
        <b-col class="selet">
          <b-form-file
            v-model="file"
            class="mt-3"
            plain
            @change="fileChange"
          ></b-form-file>
        </b-col>
        <b-col class="selet">
          <b-button variant="primary" class="gobtn" size="lg" @click="postdata"
            >上傳</b-button
          >
          <b-button
            variant="outline-info"
            class="backbtn"
            size="lg"
            @click="clearlocaldata()"
            >回首頁</b-button
          >
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script >
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "profile",
  components: {
    Sidebar,
  },
  data() {
    return {
      file: null,
      items: [],
      formData: new FormData(),
    };
  },
  methods: {
    fileChange(e) {
      this.formData.append("file", e.target.files[0]); //放進上傳的檔案
    },
    postdata() {
      const that = this;
      this.$api
        .UploadPDF(that.items.id, that.formData)
        .then(function (response) {
          console.log(response);
          if (response.data.status_Code == 2000) {
            alert(that.file.name + "上傳成功");
            that.$router.push({ path: "Mainpage" });
            localStorage.removeItem("localdata");
          } else {
            alert(response.data.message);
            //  window.location.reload();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    clearlocaldata() {
      localStorage.removeItem("localdata");
      this.$router.push("Mainpage");
    },
  },
  mounted() {
    var data1 = JSON.parse(localStorage.getItem("localdata"));
    this.items = data1;
  },
};
</script>

<style scoped lang="scss">
.data {
  display: inline-block;
  margin-top: 10%;
  margin-left: 5%;
}
.company {
  display: inline-block;
}
.project {
  display: inline-block;
}
.selet {
  margin-top: 10%;
  margin-left: 5%;
}
.gobtn {
}
.backbtn {
  margin-left: 5%;
  color: black;
}
</style>
