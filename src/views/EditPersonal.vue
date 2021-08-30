<template>
  <b-container fluid class="bv-example-row">
    <Sidebar></Sidebar>
    <b-row>
      <b-col md="10" offset-md="2" class="rightside">
        <h1>個人資料修改</h1>
        <b-row style="margin: 3%">
          <b-col>
            <label for="input-name">姓名</label>
            <b-form-input
              v-model="Name"
              id="input-name"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
          </b-col>
          <b-col>
            <label for="input-phone">電話</label>
            <b-form-input
              v-model="Phone"
              id="input-phone"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row style="margin: 3%">
          <b-col>
            <label for="input-total">信箱</label>
            <b-form-input
              v-model="Email"
              id="input-email"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
          </b-col>
          <b-col style="margin: 1.5%">
            <b-button
              variant="primary"
              size="lg"
              @click="postPersonal()"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
              >儲存</b-button
            >
          </b-col>
        </b-row>
        <hr />
        <br />
        <h1>專案名稱修改</h1>
        <b-row style="margin: 3%">
          <b-col>
            <label for="input-project-name">選擇專案名稱</label>
            <div>
              <b-form-select
                v-model="project_Name"
                :options="nameoptions"
                size="lg"
                style="width: 100%; height: 40px"
              ></b-form-select>
            </div>
          </b-col>
          <b-col>
            <label for="input-editname">修改</label>
            <b-form-input
              v-model="editName"
              id="input-editname"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></b-form-input>
          </b-col>
          <b-col lg="2">
            <b-button
              variant="outline-danger"
              id="delete_project"
              @click="deleteprojectName()"
              >刪除此專案名稱</b-button
            >
          </b-col>
        </b-row>
        <b-row>
          <b-col md="2" style="margin-left: 50px">
            <b-button
              variant="primary"
              size="lg"
              style="margin: 5%"
              @click="postProjectName()"
              >儲存</b-button
            >
            <!-- </b-col>
          <b-col md="2"> -->
            <b-button
              variant="outline-primary"
              size="lg"
              @click="$router.push({ path: 'Mainpage' })"
              >回首頁</b-button
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
      file: null,
      items: [],
      Name: "",
      Phone: "",
      Email: "",
      project_Name: "",
      nameoptions: [],
      editName: "",
    };
  },
  methods: {
    getPersonal() {
      const that = this;
      this.$api
        .GetPersonal()
        .then(function (response) {
          that.Name = response.data.data.name;
          that.Email = response.data.data.email;
          that.Phone = response.data.data.phone;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    postPersonal() {
      // const that = this;
      let parm = {
        name: this.Name,
        email: this.Email,
        phone: this.Phone,
      };
      if (this.Name == "" || this.Email == "" || this.Phone == "") {
        alert("請輸入要修改的內容");
      } else {
        this.$api
          .PutPersonal(parm)
          .then(function (response) {
            if (response.data.status_Code == 2000) {
              alert("修改成功");
              window.location.reload();
            } else {
              alert("修改失敗");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    getProjectName() {
      const that = this;
      this.$api
        .GetPrjects()
        .then(function (response) {
          that.nameoptions = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    postProjectName() {
      const that = this;
      if (that.editName == "") {
        alert("請輸入要修改的字");
      } else {
        let parm = {
          Project_Name: that.editName,
        };
        this.$api
          .PutPrjects(that.project_Name, parm)
          .then(function (response) {
            if (response.data.status_Code == 2000) {
              alert("修改成功");
              window.location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    clearlocaldata() {
      localStorage.removeItem("localdata");
      this.$router.push("Mainpage");
    },
    deleteprojectName() {
      const that = this;
      this.$api
        .DeleteProjectName(that.project_Name)
        .then(function (response) {
          if (response.data.status_Code == 2000) {
            alert("刪除成功");
            window.location.reload();
          } else {
            alert("刪除失敗");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getPersonal();
    this.getProjectName();
  },
};
</script>

<style scoped lang="scss">
.rightside {
  height: 100vh;
}
.data {
  display: inline-block;
  margin-top: 10%;
  margin-left: 5%;
}
.company {
  display: inline-block;
}
.project {
  display: inline-block;
}
.selet {
  margin-top: 10%;
  margin-left: 5%;
}
.backbtn {
  margin-left: 5%;
  color: black;
}
#delete_project {
  margin-top: 18px;
  height: 50px;
}
</style>
