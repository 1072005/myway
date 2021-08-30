<template>
<div>
  <form>
    <p class="h2 text-center mb-4">報價單系統</p>
    <div class="grey-text">
      <p>帳號</p>
      <mdb-input
        icon="envelope"
        placeholder="請輸入帳號"
        type="email"
        v-model="Account"
        @keyup.native="btKeyUp"
      />
      <p>密碼</p>
      <mdb-input
        icon="lock"
        placeholder="請輸入密碼"
        :type="typ"
        v-model="Password"
        @keyup.native="btKeyUp"
      />
      <font-awesome-icon
        class="eyeicon"
        :icon="['far', 'eye']"
        style="color: black"
        @click="iconclick"
        @mouseleave="iconleave"
      />
      <p class="message" v-show="isShow">帳號或密碼錯誤</p>
      <div class="text-center inbtn">
        <b-button variant="primary" class="col-12" @click="postdata"
          >登入</b-button
        >
      </div>
      <p class="register">第一次使用?</p>
      <b-link href="/register">立即註冊</b-link>
    </div>
  </form>
  <div>
    <img 
      src="../assets/WM-1.png"
      alt="MyWayLogo"
      style="width:10%; position:absolute; left:10px; top:0px">
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
      Account: "",
      Password: "",
    };
  },
  methods: {
    iconclick() {
      this.typ = "text";
    },
    iconleave() {
      this.typ = "password";
    },
    btKeyUp(e) {
      e.target.value = e.target.value.replace(
        /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
        ""
      );
    },
    postdata() {
      let parms = {
        Account: this.Account,
        Password: this.Password,
      };
      const that = this;
      this.$api
        .UserLogin(parms)
        .then(function (response) {
          if (response.data.status_Code == 2000) {
            that.$store.commit("set_token", response.data.token);
            that.$store.commit("set_Userinfo", response.data.user_ID);

            that.$router.push({ path: "Mainpage" });
          } else {
            that.isShow = "false";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.grey-text {
  width: 20%;
  height: 450px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
    border:solid 3px white;
  border-radius: 3px;
  box-shadow:5px 5px 5px 5px gray;
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
  padding-top: 15px;
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
  left: 90%;
  top: -32px;
}
.eyeicon:hover {
  cursor: pointer;
}
.message {
  padding-top: 0px !important;
  color: red;
  font-size: 1.2rem !important;
  font-weight: bold;
  margin-bottom: 0;
}
</style>
