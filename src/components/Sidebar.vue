<template>
  <b-container fluid>
    <b-col class="sidebar">
      <b-col md-3><h1>報價單系統</h1></b-col>
      <b-col md-3
        ><p>{{ account_id }}</p></b-col
      >
      <b-col md-3
        ><b-button
          class="topbtn"
          @click="$router.push('formtype').catch(() => {})"
        >
          <font-awesome-icon
            class="sideicon"
            :icon="['fas', 'file']"
            size="1x"
          />建立新表單</b-button
        ></b-col
      >
      <b-col md-3
        ><b-button @click="$router.push('Mainpage').catch(() => {})">
          <font-awesome-icon
            class="sideicon"
            :icon="['fas', 'file-alt']"
            size="1x"
          />建立過的表單</b-button
        ></b-col
      >
      <b-col md-3>
        <b-button @click="$router.push('customerprofile').catch(() => {})"
          ><font-awesome-icon
            class="sideicon"
            :icon="['fas', 'pen']"
            size="1x"
          />修改客戶頁面</b-button
        ></b-col
      >
      <b-col md-3>
        <b-button @click="$router.push('reviseproduce').catch(() => {})"
          ><font-awesome-icon
            class="sideicon"
            :icon="['fas', 'pen']"
            size="1x"
          />修改產品頁面</b-button
        ></b-col
      >      
      <b-col md-3>
        <b-button @click="$router.push('editpersonal').catch(() => {})"
          ><font-awesome-icon
            class="sideicon"
            :icon="['fas', 'pen']"
            size="1x"
          />個人,專案修改</b-button
        ></b-col
      >
      <b-col md-3
        ><b-button @click="$router.push('trackpage').catch(() => {})"
          ><font-awesome-icon
            class="sideicon"
            :icon="['fas', 'signal']"
            size="1x"
          />追蹤頁面</b-button
        ></b-col
      >
      <b-col md-3
        ><b-button @click="logout()"
          ><font-awesome-icon
            class="sideicon"
            :icon="['fas', 'sign-out-alt']"
            size="1x"
          />登出</b-button
        ></b-col
      >
    </b-col>
  </b-container>
</template>

<script>
export default {
  name: "sidebar",
  data: function () {
    return {
      account_id: "",
    };
  },
  methods: {
    newpage() {
      this.$router.push({ path: "/newpage" });
    },
    logout() {
      this.$store.commit("del_token");
      this.$router.push({ path: "/" });
    },
  },
  mounted() {
    const that = this;
    this.$api
      .Getuser()
      .then(function (response) {
        that.account_id = response.data.data.name;
      })
      .catch(function (error) {
        // 请求失败处理
        console.log(error);
      });
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  position: absolute;
  top: 50px;
  left: 50px;
}
.sidebar p {
  margin-top: 15px;
  font-size: 1.5rem;
  font-weight: bold;
}
.sidebar h1 {
  font-weight: bold;
}
.sidebar .btn {
  margin-left: -15px;
  width: 110%;
  margin-top: 30px;
  color: black;
  font-size: 1.7rem;
  font-weight: bold;
  text-align: left;
}
.topbtn {
  margin-top: 5px !important;
}
.btn-secondary {
  background-color: #cee6f1;
  border-color: #cee6f1;
}
.sideicon {
  margin-right: 5px;
}
</style>
