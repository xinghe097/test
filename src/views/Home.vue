<template>
  <div class="datamap">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>图书种类</span>
          </div>
          <div id="one" style="width: 650px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>阅读量</span>
          </div>
          <div id="two"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.initCharOne();
    this.initCharTwo();
    // this.init();
  },

  methods: {
    // init() {
    //   setTimeout(() => {
    //     this.initCharOne();
    //     this.initCharTwo();
    //   }, 1000);
    // },
    initCharOne() {
      const option = {
        xAxis: {
          axisLabel: {
            interval: 0,
            formatter: function (value) {
              return value.split("").join(" ");
            },
          },
          type: "category",
          data: [
            "社会科学类",
            "军事类",
            "文化类",
            "语言文字类",
            "历史类",
            "天文学类",
            "农业类",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      const myChartOne = this.$echarts.init(document.getElementById("one")); //图标初始化\
      myChartOne.setOption(option);
      window.onresize = function () {
        myChartOne.resize();
      };
    },
    initCharTwo() {
      const option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["诗集", "报告", "专业书", "工具书", "小说"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "诗集",
            type: "line",
            stack: "Total",
            data: [120, 182, 101, 134, 90, 230, 210],
          },
          {
            name: "报告",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "专业书",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "工具书",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "小说",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };
      const myChartTwo = this.$echarts.init(document.getElementById("two")); //图标初始化\
      myChartTwo.setOption(option);
      window.onresize = function () {
        myChartTwo.resize();
      };
    },
  },
};
</script>

<style lang="less" scoped>
.datamap #one {
  height: 500px;
}

.datamap #two {
  height: 500px;
}
</style>
