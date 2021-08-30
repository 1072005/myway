<template>
  <div id="bg">
    <b-container fluid class="bv-example-row">
      <p class="h1 mb-4" style="font-weight: bold">追蹤資料修改</p>
      <b-row class="outname">
        <b-col cols="2">{{ items.id }}</b-col>
        <b-col cols="2">{{ items.project }}</b-col>
      </b-row>
      <b-form-group>
        <b-row class="editinner">
          <b-col class="edittrack">
            <label for="input-total">進行狀態</label>
            <b-form-select
              v-model="customerselected"
              :options="status"
            ></b-form-select>
          </b-col>
          <b-col class="edittrack">
            <label for="input-total">付款方式</label>
            <b-form-select
              v-model="paymodeselected"
              :options="paymode"
            ></b-form-select>
          </b-col>
          <b-col class="edittrack">
            <label for="input-total">付款狀態</label>
            <b-form-select
              v-model="companyselected"
              :options="pay"
            ></b-form-select>
          </b-col>
        </b-row>

        <br />

        <b-row>
          <b-col class="editremark">
            <label for="input-client-company-phone">備註</label>
            <b-form-textarea
              id="textarea-rows"
              placeholder="備註"
              v-model="remarktext"
              rows="8"
            ></b-form-textarea>
          </b-col>
        </b-row>
      </b-form-group>

      <br />
      <br />
      <br />
      <br />

      <b-row>
        <b-col lg="2">
          <b-button variant="primary" id="save-download" @click="posttrack()"
            >完成</b-button
          >
        </b-col>
        <b-col>
          <b-button
            variant="outline-primary"
            id="console"
            @click="cleartrackdata()"
            >取消</b-button
          >
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "EditClientPage",
  data() {
    return {
      customerselected: "1",
      paymodeselected: "1",
      companyselected: "1",
      formData: new FormData(),
      items: [],
      remarktext: "",
      status: [
        { value: "1", text: "待追蹤" },
        { value: "2", text: "進行中" },
        { value: "3", text: "完成" },
        { value: "4", text: "作廢" },
        { value: "5", text: "其他" },
      ],
      paymode: [
        { value: "1", text: "一次付清" },
        { value: "2", text: "月結" },
        { value: "3", text: "次月結" },
        { value: "4", text: "次次月結" },
        { value: "5", text: "Pay2Pay" },
        { value: "6", text: "二期" },
        { value: "7", text: "三期" },
        { value: "8", text: "四期" },
        { value: "9", text: "五期" },
      ],
      pay: [
        { value: "1", text: "尚未付款" },
        { value: "2", text: "待催帳-第一期" },
        { value: "3", text: "待催帳-第二期" },
        { value: "4", text: "待催帳-第三期" },
        { value: "5", text: "待催帳-第四期" },
        { value: "6", text: "待催帳-第五期" },
        { value: "7", text: "已付清" },
      ],
    };
  },

  methods: {
    posttrack() {
      const that = this;
      let payment = {
        Status: this.customerselected,
        Payment_Method: this.paymodeselected,
        Payment_Status: this.companyselected,
        Remark: this.remarktext,
      };
      this.$api
        .PutTrackEdit(this.items.id, payment)
        .then(function (response) {
          if (response.data.status_Code == 2000) {
            alert("修改成功");
            localStorage.removeItem("trackdata");
            that.$router.push({ path: "trackpage" });
          } 
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    cleartrackdata() {
      localStorage.removeItem("trackdata");
      this.$router.push("trackpage");
    },
  },
  mounted() {
    var data1 = JSON.parse(localStorage.getItem("trackdata"));
    this.items = data1;

    this.$api
      .GetTrackEdit(this.items.id)
      .then((response) => {
        console.log(response)
        this.customerselected=response.data.data.status
        this.paymodeselected=response.data.data.payment_Method
        this.companyselected=response.data.data.payment_Status
        this.remarktext = response.data.data.project_Remark;
      })
      .catch(function (error) {
        // 请求失败处理
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
.edittrack select {
  width: 100%;
  height: 50px;
  border: solid 1px black;
  border-radius: 5px;
  font-size: 1.3rem;
}
.outname {
  font-size: 1.5rem;
  font-weight: bold;
}
.editinner {
  margin-top: 20px;
}
.bill {
  display: inline-block;
  font-weight: bold;
  margin-right: 50px;
  font-size: 1.8rem;
}
.editremark {
  margin-top: 20px;
}
</style>
