<template>
  <div class="header">
    <div class="Top">
      <div class="logo">
        <img src="@/assets/img/heard/logo.png" />
      </div>
      <div class="titleText">
        <div class="tlie">电缆精益化管理平台</div>
        <div class="eng">Cable Lean Management Platform</div>
      </div>
      <div class="top-right">
        <div class="date">
          <p>{{ this.nowTime }}</p>
        </div>
        <div class="userLogo">
          <img src="@/assets/img/heard/userLogo.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowTime: "",
      date: new Date(),
    };
  },
  mounted() {
    this.nowTimes();
  },
  beforeDestroy() {
    this.clear();
  },
  methods: {
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      let week = new Date(timeStamp).getDay();
      let weeks = ["日", "一", "二", "三", "四", "五", "六"];
      let getWeek = "星期" + weeks[week];
      this.nowTime =
        year +
        "年" +
        month +
        "月" +
        date +
        "日" +
        " " +
        hh +
        ":" +
        mm +
        ":" +
        ss +
        "" +
        getWeek;
      // console.log(this.nowTime);
    }, // 实时刷新当前时间，格式化
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  height:100px;
  width: 100%;
  background: #007471;
}
.Top {
  margin: 0 auto;
  box-sizing: border-box;
  padding: 13px 38px 3px 24px;
}
.logo {
  width: 88px;
  height: 87px;
  float: left;
  margin-right: 15px;
}
.titleText {
  float: left;
}
.tlie {
  margin-top: 11px;
  width: 300px;
  height: 28px;
  font-size: 28px;
  font-family: "SourceHanSansCN-Medium";
  color: #ffffff;
  letter-spacing: 5px;
}
.eng {
  margin-top: 7px;
  color: #ffffff;
  font-size: 18px;
  font-family: "SourceHanSansCN-Medium";
}
.top-right {
  float: right;
}
.date {
  margin-top: 3%;
  width: 280px;
  height: 18px;
  float: left;
  color: #ffffff;
  font-size: 18px;
}
.userLogo {
  float: left;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #f1f4f8;
  background-image: "../../assets/img/heard/userLogo.png";
  overflow: hidden;
  margin-left: 34px;
}
</style>
