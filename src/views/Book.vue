<template>
  <div class="manage">
    <!-- 这是点击新增时候的对话框内容 -->
    <el-dialog
      title="输入图书信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 图书的表单信息 -->
      <el-form ref="book" :rules="rules" :model="book" label-width="80px">
        <el-form-item label="图书名" prop="bookname">
          <el-input
            placeholder="请输入图书名"
            v-model="book.bookname"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input placeholder="请输入作者名" v-model="book.author"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="publish">
          <el-input
            placeholder="请输入出版社"
            v-model="book.publish"
          ></el-input>
        </el-form-item>
        <el-form-item label="图书简介" prop="message">
          <el-input
            type="textarea"
            placeholder=""
            v-model="book.message"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitAdd(book)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 这是头部新增的按钮的设置 ，就两行其实-->
    <div class="manage-header">
      <el-button @click="submit('1')" type="primary"> + 新增 </el-button>

      <!-- form的搜索区域 这是右边的查询按钮 -->
      <el-form class="box" :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="bookform.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">查询</el-button>
          <!-- <el-button type="primary" @click="onReturn()">返回</el-button> -->
        </el-form-item>
      </el-form>

      <!-- 这是下边的表格以及页码 -->
    </div>
    <div class="common-table">
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="bookname" label="图书名"> </el-table-column>
        <el-table-column prop="author" label="作者"> </el-table-column>
        <el-table-column prop="publish" label="出版社"> </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="{ row }">
            <span v-if="row.state == '未借阅'" style="color: #039e2a">{{
              row.state
            }}</span>
            <span v-if="row.state == '已借阅'" style="color: #db3a36">{{
              row.state
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button size="mini" type="primary" @click="submit('2', row)"
              >编辑</el-button
            >
            <!-- <el-button size="mini" @click="handleBorrow(row)">借阅</el-button> -->
            <el-button type="danger" size="mini" @click="handleDelete(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <!-- <el-pagination layout=" prev, pager, next" :total="total"> -->
        <!-- @符表示绑定的事件 -->
        <!-- </el-pagination> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookform: {
        name: "",
      },
      dialogVisible: false,
      book: {
        bookname: "",
        author: "",
        publish: "",
        message: "",
        state: "",
      },
      rules: {
        bookname: [
          {
            required: true,
            message: "请输入图书名",
          },
        ],
        author: [
          {
            required: true,
            message: "请输入作者名",
          },
        ],
        publish: [
          {
            required: true,
            message: "请输入出版社名",
          },
        ],
      },
      tableData: [],
      // modalType: 0, //0表示新增弹窗,1表示编辑
      // total: 0, //当前总条数默认为0
      userForm: {},
      pagetable: {},
    };
  },
  methods: {
    // 提交用户表单
    submit(index, row) {
      console.log(row, "");
      if (index === "1") {
        this.status = true;
        // this.title = "增加书籍";
        this.book.bookname = "";
        this.book.author = "";
        this.book.publish = "";
        this.dialogVisible = true;
      } else if (index === "2") {
        this.status = false;
        this.book.id = row._id;
        // this.title = "修改书籍";
        this.book.bookname = row.bookname;
        this.book.author = row.author;
        this.book.publish = row.publish;
        this.book.state = row.state;
        this.dialogVisible = true;
      }
    },
    //弹窗关闭的时候
    handleClose() {
      // this.$refs.book.resetFields();
      this.dialogVisible = false;
    },
    //取消按钮
    cancel() {
      this.handleClose();
    },
    //获取数据，数据列表显示
    getData() {
      this.$http.get("http://127.0.0.1:7001/findall").then((res) => {
        console.log(res.data);
        console.log(res.data.length);
        // if (res.data.length != 0) {
        // this.total = res.data.length;
        this.tableData = res.data;

        // }
      });
    },
    //编辑按钮，实际编辑内容修改在handleAdd
    handleEdit() {
      this.modalType = 1;
      this.dialogVisible = true;
    },
    //删除按钮实现的事件
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .get("http://127.0.0.1:7001/delbook?id=" + row._id)
            .then((res) => {
              console.log(res.data);
              this.getData();
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

      console.log(row._id);
    },
    //新增按钮显示出来的表单框
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    //新增按钮的确定实现的事件
    submitAdd(book) {
      this.$refs.book.validate((valid) => {
        if (valid) {
          if (this.status === true) {
            this.$http
              .post("http://127.0.0.1:7001/createbook", book)
              .then((res) => {
                if (res.data == 1) {
                  this.getData();
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
            console.log(book, "123");
            this.$http
              .post("http://127.0.0.1:7001/bookupdata", book)
              .then((res) => {
                console.log(res.data);
                if (res.data == 200) {
                  this.getData();
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
        }
      });

      // this.modalType = 0;
      // this.dialogVisible = true;
      // // if (this.status === true) {

      // this.dialogFormVisible = false;
      // this.handleClose();
      // }
    },

    //借阅书籍
    handleBorrow(row) {
      console.log(row);
      let params = {
        id: row._id,
        //  username: this.username,
      };
      if (row.state == "已借阅") {
        alert("借书失败，该书已被借出");
        return;
      }
      console.log(params);
      this.$http
        .post("http://127.0.0.1:7001/borrowbook", params)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.getData();
            this.$message({
              type: "success",
              message: "借阅成功!",
            });
          } else {
            alert("借书失败");
          }
        });
    },

    // getList() {
    //   getUser({ params: { ...this.userForm, ...this.pageData } }).then(
    //     ({ data }) => {
    //       console.log(data);
    //       this.tableData = data.list;
    //       this.total = data.count || 0;
    //     }
    //   );
    // },
    //选择页码的回调函数
    // handlePage(val) {
    //   this.pageData.page = val;
    // },
    // handleSizeChange(val) {
    //   this.pageSize = val;
    // },
    // 列表查询
    onSubmit() {
      this.$http
        .get("http://127.0.0.1:7001/regexfind?bookname=" + this.bookform.name)
        .then((res) => {
          if (res.data.code == 200 || 400) {
            console.log(res.data);
            this.tableData = res.data.data;
          } else {
            this.getData();
          }
          // this.tableData.push(res.data.data);
        });

      // this.$http
      //   .get("http://127.0.0.1:7001/regexfind?author=" + this.book.author)
      //   .then((res) => {
      //     console.log(res.data);
      //     this.tableData = res.data.data;
      //     // this.tableData.push(res.data.data);
      //   });
    },
  },
  // computed: {
  //   tableData() {
  //     return this.tableData.slice(
  //       (this.currentPage - 1) * this.pageSize,
  //       this.currentPage * this.pageSize
  //     );
  //   },
  // },
  mounted() {
    //获取列表数据
    this.getData();
    // this.getParams();
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
  .box {
    padding-top: 20px;
  }
}
</style>
