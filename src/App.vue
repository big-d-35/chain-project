<template>
  <main id="app" class="app">
    <img class="app__logo" alt="Vue logo" src="./assets/logo.png" />
    <Navigation></Navigation>
    <router-view />
  </main>
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  metaInfo: {
    title: "Blockchain",
    // all titles will be injected into this template
    titleTemplate: "%s | Dashboard"
  },
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
.app {
  font-family: $font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $font-color;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  &__logo {
    width: 30px;
  }
}
</style>
