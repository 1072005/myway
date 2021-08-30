<template>
  <b-container fluid class="bv-example-row">
    <Sidebar></Sidebar>
    <b-row>
      <b-col md="10" offset-md="2" class="rightside">
        <h1>修改客戶資料</h1>
        <b-form-group>
          <b-row>
            <b-col md="4" offset-md="1">
              <label for="input-total">公司名稱</label>
              <b-form-input
                v-model="Company_Name"
                list="campany"
                id="input-total"
                @input="postcompany(Company_Name)"
                onkeyup="this.value=this.value.replace(/\s+/g,'')"
              ></b-form-input>
              <datalist id="campany">
                <!--eslint-disable-next-line-->
                <option v-for="(item, index) in Customers">
                  {{ item.company_Name }}
                </option>
              </datalist>
            </b-col>
            <b-col>
              <label for="input-client-company-fax">客戶公司傳真</label>
              <b-form-input
                v-model="Company_Fax"
                list="client-company-fax"
                id="input-client-company-fax"
                onkeyup="this.value=this.value.replace(/\s+/g,'')"
              ></b-form-input>
            </b-col>
            <b-col>
              <label for="input-client-company-number">客戶公司統一編號</label>
              <b-form-input
                v-model="Customer_ID"
                list="client-company-number"
                id="input-client-company-number"
                :disabled="true"
              ></b-form-input>
            </b-col>
            <b-col lg="2">
              <b-button
                variant="outline-danger"
                id="delete_company"
                @click="deletecompanyName(Customer_ID)"
                >刪除此公司</b-button
              >
            </b-col>
          </b-row>
          <b-row>
            <b-col offset-md="10" lg="2" id="savecompany">
              <b-button
                variant="primary"
                id="save"
                @click="Companysave(Customer_ID)"
                >儲存</b-button
              >
            </b-col>
          </b-row>
          <hr style="margin-top: 100px" />
          <br />
          <br />
          <br />
          <b-row>
            <b-col offset-md="1">
              <label for="input-project-name">選擇客戶名稱</label>
              <div>
                <b-form-input
                  v-model="Customer_Name"
                  list="customer"
                  id="input-project-name"
                  @input="checkname(Customer_Name)"
                  onkeyup="this.value=this.value.replace(/\s+/g,'')"
                ></b-form-input>
              </div>
              <datalist id="customer">
                <!--eslint-disable-next-line-->
                <option v-for="(item, index) in CustomersName">
                  {{ item.customer_Name }}
                </option>
              </datalist>
            </b-col>
            <b-col>
              <label for="input-client-company-phone">公司電話</label>
              <b-form-input
                v-model="Company_Phone"
                list="client-company-phone"
                id="input-client-company-phone"
                onkeyup="this.value=this.value.replace(/\s+/g,'')"
              ></b-form-input>
            </b-col>
            <b-col lg="2">
              <b-button
                variant="outline-danger"
                id="delete_customer"
                @click="deletecustomers(CustomersID)"
                >刪除此客戶</b-button
              >
            </b-col>
          </b-row>
        </b-form-group>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <b-row>
          <b-col offset-md="7" lg="2">
            <b-button
              variant="primary"
              id="save"
              @click="customerfinish(Customer_ID)"
              >儲存</b-button
            >
          </b-col>
          <b-col>
            <b-button variant="outline-primary" id="console" @click="cancel()"
              >取消</b-button
            >
          </b-col>
        </b-row>
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
      items: [],
      Customer_ID: "",
      Customer_Name: "",
      Company_Name: "",
      Company_Phone: "",
      Company_Fax: "",
      Customers: [],
      CustomersName: [],
      Customer_Select: 1,
      CustomersID: "",
    };
  },

  methods: {
    customerfinish() {
      const that = this;
      let Customer = {
        Company_ID: this.Customer_ID,
        Customer_Name: this.Customer_Name,
        Customer_Phone: this.Company_Phone,
      };

      this.$api
        .PutCustomerEdit(that.CustomersID, Customer)
        .then(function (response) {
          if (response.data.status_Code == 2000) {
            alert("修改成功");
            window.location.reload();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ path: "Mainpage" });
      window.localStorage.removeItem("customerdata");
    },
    checkname(name) {
      if(name==""){
          this.Company_Phone="";
          this.CustomersID="";
      }
      else{
        for (var i = 0; i < this.CustomersName.length; i++) {
          if (this.CustomersName[i].customer_Name == name) {
            this.Company_Phone = this.CustomersName[i].customer_Phone;
            this.CustomersID = this.CustomersName[i].id;
          }
        }
      }
    },
    postcompany(name) {
      const that = this;
      if (name == "") {
        this.Customer_ID = "";
        this.Company_Fax = "";
      } else {
        this.$api
          .GetCustomerEdit(name)
          .then(function (response) {
            for (var i = 0; i < response.data.data.length; i++) {
              if (response.data.data[i].company_Name == name) {
                that.Company_Fax = response.data.data[i].company_Fax;
                that.Customer_ID = response.data.data[i].company_ID;
                that.CustomersName = response.data.data[i].customer;
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    deletecompanyName(ID) {
      let result = window.confirm("確定要刪除這個公司嗎");
      if (result == true) {
        this.$api
          .DeleteCompanyName(ID)
          .then(function (response) {
            if (response.data.status_Code == 2000) {
              alert("刪除成功");
              window.location.reload();
            } else {
              alert("刪除失敗");
              window.location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    deletecustomers(customerID) {
      let result = window.confirm("確定要刪除這個客戶嗎");
      if (result == true) {
        this.$api
          .DeleteCustomers(customerID)
          .then(function (response) {
            if (response.data.status_Code == 2000) {
              alert("刪除成功");
              window.location.reload();
            } else {
              alert("刪除失敗");
              window.location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    Companysave(ID) {
      let companydata = {
        Company_Name: this.Company_Name,
        Company_Fax: this.Company_Fax,
      };

      this.$api
        .PutCompanyEdit(ID, companydata)
        .then(function () {
          alert("修改成功");
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    var data1 = JSON.parse(localStorage.getItem("customerdata"));
    this.items = data1;
    const that = this;
    this.$api
      .GetCustomerEdit(this.Company_Name)
      .then(function (response) {
        that.Customers = response.data.data;
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style scoped lang="scss">
#console {
  margin-left: 25%;
}
.rightside {
  height: 100vh;
}
#delete_company {
  width: 50%;
  height: 50px;
  margin-top: 15px;
}
#delete_customer {
  margin-top: 15px;
  width: 50%;
  height: 50px;
}
#save {
  width: 70%;
  height: 50px;
}
#console {
  width: 45%;
  height: 50px;
}
#savecompany {
  width: 12%;
}
</style>
