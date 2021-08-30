<template>
  <div id="bg">
    <form>
      <p class="h2 text-center mb-4">報價單系統</p>
      <div class="grey-text">
        <b-row>
          <b-col>
            <p>帳號</p>
            <b-form-input
              icon="envelope"
              placeholder="請輸入帳號"
              v-model="Account"
              @keyup.native="btKeyUp"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
          </b-col>
          <b-col>
            <p>姓名</p>
            <b-form-input
              icon="lock"
              placeholder="請輸入姓名"
              type="text"
              v-model="Name"
              @keyup.native="btKeyUp"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p>密碼</p>
            <b-form-input
              icon="lock"
              placeholder="請輸入密碼"
              :type="typ"
              v-model="Password"
              @keyup.native="btKeyUp"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
            <font-awesome-icon
              class="eyeicon"
              :icon="['far', 'eye']"
              style="color: black"
              @click="iconclick"
              @mouseleave="iconleave"
            />
          </b-col>
          <b-col>
            <p>電話</p>
            <mdb-input
              icon="lock"
              placeholder="請輸入電話號碼"
              type="number"
              v-model="Phone"
              @keyup.native="btKeyUp"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p>公司統一編號</p>
            <mdb-input
              icon="lock"
              placeholder="請輸入公司統一編號"
              type="number"
              v-model="company_id"
              @keyup.native="btKeyUp"
            />
          </b-col>
          <b-col>
            <p>信箱</p>
            <b-form-input
              icon="lock"
              placeholder="請輸入電子信箱"
              v-model="Email"
              @keyup.native="btKeyUp2"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
          </b-col>
        </b-row>
        <br />
        <div class="radio">
          <b-form-checkbox
            id="checkbox-1"
            v-model="status"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
          >
            我已閱讀並同意
            <a href="https://google.com/" target="_blank">條款</a>
            <div class="message" v-show="isShow">{{ message }}</div>
          </b-form-checkbox>
        </div>

        <b-row>
          <b-col>
            <div class="inbtn">
              <b-button variant="primary" class="col-12" @click="postdata"
                >註冊</b-button
              >
            </div>
          </b-col>
          <b-col md="8">
            <p class="register">已經有帳號?</p>
            <b-link href="/">登入</b-link>
          </b-col>
        </b-row>
      </div>
    </form>
    <div>
      <img
        src="../assets/WM-1.png"
        alt="MyWayLogo"
        style="width: 10%; position: absolute; left: 10px; top: 0px"
      />
    </div>
  </div>
</template>

<script>
import { mdbInput } from "mdbvue";
export default {
  name: "Basic",
  components: {
    mdbInput,
  },
  data: function () {
    return {
      typ: "password",
      isShow: "",
      inShow: "",
      Account: "",
      Password: "",
      company_id: "",
      Name: "",
      Phone: "",
      Email: "",
      message: "",
      status: "not_accepted",
    };
  },
  methods: {
    iconclick() {
      this.typ = "text";
    },
    iconleave() {
      this.typ = "password";
    },
    // @keyup="this.value=this.value.replace(/\s+/g,'')"
    btKeyUp(e) {
      e.target.value = e.target.value.replace(
        /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、\s]/g,''
      );
    },
    btKeyUp2(e) {
      e.target.value = e.target.value.replace(
        /[`~!#$%^&*()\-+=<>?:"{}|,/;'\\[\]·~！#￥%&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,''
      );
    },

    postdata() {
      if (
        this.Account == "" ||
        this.Password == "" ||
        this.company_id == "" ||
        this.Name == "" ||
        this.Phone == "" ||
        this.Email == ""
      ) {
        alert("請填滿所有表格");
      } else {
        let parms = {
          Account: this.Account,
          Password: this.Password,
          company_id: this.company_id,
          Name: this.Name,
          Phone: this.Phone,
          Email: this.Email,
        };

        const that = this;
        if (this.status == "not_accepted") {
          alert("請閱讀完條款後勾選以閱讀並同意");
        } else if (parms.company_id.length != 8) {
          that.isShow = "false";
          that.message = "請輸入完整的公司統一編號，共八位數";
        } else {
          this.$api
            .UserSignup(parms)
            .then(function (response) {
              console.log(response);
              if (response.data.status_Code == 2000) {
                alert("註冊成功");
                that.$router.push({ path: "/" });
              } else {
                that.isShow = "false";
                that.message = response.data.message;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.grey-text {
  width: 50%;
  height: 540px;
  margin: 1% auto;
  padding: 20px;
  border: solid 3px white;
  border-radius: 3px;
  box-shadow: 5px 5px 5px 5px gray;
  background-color: white;
}
.grey-text p {
  padding-top: 30px;
  font-size: 1.3rem;
}
form {
  padding-top: 5%;
}
.inbtn {
  padding-top: 10%;
}
.register {
  display: inline-block;
  font-size: 1rem !important;
}
.register_1 {
  font-size: 1rem !important;
  display: inline-block;
  color: blue;
}
.eyeicon {
  position: relative;
  left: 92%;
  top: -30px;
}
.eyeicon:hover {
  cursor: pointer;
}
.message {
  padding-top: 0px !important;
  color: red;
  font-size: 1.2rem !important;
  display: inline-block;
  font-weight: bold;
  margin-left: 25px;
}
.radio {
  font-size: 1rem;
}
</style>

