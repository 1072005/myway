<template>
  <div id="bg">
    <b-container fluid class="bv-example-row">
      <p class="h2 text-center mb-4" v-text="title">{{ title }}</p>
      <b-form id="main" autocomplete="off">
        <b-row>
          <b-col>
            <label for="input-project-name">專案名稱</label>
            <b-form-input
              v-model="Quotation.Project_Name"
              :state="State.Project_name"
              list="project-name"
              id="input-project-name"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
            <datalist id="project-name">
              <!--eslint-disable-next-line-->
              <option v-for="item in Projects">
                {{ item.text }}
              </option>
            </datalist>
          </b-col>
        </b-row>
        <br />
        <b-row>
         <b-col md="6">
            <label for="input-client-company">客戶公司</label>
            <b-form-input
              v-model="Company.Company_Name"
              list="client-company"
              id="input-client-company"
              @change="searchCompanys()"
              :readonly="readonly.Company_Name"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
            <datalist id="client-company">
              <!--eslint-disable-next-line-->
              <option v-for="(item, index) in Companys">
                {{ item.company_Name }}
              </option>
            </datalist>
          </b-col>
          <b-col>
            <label for="input-client-company-fax">客戶公司傳真</label>
            <b-form-input
              v-model="Company.Company_Fax"
              list="client-company-fax"
              id="input-client-company-fax"
              @keyup.native="btKeyUp2"
              :readonly="readonly.Company_Fax"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
          </b-col>
          <b-col>
            <label for="input-client-Customer-ID">客戶公司統一編號</label>
            <b-form-input
              v-model="Company.Company_ID"
              :type="'number'"
              :state="Company_ID_State"
              list="client-Customer-ID"
              id="input-client-Customer-ID"
              aria-describedby="input-live-feedback"
              @keyup.native="btKeyUp"
              :readonly="readonly.Company_ID"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback"
              >請輸入完整之統一編號，共八位數</b-form-invalid-feedback
            >
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <label for="input-client-name">客戶姓名</label>
            <b-form-input
              v-model="Company.Customer.Customer_Name"
              list="client-name"
              id="input_client_name"
              @update="searchCustomers()"
              :readonly="readonly.Customer_Name"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
            <datalist id="client-name">
              <!--eslint-disable-next-line-->
              <option v-for="item in Customers">
                {{ item.customer_Name }}
              </option>
            </datalist>
          </b-col>
           <b-col>
            <label for="input-client-company-phone">客戶電話</label>
            <b-form-input
              v-model="Company.Customer.Customer_Phone" 
              list="client-company-phone"
              id="input-client-company-phone"
              @keyup.native="btKeyUp2"
              :readonly="readonly.Customer_Phone"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <label for="input-product-format">產品規格</label>
            <b-form-input
              v-model="Product.Product_Name"
              list="product-format"
              id="input-product-format"
              @update="searchProduct()"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
            <datalist id="product-format">
              <!--eslint-disable-next-line-->
              <option v-for="item in allProducts">
                {{ item.product_Name }}
              </option>
            </datalist>
          </b-col>
          <b-col>
            <label for="input-product-detail">細項</label>
            <b-form-textarea
              v-model="Product.Product_Detail"
              id="textarea-auto-height"
              ysize="sm"
              rows="1"
              max-rows="1"
              wrap="hard"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label for="input-product-amount">數量</label>
            <b-form-input
              v-model="Product.Amount"
              :type="'number'"
              min="1"
              list="product-amount"
              id="input-product-amount"
              @change="changeSubtotal()"
            ></b-form-input>
          </b-col>
          <b-col>
            <label for="input-product-price">單價</label>
            <b-form-input 
              v-model="Product.Price"
              :type="'number'"
              :readonly="readonly.Product_Price"
              min="0"
              list="product-price"
              id="input-product-price"
              @change="changePrice(), changeSubtotal()"
            ></b-form-input>
          </b-col>
          <b-col>
            <label for="input-product-discount-price">特價</label>
            <b-form-input
              v-model="Product.Discount"
              :type="'number'"
              min="0"
              list="product-discount-price"
              id="input-product-discount-price"
              @change="changeSubtotal()"
            ></b-form-input>
          </b-col>
          <b-col>
            <label for="input-product-subtotal">小計</label>
            <b-form-input
              v-model="Product.Subtotal"
              :type="'number'"
              min="0"
              list="product-subtotal"
              id="input-product-subtotal"
            ></b-form-input>
          </b-col>
          <b-col>
            <b-button variant="outline-primary" id="plus" @click="plusitem()"
              >增加</b-button
            >
          </b-col>
        </b-row>

        <br />
        <div>
          <b-row>
            <b-table
              data-escape="true"
              :items="items"
              :fields="fields"
              :bordered="bordered"
              align="center"
              ref="table"
            >
              <template v-slot:cell(Product_Detail)="row">
                <p
                  size="sm"
                  style="overflow-wrap: nomal"
                  v-html="
                    row.item.Product_Detail.replace(/(\r\n|\n|\r)/gm, ' <br/>')
                  "
                >
                  {{ row.item.Product_Detail }}
                </p>
              </template>
              <template v-slot:cell(delete)="row">
                <b-button
                  size="sm"
                  @click="deleterowitem(row.item)"
                  class="mr-2"
                >
                  刪除
                </b-button>
              </template>
            </b-table>
          </b-row>
        </div>
        <br />

        <b-row>
          <b-col>
            <label for="input-subtotal">總計</label>
            <b-form-input
              v-model="Stotal"
              :type="'number'"
              min="0"
              id="input-subtotal"
            ></b-form-input>
          </b-col>
          <b-col>
            <label for="input-tax-rate">稅額</label>
            <b-form-input
              v-model="Rtotal"
              :type="'number'"
              min="0"
              id="input-tax-rate"
            ></b-form-input>
          </b-col>
          <b-col>
            <label for="input-total">總額(含稅)</label>
            <b-form-input
              v-model="Quotation.total"
              :type="'number'"
              min="0"
              id="input-total"
            ></b-form-input>
          </b-col>
        </b-row>

        <br />

        <b-row>
          <b-col>
            <label for="input-remark">備註</label>
            <b-form-input
              v-model="Remark1"
              :state="Remark1_state"
              id="input-remark-1"
              required
              placeholder="硬體及系統保固一年。(天災 , 人為破壞因素損壞不在保固範圍內)"
              @change="Remark()"
            ></b-form-input>
            <br />
            <b-form-input
              v-model="Remark2"
              :state="Remark2_state"
              id="input-remark-2"
              required
              placeholder="如有其他增加項目則另外報價。"
              @change="Remark()"
            ></b-form-input>
            <br />
            <b-form-input
              v-model="Remark3"
              :state="Remark3_state"
              id="input-remark-3"
              required
              placeholder="出貨地(FOB) : 台灣。"
              @change="Remark()"
            ></b-form-input>
            <br />
            <b-form-input
              v-model="Remark4"
              :state="Remark4_state"
              id="input-remark-4"
              required
              placeholder="款項未付清前 , 產品所有權屬於麥威科技所有。"
              @change="Remark()"
            ></b-form-input>
            <br />
            <b-form-input
              v-model="Remark5"
              :state="Remark5_state"
              id="input-remark-5"
              required
              placeholder="下單後訂單不可取消。"
              @change="Remark()"
            ></b-form-input>
            <br />
            <b-row>
              <b-col>
                <span style="margin-right:3%">付款交期：</span>
                <b-form-input
                  v-model="Paytime"
                  required
                  placeholder="請輸入付款交期"
                  @change="setPay()"
                ></b-form-input>
              </b-col>
              <b-col>
                <label for="input-total" style="margin-right:3%">付款方式：</label>
                <b-form-select
                  v-model="Payment.Payment_Method"
                  :options="paymode"
                  style="width:100%; height:63%;"
                  @change="setPay()"
                ></b-form-select>
              </b-col>
              <b-col md="6">
                <label for="input-total" style="margin-right:3%"> </label>
              <b-form-input
                v-model="Remark6"
                v-text="Remark6"
                :state="Remark6_state"
                id="input-remark-6"
                required
                placeholder="交期與付款條件:下單後一週，一次付清。"
                @change="Remark()"
              ></b-form-input>
            </b-col>
            </b-row>
            <!-- <br /> -->
            
            <br />
            <b-form-input
              v-model="Remark7"
              :state="Remark7_state"
              id="input-remark-7"
              required
              placeholder="15天內完成維修。"
              @change="Remark()"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-form>

      <br />
      <b-row>
        <b-col>
          <b-button variant="outline-primary" id="review" @click="goTo_review()"
            >Review</b-button
          >
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col lg="2">
          <b-button variant="primary" id="save-download-new" @click="postform()" v-show="newShow"
            >儲存並下載</b-button
          >
          <b-button variant="primary" id="save-download-edit" @click="putform()" v-show="editShow"
            >儲存並下載</b-button
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
import download from "downloadjs";
export default {
  data() {
    return {
      id: null,
      title: "填寫新表單",
      newShow: true,
      editShow: false,
      fields: [
        { key: "Product_Name", label: "產品規格" },
        { key: "Product_Detail", label: "產品細項" },
        { key: "Amount", label: "數量" },
        { key: "Price", label: "單價" },
        { key: "Discount", label: "特價" },
        { key: "Subtotal", label: "小計" },
        { key: "delete", lable: "刪除" },
      ],
      items: [],
      bordered: true,

      user_id: 1,
      token: "SMoQMA3y9mXkJ2qr8Loc",

      //所有的公司客戶資料
      Projects: [],

      //所有的公司客戶資料
      Companys: [], 
      //搜尋的公司的客戶資料
      Customers:[],

      //要傳出去的公司客戶資料
      Company: {
        Company_ID: "",
        Company_Name: "",
        Company_Fax: "",
        Customer:[{
          Customer_Name: "",
          Customer_Phone: ""
        }]
      },

      //所有的產品資料
      allProducts: [],
      //input放置的資料
      Product: {
        Product_ID: 0,
        Product_Name: "",
        Product_Detail: "",
        Amount: 1,
        Price: 0,
        Discount: 0,
        Subtotal: 0,
      },
      //要傳出去的所有產品資料
      Products: [],

      Quotation: {
        Project_Name: "",
        Project_Owner: "account",
        Remark: "", //Remark1~7
        total: 0,
      },
      paymode: [
        { value: "一次付清", text: "一次付清" },
        { value: "月結", text: "月結" },
        { value: "次月結", text: "次月結" },
        { value: "次次月結", text: "次次月結" },
        { value: "Pay2Pay", text: "Pay2Pay" },
        { value: "二期", text: "二期" },
        { value: "三期", text: "三期" },
        { value: "四期", text: "四期" },
        { value: "五期", text: "五期" },
      ],
      Payment:{
          Payment_Method: "一次付清",
      },
      Paytime: "下單後一週",

      Stotal: 0,
      Rtotal: 0,

      Remark1: "硬體及系統保固一年。(天災 , 人為破壞因素損壞不在保固範圍內)",
      Remark2: "如有其他增加項目則另外報價。",
      Remark3: "出貨地(FOB) : 台灣。",
      Remark4: "款項未付清前 , 產品所有權屬於麥威科技所有。",
      Remark5: "下單後訂單不可取消。",
      Remark6: "",
      Remark7: "15天內完成維修。",

      State: {
        Project_name: null,
        Customer_Name: null,
      },
      readonly: {
        Company_ID: false,
        Company_Name: false,
        Company_Fax: false,
        Customer_Name: false,
        Customer_Phone: false,
        Product_Price: false,
      },
    };
  },

  mounted() {
      this.setPay();
      this.getProjects();
      this.getCustomers();
      this.getallProducts();
      this.Remark();
      this.getForm();
  },

  computed: {
    Company_ID_State() {
      if (this.Company.Company_ID.length == 0) return null;
      else return this.Company.Company_ID.length == 8 ? null : false;
    },

    Remark1_state() {
      return this.Remark1.length == 0 ? false : null;
    },
    Remark2_state() {
      return this.Remark2.length == 0 ? false : null;
    },
    Remark3_state() {
      return this.Remark3.length == 0 ? false : null;
    },
    Remark4_state() {
      return this.Remark4.length == 0 ? false : null;
    },
    Remark5_state() {
      return this.Remark5.length == 0 ? false : null;
    },
    Remark6_state() {
      return this.Remark6.length == 0 ? false : null;
    },
    Remark7_state() {
      return this.Remark7.length == 0 ? false : null;
    },
  },

  methods: {
    getProjects(){
      const that = this;
      this.$api
        .GetPrjects()
        .then(function (response) {
          that.Projects = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    setPay(){
      this.Remark6 = "交期與付款條件:" + this.Paytime + " , " + this.Payment.Payment_Method + "。";
    },
    getForm() {
      const that = this;
      var data1 = JSON.parse(localStorage.getItem("localID"));
      var data2 = window.localStorage.getItem("editformID");
      if(data2 == null){
        // if(data1 != null){
          that.id = data1.id;
          that.editShow = false;
          that.newShow = true;
          // this.loadForm();
        // }
      }
      if (data2 != null) {
        that.title = "編輯表單";
        that.id = data2;
        that.Paytime = "";
        that.editShow = true;
        that.newShow = false;
        // this.loadForm();
      }
      this.loadForm();
    },
    loadForm(){
      const that = this;
      this.$api
        .GetFormID(that.id)
        .then(function (response) {
          console.log(response);

          that.Company.Customer.Customer_Name =
            response.data.data.customer.customer_Name;
          that.Company.Company_Name =
            response.data.data.customer.company_Name;
          that.Company.Customer.Customer_Phone =
            response.data.data.customer.company_Phone;
          that.Company.Company_Fax = response.data.data.customer.company_Fax;
          that.Company.Company_ID = response.data.data.customer.customer_ID;

          for (var i = 0; i < response.data.data.products.length; i++) {
            that.Product.Product_ID =
              response.data.data.products[i].product_ID;
            that.Product.Product_Name =
              response.data.data.products[i].product_Name;
            that.Product.Product_Detail =
              response.data.data.products[i].product_Detail;
            that.Product.Price = response.data.data.products[i].price;
            that.Product.Discount = response.data.data.products[i].discount;
            that.Product.Subtotal = response.data.data.products[i].subtotal;

            that.Products[i] = that.Product;
            that.plusitem();
          }
          
          that.Payment.Payment_Method = 
            response.data.data.payment.payment_Method;

          that.Quotation.Project_Name =
            response.data.data.quotation.project_Name;

          that.Remark1 = response.data.data.quotation.remark[0];
          that.Remark2 = response.data.data.quotation.remark[1];
          that.Remark3 = response.data.data.quotation.remark[2];
          that.Remark4 = response.data.data.quotation.remark[3];
          that.Remark5 = response.data.data.quotation.remark[4];
          that.Remark6 = response.data.data.quotation.remark[5];
          that.Remark7 = response.data.data.quotation.remark[6];
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    btKeyUp(e) {
      e.target.value = e.target.value.replace(
        /[`~!@#$%^&*()_\\+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
        ""
      );
    },
    btKeyUp2(e) {
      e.target.value = e.target.value.replace(
        /[`~!@#$%^&*()_\\+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——+={}|《》？：“”【】、；‘’，。、]/g,
        ""
      );
    },

    getCustomers() {
      const that = this;
      this.$api
        .Getcustomer()
        .then(function (response) {
          that.Companys = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    searchCompanys() {
      const that = this;
      let search = that.Company.Company_Name;
      this.$api
        .GetCustomerEdit(search)
        .then(function (response) {
          that.Companys=[];
          for(var i=0;i < response.data.data.length; i++){
            that.Companys[i] = response.data.data[i];
          }
          that.putCompany();
        })
        .catch(function (error) {
          console.log(error);
        });
      
    },
    putCompany(){
      const that = this;
      let search = that.Company.Company_Name;
      for(var i=0;i < that.Companys.length; i++){
        if(search == that.Companys[i].company_Name){
          that.Company.Company_Fax = that.Companys[i].company_Fax;
          that.Company.Company_ID = that.Companys[i].company_ID;
          that.Customers = that.Companys[i].customer;
          that.readonly.Company_ID = true;
          that.readonly.Company_Fax = true;
        }
        else{
          that.readonly.Company_ID = false;
          that.readonly.Company_Fax = false;
        }
      }
    },
    searchCustomers() {
      const that = this;
      let search = that.Company.Customer.Customer_Name;
      for(var i=0;i < that.Customers.length; i++){
        if(search == that.Customers[i].customer_Name){
          that.Company.Customer.Customer_Phone = that.Customers[i].customer_Phone;
          that.readonly.Customer_Phone = true;
        }
        else{
          that.readonly.Customer_Phone = false;
        }
      }
    },    

    getallProducts() {
      const that = this;
      this.$api
        .Getproduce()
        .then(function (response) {
          that.allProducts = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    searchProduct() {
      const that = this;
      let search = that.Product.Product_Name;
      this.$api
        .Searchproduce(search)
        .then(function (response) {
          that.Products=[];
          for(var i=0;i<response.data.data.length; i++){
            that.Products[i] = response.data.data[i];
          }
          that.readonly.Product_Price = false;
          that.putProduct();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    putProduct(){
      const that = this;
      let search = that.Product.Product_Name;
      console.log(that.Products);
      for(var i=0;i < that.Products.length; i++){
        if(search == that.Products[i].product_Name){
          that.Product.Price = that.Products[i].price;
          that.Product.Product_Detail= that.Products[i].product_Detail;
          that.Product.Product_ID= that.Products[i].product_ID;
          that.readonly.Product_Price = true;
          
          that.changePrice();
          that.changeSubtotal();
          break;
        }
        else{
          that.readonly.Product_Price = false;
        }
      }
    },

    changePrice() {
      this.Product.Discount = this.Product.Price;
    },
    changeSubtotal() {
      this.Product.Subtotal = this.Product.Discount * this.Product.Amount;
    },

    plusitem() {
      let newitem = {
        Product_ID: this.Product.Product_ID,
        Product_Name: this.Product.Product_Name,
        Product_Detail: this.Product.Product_Detail,
        Amount: this.Product.Amount,
        Price: this.Product.Price,
        Discount: this.Product.Discount,
        Subtotal: this.Product.Subtotal,
      };
      let B = 0;
      if (
        newitem.Product_Name == "" ||
        newitem.Amount == "" ||
        newitem.Price == "" ||
        newitem.Discount == "" ||
        newitem.Subtotal == ""
      ) {
        alert("產品表格需填寫完整！");
      } else if (this.items.length > 0) {
        for (var i = 0; i < this.items.length; i++) {
          if (newitem.Product_Name == this.items[i].Product_Name) {
            alert("產品表格中已有相同產品規格，若要修改請刪除並重新填寫！");
            B = 1;
            break;
          }
        }
        if (B == 0) {
          this.items[this.items.length] = newitem;
          this.$refs.table.refresh();
          this.setstotal();
        }
        B = 0;
      } else if (this.items.length == 0) {
        this.items[this.items.length] = newitem;
        this.$refs.table.refresh();
        this.setstotal();
      }
    },

    deleterowitem(data) {
      for (var i = 0; i < this.items.length; i++) {
        if (data.Product_Name == this.items[i].Product_Name) {
          this.items.splice(i,1);
          console.log(this.items);
        }
      }
      this.$refs.table.refresh();
      this.setstotal();
    },

    setstotal() {
      let stotal = 0;
      if (this.items.length >= 0 ) {
        for (var i = 0; i < this.items.length; i++) {
          stotal += this.items[i].Subtotal;
        }
      }
      this.Stotal = stotal;
      this.Rtotal = (stotal * 0.05).toFixed(2);
      this.Quotation.total = parseInt(this.Stotal) + parseInt(this.Rtotal);
    },

    Remark() {
      this.Quotation.Remark =
        this.Remark1 +
        "\n" +
        this.Remark2 +
        "\n" +
        this.Remark3 +
        "\n" +
        this.Remark4 +
        "\n" +
        this.Remark5 +
        "\n" +
        this.Remark6 +
        "\n" +
        this.Remark7;
    },

    goTo_review() {
      let form_data = {
        Customer: {
          Customer_Name: this.Company.Customer.Customer_Name,
          Company_Name: this.Company.Company_Name,
          Company_Phone: this.Company.Customer.Customer_Phone,
          Company_Fax: this.Company.Company_Fax,
          Company_ID: this.Company.Company_ID,
        },
        Products: this.items,
        Quotation: {
          total: this.Quotation.total,
        },        

        Remark1: this.Remark1,
        Remark2: this.Remark2,
        Remark3: this.Remark3,
        Remark4: this.Remark4,
        Remark5: this.Remark5,
        Remark6: this.Remark6,
        Remark7: this.Remark7,

        Stotal: this.Stotal,
        Rtotal: this.Rtotal,
        i: this.items.length,
      };

      var route = this.$router.resolve({ path: "/review" });
      sessionStorage.setItem("user_id", form_data.user_id);
      sessionStorage.setItem("Customer_Name", form_data.Customer.Customer_Name);
      sessionStorage.setItem("Company_Name", form_data.Customer.Company_Name);
      sessionStorage.setItem("Company_Phone", form_data.Customer.Company_Phone);
      sessionStorage.setItem("Company_Fax", form_data.Customer.Company_Fax);
      sessionStorage.setItem("Company_ID", form_data.Customer.Company_ID);

      for (var j = 0; j < form_data.i; j++) {
        sessionStorage.setItem(
          "Product_Name" + j,
          form_data.Products[j].Product_Name
        );
        sessionStorage.setItem(
          "Product_Detail" + j,
          form_data.Products[j].Product_Detail
        );
        sessionStorage.setItem("Amount" + j, form_data.Products[j].Amount);
        sessionStorage.setItem("Price" + j, form_data.Products[j].Price);
        sessionStorage.setItem("Discount" + j, form_data.Products[j].Discount);
        sessionStorage.setItem("Subtotal" + j, form_data.Products[j].Subtotal);
      }

      sessionStorage.setItem("Remark1", form_data.Remark1);
      sessionStorage.setItem("Remark2", form_data.Remark2);
      sessionStorage.setItem("Remark3", form_data.Remark3);
      sessionStorage.setItem("Remark4", form_data.Remark4);
      sessionStorage.setItem("Remark5", form_data.Remark5);
      sessionStorage.setItem("Remark6", form_data.Remark6);
      sessionStorage.setItem("Remark7", form_data.Remark7);

      sessionStorage.setItem("total", form_data.Quotation.total);

      sessionStorage.setItem("Stotal", form_data.Stotal);
      sessionStorage.setItem("Rtotal", form_data.Rtotal);
      sessionStorage.setItem("i", form_data.i);

      window.open(route.href, "_blank");
    },

    postform() {
      const that = this;
      let form = {
        Customer: {
          Customer_Name: that.Company.Customer.Customer_Name,
          Company_Name: that.Company.Company_Name,
          Company_Phone: that.Company.Customer.Customer_Phone,
          Company_Fax: that.Company.Company_Fax,
          Customer_ID: that.Company.Company_ID,
        },
        Products: that.items,
        Quotation: {
          Project_Name: that.Quotation.Project_Name,
          Remark: that.Quotation.Remark,
          total: that.Quotation.total,
        },
        Payment:{
          Payment_Method: that.Payment.Payment_Method,
        }
      };

      if (
        form.Customer.Customer_Name == "" ||
        form.Customer.Company_Name == "" ||
        form.Customer.Customer_Phone == "" ||
        form.Customer.Company_Fax == "" ||
        form.Customer.Customer_ID == "" ||
        that.items.length == 0 ||
        form.Quotation.Project_Name == "" ||
        that.Remark1 == "" ||
        that.Remark2 == "" ||
        that.Remark3 == "" ||
        that.Remark4 == "" ||
        that.Remark5 == "" ||
        that.Remark6 == "" ||
        that.Remark7 == ""
      ) {
        alert("表單尚未填寫完整！");
      } else {
        this.$api
          .testPostForm(form)
          .then(function(response){
            console.log(response);
            console.log(form);
            if(response.status != 200){
              console.log(response);
              alert("表單格式錯誤");
            }
            else{
              that.$api
                .PostForm(form)
                .then(function (response) {
                  console.log(response);
                  const content = response.headers["content-type"];
                  download(response.data, that.Quotation.Project_Name, content);
                  that.$router.push({ path: "Mainpage" });
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          })
          .catch(function(error){
            console.log(error);
          });
      }
    },
    putform() {
      const that = this;
      let form = {
        Customer: {
          Customer_Name: that.Company.Customer.Customer_Name,
          Company_Name: that.Company.Company_Name,
          Company_Phone: that.Company.Customer.Customer_Phone,
          Company_Fax: that.Company.Company_Fax,
          Customer_ID: that.Company.Company_ID,
        },
        Products: that.items,
        Quotation: {
          Project_Name: that.Quotation.Project_Name,
          Remark: that.Quotation.Remark,
          total: that.Quotation.total,
        },
        Payment:{
          Payment_Method: that.Payment.Payment_Method,
        }
      };

      if (
        form.Customer.Customer_Name == "" ||
        form.Customer.Company_Name == "" ||
        form.Customer.Company_Phone == "" ||
        form.Customer.Company_Fax == "" ||
        form.Customer.Customer_ID == "" ||
        that.items.length == 0 ||
        form.Quotation.Project_Name == "" ||
        that.Remark1 == "" ||
        that.Remark2 == "" ||
        that.Remark3 == "" ||
        that.Remark4 == "" ||
        that.Remark5 == "" ||
        that.Remark6 == "" ||
        that.Remark7 == ""
      ) {
        alert("表單尚未填寫完整！");
      } else {
        this.$api
          .testPostForm(form)
          .then(function(response){
            if(response.status != 200){
              console.log(response);
              alert("表單格式錯誤");
            }
            else{
              that.$api
                .PutForm(that.id,form)
                .then(function (response) {
                  console.log(response);
                  const content = response.headers["content-type"];
                  download(response.data, that.id, content);
                  that.$router.push({ path: "Mainpage" });
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          })
          .catch(function(error){
            console.log(error);
          });
      }
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
#plus {
  margin: 23px;
}
</style>
