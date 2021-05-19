<template>
  <v-app>
    <AppBar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import AppBar from "./components/common/AppBar";
import Footer from "./components/common/Footer";

export default {
  name: "App",

  components: {
    AppBar,
    Footer,
  },
};
</script>
