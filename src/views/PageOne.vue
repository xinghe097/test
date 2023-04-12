<template>
  <div class="manage">
    <!-- 这是头部新增的按钮的设置 ，就两行其实-->
    <div class="manage-header">
      <!-- form的搜索区域 这是右边的查询按钮 -->
      <!-- <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">查询</el-button>
        </el-form-item>
      </el-form> -->

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
            <el-button size="mini" type="primary" @click="handleBorrow(row)"
              >借阅</el-button
            >
            <el-button size="mini" type="primary" @click="handleReturn(row)"
              >还书</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <!-- <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        > -->
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
      dialogVisible: false,
      book: {
        bookname: "",
        author: "",
        publish: "",
        message: "",
        state: "",
      },

      // 还有一个写名称问题，到时候在一点一点改吧，害
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
      modalType: 0, //0表示新增弹窗,1表示编辑
      total: 0, //当前总条数默认为0
      pageData: {},
      userForm: {},
    };
  },
  methods: {
    // 提交用户表单

    //弹窗关闭的时候
    handleClose() {
      this.$refs.book.resetFields();
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

    //借阅书籍
    handleBorrow(row) {
      console.log(row);
      let params = {
        id: row._id,
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
    handleReturn(row) {
      let params = {
        id: row._id,
      };
      if (row.state == "未借阅") {
        alert("还书失败，该书未被借阅");
        return;
      }
      this.$http.post("http://127.0.0.1:7001/rebook", params).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.getData();
          this.$message({
            type: "success",
            message: "还书成功!",
          });
        } else {
          alert("还书失败");
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
    handlePage(val) {
      this.pageData.page = val;
      this.getData();
    },
    // 列表查询
    onSubmit() {
      this.$http
        .get("http://127.0.0.1:7001/regexfind?bookname=" + this.book)
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data.data;
          // this.tableData.push(res.data.data);
        });
    },
  },
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
}
</style>
