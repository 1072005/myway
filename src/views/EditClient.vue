<template>
  <div id="bg">
    <b-container fluid class="bv-example-row">
      <p class="h2 mb-4">編輯客戶資料</p>

      <b-form-group>
        <b-row>
          <b-col>
            <label for="input-total">公司名稱</label>
            <b-form-input
              v-model="Company_Name"
              list="total"
              id="campany"
            ></b-form-input>
          </b-col>
          <b-col>
            <label for="input-client-company-fax">客戶公司傳真</label>
            <b-form-input
              v-model="Company_Fax"
              list="client-company-fax"
              id="input-client-company-fax"
            ></b-form-input>
          </b-col>
          <b-col>
            <label for="input-client-company-number">客戶公司統一編號</label>
            <b-form-input
              v-model="Customer_ID"
              list="client-company-number"
              id="input-client-company-number"
            ></b-form-input>
          </b-col>
        </b-row>

        <br />
        <br />
        <br />
        <b-row>
          <b-col>
           <label for="input-project-name">選擇客戶名稱</label>
            <div>
              <b-form-select
                v-model="Customer_Select"
                :options="Customer_Edit"
                size="lg"
                style="width: 100%; height: 40px"
              ></b-form-select>
            </div>
          </b-col>
          <b-col>
            <label for="input-total">客戶名稱修改</label>
            <b-form-input
              v-model="Customer_Name"
              list="total"
              id="input-total"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-form-group>

      <br />
      <br />
      <br />
      <br />

      <b-row>
        <b-col>
          <label for="input-client-company-phone">公司電話</label>
          <b-form-input
            v-model="Company_Phone"
            list="client-company-phone"
            id="input-client-company-phone"
          ></b-form-input>
        </b-col>
        <b-col lg="2" offset-md="1">
          <b-button
            variant="primary"
            id="save-download"
            @click="customerfinish()"
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
  name: "EditClientPage",
  data() {
    return {
      items: [],
      Customer_ID: "",
      Customer_Name: "",
      Company_Name: "",
      Company_Phone: "",
      Company_Fax: "",
      Customer_Edit:[],
      Customer_Select:1,
    };
  },

  methods: {
    customerfinish() {
      const that = this;
      console.log(this.items);
      let Customer = {
        customer_ID: this.Customer_ID,
        customer_Name: this.Customer_Name,
        company_Name: this.Company_Name,
        company_Phone: this.Company_Phone,
        company_Fax: this.Company_Fax,
      };

      this.$api
        .PutCustomerEdit(this.items.CustomerID, Customer)
        .then(function () {
          alert("修改成功");
          that.$router.push({ path: "customerprofile" });
          window.localStorage.removeItem("customerdata");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ path: "customerprofile" });
      window.localStorage.removeItem("customerdata");
    },
  },
  mounted() {
    var data1 = JSON.parse(localStorage.getItem("customerdata"));
    this.items = data1;

    const that = this;
    this.$api
      .GetCustomerEdit(this.items.CustomerID)
      .then(function (response) {
        that.Customer_ID = response.data.data.customer_ID;
        that.Customer_Name = response.data.data.customer_Name;
        that.Company_Name = response.data.data.company_Name;
        that.Company_Phone = response.data.data.company_Phone;
        that.Company_Fax = response.data.data.company_Fax;
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
  margin-left: 20%;
  margin-right: 20%;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  padding: 5%;
  height: 650px;
}
#bg .btn {
  width: 130%;
  height: 50px;
  margin-top: 10px;
}
#console {
  margin-left: 25%;
  width: 50% !important;
}
</style>
