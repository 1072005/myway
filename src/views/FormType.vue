<template>
  <div id="bg">
    <b-container fluid class="bv-example-row">
      <p class="h2 mb-4">選擇新表單範本</p>

      <b-form-group>
        <b-row>
          <b-col>
            <img
              v-bind="mainProps"
              src="../assets/Form_example_myway.png"
              alt="img1"
            />
            <b-form-radio v-model="selected" name="some-radios" value="A"
              >麥威科技</b-form-radio
            >
          </b-col>
          <b-col>
            <b-img v-bind="mainProps" blank-color="#777" alt="img2" d></b-img>
            <b-form-radio
              v-model="selected"
              name="some-radios"
              value="B"
              disabled
              >範本一</b-form-radio
            >
          </b-col>

          <b-col>
            <b-img v-bind="mainProps" blank-color="#777" alt="img3"></b-img>
            <b-form-radio
              v-model="selected"
              name="some-radios"
              value="C"
              disabled
              >範本二</b-form-radio
            >
          </b-col>
        </b-row>
      </b-form-group>

      <br />

      <b-row>
        <b-col lg="2">
          <b-button variant="primary" id="save-download" @click="goTo()"
            >繼續</b-button
          >
        </b-col>
        <b-col>
          <b-button
            variant="outline-primary"
            id="console"
            @click="$router.push('Mainpage')"
            >取消</b-button
          >
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "FormTypePage",
  data() {
    return {
      mainProps: { blank: true, width: 145, height: 205.07, class: "m1" },
      selected: "", //選擇的範本
    };
  },

  methods: {
    goTo() {
      localStorage.removeItem("editformID");
      // let selected_data= {
      //   selected: this.selected
      // };
      if (this.selected != "") {
        // this.$router.resolve({path:'/Form',query:{selected_data}});
        this.$router.push("/Form");
      } else if (this.selected == "") alert("請選擇表單範本！");
    },
  },
};
</script>


<style scoped lang="scss">
#bg {
  margin: 5%;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  padding: 5%;
}
</style>
