<template>
  <nav class="navigation" id="nav">
    <router-link class="navigation__item" to="/">Рабочий стол</router-link> |
    <router-link class="navigation__item" to="/page-transaction"
      >Транзакции</router-link
    >
  </nav>
</template>

<script>
export default {
  name: "navigation"
};
</script>

<style lang="scss" scoped>
.navigation {
  padding: 10px;

  &__item {
    font-weight: bold;
    color: $font-color;
    text-decoration: none;
    font-family: $font;
  }
}

.router-link-exact-active {
  color: $font-color2;
}
</style>
