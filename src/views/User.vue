<template>
  <div class="manage">
    <el-dialog
      title="输入用户信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 用户的表单信息 -->
      <el-form ref="user" :rules="rules" :model="user" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="user.username"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="user.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="user.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input
            placeholder="请输入电话"
            v-model="user.telephone"
          ></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="userAddorEdit(user)">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="submit('1')" type="primary"> + 新增 </el-button>
      <!-- form的搜索区域 -->
      <el-form :inline="true" :model="user">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <!-- <el-table-column prop="name" label="姓名"> </el-table-column> -->
        <!-- <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="sex" label="性别"> -->
        <!-- <template slot-scope="scope"> -->
        <!-- <span style="margin-left: 10px"
              >{{ scope.row.sex == 1 ? "男" : "女" }}
            </span> -->
        <!-- </template> -->
        <!-- </el-table-column> -->
        <!-- <el-table-column prop="telephone" label="电话"> </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button size="mini" @click="submit('2', row)">编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        >
          <!-- @符表示绑定的事件 -->
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      user: {
        username: "",
        // name: "",
        // age: "",
        // sex: "",
        // telephone: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
          },
        ],
        // name: [
        //   {
        //     required: true,
        //     message: "请输入用姓名",
        //   },
        // ],
        // age: [
        //   {
        //     required: true,
        //     message: "请输入年龄",
        //   },
        // ],
        // sex: [
        //   {
        //     required: true,
        //     message: "请选择性别",
        //   },
        // ],
        // telephone: [
        //   {
        //     required: true,
        //     message: "请输入电话",
        //   },
        // ],
      },
      tableData: [],
      modalType: 0, //0表示新增弹窗,1表示编辑
      total: 0, //当前总条数默认为0
      pageData: {},
      // user: {},
    };
  },
  methods: {
    //提交用户表单
    submit(index, row) {
      console.log(row, "");
      if (index === "1") {
        this.status = true;
        // this.title = "新增用户";
        this.user.username = "";

        this.dialogVisible = true;
      } else if (index === "2") {
        this.status = false;
        this.user.id = row._id;
        // this.title = "编辑用户";
        this.user.username = row.username;

        // this.user.state = user.state;
        this.dialogVisible = true;
      }
    },
    //弹窗关闭的时候
    handleClose() {
      this.$refs.user.resetFields();
      this.dialogVisible = false;
    },

    //取消
    cancel() {
      this.handleClose();
    },

    //编辑按钮
    handleEdit() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    // getData() {
    //   this.$http.get("http://127.0.0.1:7001//findalluser").then((res) => {
    //     console.log(res.data);
    //     console.log(res.data.length);
    //     // if (res.data.length != 0) {
    //     // this.total = res.data.length;
    //     this.tableData = res.data;
    //     // }
    //   });
    // },
    // handleDelete(row) {
    //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       delUser({ username: row.username }).then(() => {
    //         this.$message({
    //           type: "success",
    //           message: "删除成功",
    //         });
    //         this.getList();
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
    //

    //新增按钮
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    userAddorEdit() {
      if (this.status === true) {
        this.$http
          .post("http://127.0.0.1:7001/newuser", {
            username: this.user.username,
            // password: this.user.password,
          })
          .then((res) => {
            if (res.data == 1) {
              // this.getData();
              this.$message({
                type: "success",
                message: "添加成功!",
              });
            } else {
              alert("添加失败");
            }
          });
        this.dialogVisible = false;
      } else {
        this.$http
          .post("http://127.0.0.1:7001//userupdata", user)
          .then((res) => {
            console.log(res.data);
            if (res.data == 200) {
              // this.getData();
              this.$message({
                type: "success",
                message: "修改成功!",
              });
            } else {
              alert("修改失败");
            }
          });
        this.dialogVisible = false;
      }
    },
    //选择页码的回调函数
    handlePage(val) {
      this.pageData.page = val;
      this.getList();
    },
    //列表查询
    onSubmit() {},
  },
  mounted() {
    //获取列表数据
    // this.getData();
  },
};
</script>
<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    position: relative;
    height: calc(100% - 62px);
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>
