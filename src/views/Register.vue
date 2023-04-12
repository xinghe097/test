<template>
  <el-form
    label-width="70px"
    :inline="true"
    class="register-container"
    :model="regForm"
    ref="regForm"
    :rules="rules"
  >
    <!-- 上边指定了rules验证规则 -->
    <h3 class="register_title">用户注册</h3>
    <!-- 为el-form-item项指定一个prop属性，对应一个验证规则-->
    <el-form-item class="form-item" label="用户名" prop="username">
      <!-- 进行数据的双向绑定   :model是属性绑定，指向一个数据对象  v-model绑定form对应的属性对象中-->
      <el-input v-model="regForm.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="regForm.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPassword">
      <el-input
        type="password"
        v-model="regForm.checkPassword"
        placeholder="请再次输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit('regForm')" class="box" type="primary"
        >注册</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var nameRule = (rule, value, callback) => {
      let name = /(^[a-zA-Z0-9]{4,10}$)/;
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else if (!name.test(value)) {
        callback(new Error("请输入4-10位用户名"));
      } else {
        callback();
      }
    };
    var passRule = (rule, value, callback) => {
      let pass = /(^[a-zA-Z0-9]{4,10}$)/;
      if (value == "") {
        callback(new Error("请输入密码"));
      } else if (!pass.test(value)) {
        callback(new Error("请输入4-10位密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //行为区，绑定的对象
    return {
      //登录表单的数据绑定对象
      regForm: {
        username: "", //用户名
        password: "", //密码
        checkPassword: "", //确认密码
      },
      //rules验证规则对象，数组中的每个对象都是一个验证，true代表必填，不填会显示message
      //一些其他规则：min:     max:   message："长度在min到max的字符之间"
      rules: {
        
        username: [{ validator: nameRule, trigger: "blur" }],
        password: [{ validator: passRule, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          this.$http
            .post("http://127.0.0.1:7001/newuser", {
              username: this.regForm.username,
              password: this.regForm.password,
            })
            .then((res) => {
              console.log(res.data);
              console.log(this.regForm);
              if (res.data == 200) {
                this.$router.push("/");
                this.$message({
                  type: "success",
                  message: "注册成功!",
                });
              } else {
                alert("注册失败");
              }
            });
        }
      });
    },
    // else {
    //   console.log(this.form);
    //   alert("请按规则输入账号密码");
    //   console.error("请按规则输入账号密码");
    // }
    //console.log(valid);
    //     });
    //   },
    // },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  width: 360px;
  height: 400px;
  border: 1px solid white;
  margin: 160px auto;
  padding: 35px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .register_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .form-item {
    padding: 0%;
  }
  .el-input {
    width: 198px;
  }
}
.box {
  margin-top: 10px;
  margin-left: 80px;
}
</style>