<template>
  <div id="bg">
    <b-container fluid class="bv-example-row">
      <b-row>
        <b-col col lg="2">
          <img src="../assets/Logo_myway.png" alt="img1" />
        </b-col>
        <b-col>
          <h2><b>麥威科技股份有限公司</b></h2>
        </b-col>
        <b-col lg="3" style="text-color: Gray">
          <h2 align="center" style="color: grey"><b>報價單</b></h2>
          <h5 align="center" style="color: grey"><b>Quotation</b></h5>
          <div style="border-top: 2px double #000000"></div>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" offset-md="2">
          <p>桃園市中壢區明德路60五樓I室</p>
          <p>電&emsp;&emsp;話：0918988747</p>
          <p>統一編號：82782328</p>
        </b-col>
        <b-col>
          <p>&emsp;</p>
          <p>&emsp;</p>
          <p>Email：mywaytech@getmywaytech.com</p>
        </b-col>
      </b-row>
      <div class="bg-dark"><hr size="7" /></div>
      <b-row>
        <b-col md="4">
          <p>客戶姓名：&emsp;&emsp;{{ Customer.Customer_Name }}</p>
          <p>公司名稱：&emsp;&emsp;{{ Customer.Company_Name }}</p>
          <p>公司電話：&emsp;&emsp;{{ Customer.Company_Phone }}</p>
          <p>公司傳真：&emsp;&emsp;{{ Customer.Company_Fax }}</p>
        </b-col>
        <b-col md="6">
          <p align="right"><b>日期&emsp;&emsp;</b></p>
          <p align="right"><b>報價單編號&emsp;&emsp;</b></p>
          <p align="right"><b>客戶統一編號&emsp;&emsp;</b></p>
          <p align="right"><i>報價有效期至&emsp;&emsp;</i></p>
        </b-col>
        <b-col md="2">
          <p>{{ today_Date }}</p>
          <p>{{ text }}</p>
          <p>{{ Customer.Company_ID }}</p>
          <p>{{ last_Date }}</p>
        </b-col>
      </b-row>
      <div class="bg-dark"><hr size="7" /></div>
      <p>
        <b>特別注意事項：</b>1.本報價單經雙方協議成交，經客戶簽章視為正式訂單。
      </p>
      <div class="flieds">
        <b-row>
          <b-col id="border1">
            <p align="center"><b>品名編號</b></p>
          </b-col>
          <b-col id="border1" md="4">
            <p align="center"><b>產品規格</b></p>
          </b-col>
          <b-col id="border1">
            <p align="center"><b>數量</b></p>
          </b-col>
          <b-col id="border1">
            <p align="center"><b>單價</b></p>
          </b-col>
          <b-col id="border1" md="2">
            <p align="center"><b>特價(未稅)</b></p>
          </b-col>
          <b-col style="border-style: solid" md="2">
            <p align="center"><b>小計</b></p>
          </b-col>
        </b-row>
      </div>
      <div class="products">
        <!--eslint-disable-next-line-->
        <div class="product" v-for="(item, index) in Products">
          <b-row>
            <b-col id="border2">
              <p align="center">{{ index + 1 }}</p>
            </b-col>
            <b-col id="border2" md="4">
              <p>{{ item.product_Name }}</p>
              <p
                v-html="item.product_Detail.replace(/(\r\n|\n|\r)/gm, ' <br/>')"
              >
                {{ item.product_Detail }}
              </p>
            </b-col>
            <b-col id="border2">
              <p align="center">{{ item.amount }}</p>
            </b-col>
            <b-col id="border2">
              <span style="float: left">NT$</span>
              <span style="float: right">{{ item.price }}</span>
            </b-col>
            <b-col id="border2" md="2">
              <span style="float: left">NT$</span>
              <span style="float: right">{{ item.discount }}</span>
            </b-col>
            <b-col id="border3" md="2">
              <span style="float: left">NT$</span>
              <span style="float: right">{{ item.subtotal }}</span>
            </b-col>
          </b-row>
        </div>
      </div>
      <div>
        <b-row>
          <b-col md="6">
            <p>
              <b
                >備註：<br />
                1. {{ Remark1 }}<br />
                2. {{ Remark2 }}<br />
                3. {{ Remark3 }}<br />
                4. {{ Remark4 }}<br />
                5. {{ Remark5 }}<br />
                6. {{ Remark6 }}<br />
                7. {{ Remark7 }}</b
              >
            </p>
          </b-col>
          <b-col>
            <b-row>
              <b-col></b-col>
              <b-col id="border2" md="4">
                <p align="right">小計</p>
              </b-col>
              <b-col id="border3" md="4">
                <span style="float: left">NT$</span>
                <span style="float: right">{{ Stotal }}</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col></b-col>
              <b-col id="border2" md="4">
                <p align="right">稅額</p>
              </b-col>
              <b-col id="border3" md="4">
                <span style="float: left">NT$</span>
                <span style="float: right">{{ Rtotal }}</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col></b-col>
              <b-col id="border2" md="4">
                <p align="right"><b>總計</b></p>
              </b-col>
              <b-col id="border3" md="4">
                <span style="float: left">NT$</span>
                <span style="float: right">{{ Quotation.total }}</span>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>

      <br />

      <b-row>
        <b-col md="4">
          <p align="center" style="border-style: solid">
            <b>客戶同意採購簽章：</b>
          </p>
          <br /><br />
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <div class="bg-dark"><hr size="3" /></div>
          <br />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div style="border-top: 3px double #000000"></div>
          <p align="center">
            如您有任何疑問，請即聯絡：{{name}}，{{phone}}，{{email}}
          </p>
          <p align="center"><b>祝事業興旺！</b></p>
        </b-col>
      </b-row>
    </b-container>
    <!-- <img v-bind="mainProps" src="../assets/Form_example_myway.png" alt="example" > -->
  </div>
</template>

<script>
export default {
  name: "Review",
  data() {
    return {
      user_id: "",
      name:'',
      phone:'',
      email:'',
      Customer: {
        Customer_Name: "",
        Company_Name: "",
        Company_Phone: "",
        Company_Fax: "",
        Company_ID: "",
      },
      text: "報價單編號",
      Product: {
        product_ID: "",
        product_Name: "",
        product_Detail: "",
        amount: "",
        price: "",
        discount: "",
        subtotal: "",
      },

      Products: [],

      Quotation: {
        total: "",
      },
      Remark1: "",
      Remark2: "",
      Remark3: "",
      Remark4: "",
      Remark5: "",
      Remark6: "",
      Remark7: "",

      Stotal: "",
      Rtotal: "",
      i: "",

      today_Date: "",
      last_Date: "",
      items: [],
    };
  },
  methods:{
    getpersonal(){
      const that=this
      this.$api.GetPersonal()
      .then(function(response){
        that.name=response.data.data.name
        that.phone=response.data.data.phone
        that.email=response.data.data.email
        console.log(response)
      })
      .catch(function(error){
        console.log(error)
      })
    }
  },
  mounted() {
    this.getpersonal()
    var data1 = JSON.parse(localStorage.getItem("viewlocaldata"));
    if (data1 != null) {
      this.items = data1;
      const that = this;
      this.$api
        .GetViewData(this.items.id)
        .then(function (response) {
          console.log(response);
          that.Customer.Customer_Name =
            response.data.data.customer.customer_Name;
          that.Customer.Company_Name = response.data.data.customer.company_Name;
          that.Customer.Company_Phone =
            response.data.data.customer.company_Phone;
          that.Customer.Company_Fax = response.data.data.customer.company_Fax;
          that.Customer.Company_ID = response.data.data.customer.customer_ID;
          that.Products = response.data.data.products;
          that.Stotal = response.data.data.quotation.total;
          that.Quotation.total = response.data.data.quotation.total_withTax;
          that.Rtotal = response.data.data.quotation.tax;
          that.today_Date = response.data.data.quotation.date;
          that.last_Date = response.data.data.quotation.quotation_Deadline;
          that.Remark1 = response.data.data.quotation.remark[0];
          that.Remark2 = response.data.data.quotation.remark[1];
          that.Remark3 = response.data.data.quotation.remark[2];
          that.Remark4 = response.data.data.quotation.remark[3];
          that.Remark5 = response.data.data.quotation.remark[4];
          that.Remark6 = response.data.data.quotation.remark[5];
          that.Remark7 = response.data.data.quotation.remark[6];
          that.text = that.items.id;
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      this.user_id = window.sessionStorage.getItem("user_id");
      // console.log(this.user_id);
      this.Customer.Customer_Name =
        window.sessionStorage.getItem("Customer_Name");
      this.Customer.Company_Name =
        window.sessionStorage.getItem("Company_Name");
      this.Customer.Company_Phone =
        window.sessionStorage.getItem("Company_Phone");
      this.Customer.Company_Fax = window.sessionStorage.getItem("Company_Fax");
      this.Customer.Company_ID = window.sessionStorage.getItem("Company_ID");
      // console.log(this.Customer);
      this.Remark1 = window.sessionStorage.getItem("Remark1");
      this.Remark2 = window.sessionStorage.getItem("Remark2");
      this.Remark3 = window.sessionStorage.getItem("Remark3");
      this.Remark4 = window.sessionStorage.getItem("Remark4");
      this.Remark5 = window.sessionStorage.getItem("Remark5");
      this.Remark6 = window.sessionStorage.getItem("Remark6");
      this.Remark7 = window.sessionStorage.getItem("Remark7");

      this.Quotation.total = window.sessionStorage.getItem("total");

      this.Stotal = window.sessionStorage.getItem("Stotal");
      this.Rtotal = window.sessionStorage.getItem("Rtotal");
      this.i = window.sessionStorage.getItem("i");
      for (var j = 0; j < parseInt(this.i); j++) {
        this.Product.product_ID = j + 1;
        this.Product.product_Name = window.sessionStorage.getItem(
          "Product_Name" + j
        );
        this.Product.product_Detail = window.sessionStorage.getItem(
          "Product_Detail" + j
        );
        this.Product.amount = window.sessionStorage.getItem("Amount" + j);
        this.Product.price = window.sessionStorage.getItem("Price" + j);
        this.Product.discount = window.sessionStorage.getItem("Discount" + j);
        this.Product.subtotal = window.sessionStorage.getItem("Subtotal" + j);

        this.Products[j] = this.Product;
        this.Product = {};
      }
      var Today = new Date();
      var Last = new Date();
      Last = Last.setDate(Last.getDate() + 30);
      Last = new Date(Last);
      this.today_Date =
        Today.getFullYear() +
        "/" +
        (Today.getMonth() + 1) +
        "/" +
        Today.getDate();
      this.last_Date =
        Last.getFullYear() + "/" + (Last.getMonth() + 1) + "/" + Last.getDate();
    }
  },
};
</script>




<style scoped lang="scss">
#bg {
  margin: 5%;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  // border-radius: 30px;
  // width: 1000px;
  // height: 1250px;
  padding: 5%;
}
hr {
  background-color: black !important;
  color: black !important;
}
#border1 {
  border-top: solid;
  border-left: solid;
  border-bottom: solid;
}
#border2 {
  border-left: solid;
  border-bottom: solid;
}
#border3 {
  border-right: solid;
  border-left: solid;
  border-bottom: solid;
}
</style>
