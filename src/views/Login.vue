<template>
  <el-form
    ref="loginForm"
    label-width="70px"
    :inline="true"
    class="login-container"
    :model="loginForm"
    :rules="rules"
  >
    <!-- 上边指定了rules验证规则 -->
    <h3 class="login_title">系统登录</h3>
    <!-- 为el-form-item项指定一个prop属性，对应一个验证规则-->
    <el-form-item label="用户名" prop="username">
      <!-- 进行数据的双向绑定   :model是属性绑定，指向一个数据对象  v-model绑定form对应的属性对象中-->
      <el-input
        v-model="loginForm.username"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="loginForm.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit" class="box" type="primary">登录</el-button>
      <el-button @click="reg()" class="box" type="primary">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import Mock from "mockjs";
// import Cookie from "js-cookie";

export default {
  data() {
    //行为区，绑定的对象
    return {
      //登录表单的数据绑定对象
      loginForm: {
        //两个字段
        username: "",
        password: "",
      },
      //rules验证规则对象，数组中的每个对象都是一个验证，true代表必填，不填会显示message
      //一些其他规则：min:     max:   message："长度在min到max的字符之间"
      rules: {
        username: [
          {
            required: true,
            trigger: "blur", //失去焦点的时候会提醒
            message: "请输入用户名",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码",
          },
        ],
      },
    };
  },
  methods: {
    //登录
    submit() {
      // this.$refs.form.validate((valid) => {
      //   console.log(valid);
      //   if (!valid) return;
      //   tihs.$http.post("login", this.form);
      // });
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$http
            .post("http://127.0.0.1:7001/login", this.loginForm)
            .then((res) => {
              console.log(res.data);

              if (res.data.code == 200) {
                //  this.$router.push("/home");
                sessionStorage.setItem("username", this.loginForm.username);
                this.$router.push("/home");
                this.$message({
                  type: "success",
                  message: "登录成功!",
                });
              } else {
                alert("登录失败");
              }
            });
        }
      });
    },
    reg() {
      this.$router.push("/Register");
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  height: 350px;
  border: 1px solid white;
  margin: 180px auto;
  padding: 35px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .login_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-input {
    width: 198px;
  }
}
.box {
  margin-top: 10px;
  margin-left: 50px;
}
</style>