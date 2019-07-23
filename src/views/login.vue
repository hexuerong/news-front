<template>
  <div class="news-login">
    <img class="logo" src="../assets/logo.png" alt="LOGO" />
    <Button type="primary" class="login-btn" @click="loginGithub">github登录</Button>
    <Button type="success" class="login-btn">QQ登录</Button>
    <Button type="default" class="login-btn">游客访问</Button>
    <Divider>其他登录</Divider>
    <div class="other">
      <Icon type="logo-github" size="30" />
      <Icon type="logo-google" size="30" />
      <Icon type="logo-chrome" size="30" />
      <Icon type="logo-twitter" size="30" />
    </div>
  </div>
</template>

<script>
import { Divider, Icon } from "iview";
import { setLocalStorage } from "../util/localStorage";
export default {
  components: {
    Divider,
    Icon
  },
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("message", this.receiveMessage, false);
  },
  methods: {
    async loginGithub() {
      const res = await this.axios.get("/api/login/loginType?type=github");
      if (res.data) {
        let link = document.createElement("a");
        link.href = res.data.data.link;
        link.target = "_blank";
        link.click();
      }
    },
    receiveMessage(event) {
      if (event.origin !== "http://localhost:8090") return;
      if (event.data.status == 200) {
        window.removeEventListener("message", this.receiveMessage);
        setLocalStorage("access_token", event.data.access_token);
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss">
.news-login {
  text-align: center;
  .logo {
    margin: 0 auto;
    width: 10rem;
    height: 10rem;
    margin-top: 5rem;
  }
  .login-btn {
    display: block;
    width: 100%;
    max-width: 20rem;
    height: 2rem;
    border-radius: 0.5rem;
    margin: 1rem auto;
    outline: none;
  }
  .other {
    .ivu-icon {
      margin-right: 0.5rem;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
