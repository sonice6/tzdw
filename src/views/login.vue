<template>
  <div class="login">
    <div class="top">
      <div class="logo">
        <div>
          <img src="@/assets/img/login/logo@2x.png" />
        </div>
        <div>
          <div class="tilitop">电缆精益化管理平台</div>
          <div class="titlebottn">Cable Lean Management Platform</div>
        </div>
      </div>
    </div>
    <div class="cent">
      <div class="longCart">
        <div>
          <img src="@/assets/img/login/pic2@2x.png" />
        </div>
        <div>
          <div class="singin">
            <span>用户登录</span>
            <div class="Infrom">
              <el-input v-model="input" placeholder="输入账号"></el-input>
              <div class="passw">
                <el-input
                  placeholder="请输入密码"
                  v-model="input2"
                  show-password
                ></el-input>
              </div>
            </div>
            <el-button class="butdenglu" @click="butdl">登录</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      input2: "",
    };
  },
  methods: {
    butdl() {
      this.$router.push("/index");
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
}

.top {
  width: 100%;
  height: 48%;
  background-image: url("../assets/img/login/ditu_pic.png");
  background-size: 100% 100%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .logo {
    width: 25%;
    height: 18%;
    position: absolute;
    top: 10%;
    left: 5%;
    display: flex;
    div:nth-child(1) {
      height: 100%;
      width: 17%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    div:nth-child(2) {
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      padding-left: 2%;
      overflow: hidden;
      .tilitop {
        width: 100%;
        height: 50%;
        font-size: 1.7vw;
        font-family: LiHei Pro Medium;
        letter-spacing: 0.5vw;
        color: #ffffff;
        text-align: left;
        padding-top: 2.5%;
      }
      .titlebottn {
        width: 100%;
        height: 30%;
        color: #ffffff;
        font-size: 0.9vw;
        text-align: left;
        letter-spacing: 0.15vw;
      }
    }
  }
}
.cent {
  width: 100%;
  height: 42%;
  // background-color: rgb(255, 255, 255);
  position: relative;
  .longCart {
    width: 60%;
    height: 110%;
    background: white;
    position: absolute;
    border: 2px rgb(245, 245, 245) solid;
    top: -55%;
    left: 17.5%;
    box-shadow: 0px 4px 10px 3px rgb(220 220 220);
    padding: 1%;
    div {
      box-sizing: border-box;
      width: 50%;
      height: 100%;
      float: left;
    }
    div:nth-child(1) {
      img {
        width: 100%;
        height: 100%;
      }
    }
    div:nth-child(2) {
      padding: 5% 2.5%;
      .singin {
        width: 100%;
        height: 100%;
        span {
          display: block;
          width: 100%;
          text-align: center;
          font-size: 2vw;
          color: #007471;
          font-weight: 550;
          //  background: pink;
        }
        .Infrom {
          width: 100%;
          height: 80%;
          //  background: powderblue;
          .el-input {
            width: 100%;
            height: 35%;
          }
          .passw {
            width: 100%;
            height: 100%;
            padding: 0;
            margin-top: 5%;
          }
        }
        .butdenglu {
          background: #007471;
          color: white;
          width: 15%;
          height: 12%;
          font-size: 1vw;
          position: absolute;
          top: 76%;
          left: 66%;
        }
      }
    }
  }
}
.bottom {
  width: 100%;
  height: 10%;
  background-color: #007471;
  box-shadow: 10px 10px 6px 10px rgb(0 78 76);
}
</style>
<style scoped>
/deep/.el-input__inner {
  height: 100%;
  font-size: 22px;
}
</style>
