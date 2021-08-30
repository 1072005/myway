<template>
  <div id="bg">
    <b-container fluid class="bv-example-row">
      <p class="h2 mb-4">編輯產品資料</p>
      <br />

      <b-form-group>
        <b-row>
          <b-col>
            <label for="input-total">產品規格</label>
            <b-form-input
              v-model="Product_Name"
              list="total"
              id="input-total"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col cols="4">
            <label for="input-total">單價</label>
            <b-form-input
              v-model="Price"
              list="total"
              id="price"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <label for="input-total">細項</label>
            <b-form-textarea
              id="textarea-rows"
              placeholder="細項"
              v-model="Product_Detail"
              rows="4"
            ></b-form-textarea>
          </b-col>
        </b-row>
      </b-form-group>

      <br /><br /><br />

      <b-row>
        <b-col lg="2">
          <b-button variant="primary" id="save-download" @click="goTo()"
            >完成</b-button
          >
        </b-col>
        <b-col>
          <b-button variant="outline-primary" id="console" @click="cancel()"
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
      selected: "",
      Product_Name: "",
      Price: "",
      Product_Detail: "",
      items: [],
    };
  },

  methods: {
    state() {
      return Boolean(0);
    },
    goTo() {
      const that=this
      let Products = {
        Product_Name: this.Product_Name,
        Product_Detail: this.Product_Detail,
        Price: parseInt(this.Price),
      };

      console.log(Products);
      this.$api.PutProduceEdit(this.items.Product_ID,Products)
        .then(function () {
          alert("修改成功");
          that.$router.push({ path: "reviseproduce" });
          window.localStorage.removeItem("producedata");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ path: "reviseproduce" });
      window.localStorage.removeItem("producedata");
    },
  },
  mounted() {
    var data1 = JSON.parse(localStorage.getItem("producedata"));
    this.items = data1;
    const that = this;
    this.$api.GetProduceEdit(this.items.Product_ID)
      .then(function (response) {
        console.log(response)
        that.Product_Name = response.data.data.product_Name;
        that.Price = response.data.data.price;
        that.Product_Detail = response.data.data.product_Detail;
      })
      .catch(function (error) {
        console.log(error);
      });
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
