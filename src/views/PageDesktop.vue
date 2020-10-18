<template>
  <section class="desktop">
    <Block
      class="window"
      class-name-active="window-active"
      v-for="window in windows"
      :key="window.id"
      v-show="window.show === true"
      :grid="[20, 20]"
      :x="window.x"
      :y="window.y"
      :w="window.defaultWidth"
      :h="window.deafaultHeight"
      :parent="true"
      :z="0"
      @activated="onActive(window.id)"
      :on-resize="onResize"
      :on-drag="onDrag"
    >
      <div class="window__block">
        <p>Модальное окно {{ window.name }}</p>
        <button
          @click.prevent="onCloseWindow(window.id)"
          class="window__button"
        >
          закрыть
        </button>
      </div>
    </Block>
    <transition name="fade">
      <section class="desktop__buttons">
        <button
          class="desktop__button"
          v-for="window in windows"
          :key="window.id"
          v-show="window.show === false"
          @click.prevent="onShowWindow(window.id)"
        >
          вернуть окно {{ window.id }}
        </button>
      </section>
    </transition>
  </section>
</template>

<script>
import Block from "vue-draggable-resizable";

export default {
  name: "PageDesktop",
  metaInfo: {
    title: "Рабочий стол",
    titleTemplate: null
  },
  components: {
    Block
  },
  data() {
    return {
      activeWindow: null
    };
  },
  computed: {
    windows() {
      return this.$store.getters.getMyWindows;
    },
    activeWindowStorage() {
      return JSON.stringify(this.windows);
    }
  },
  methods: {
    onCloseWindow() {
      console.log("Click и номер окна ");
      let id = this.activeWindow - 1;
      this.$store.commit("CLOSE_WINDOW", { id });
    },
    onShowWindow(id) {
      console.log("кнопка номер окна ", id);
      let windowId = id - 1;
      this.$store.commit("OPEN_WINDOW", { windowId });
    },
    onActive(id) {
      this.activeWindow = id;
      console.log("Это номер окна ", id);
    },
    onResize(handle, x, y, width, height) {
      let id = this.activeWindow - 1;
      console.log("BEFORE ", x, y, width, height);
      this.$store.commit("UPDATE_SIZE_WINDOW_DATA_IN_STORE", {
        id,
        x,
        y,
        width,
        height
      });
    },
    onDrag(x, y) {
      let id = this.activeWindow - 1;
      console.log("BEFORE ", id, x, y);
      this.$store.commit("UPDATE_COORDINATE_WINDOW_DATA_IN_STORE", {
        id,
        x,
        y
      });
    }
  },
  watch: {
    activeWindowStorage(newactiveWindowStorage) {
      localStorage.activeWindowStorage = newactiveWindowStorage;
    }
  }
};
</script>

<style lang="scss" scoped>
.desktop {
  position: relative;
  border: 1px solid $color-border;
  width: 1000px;
  height: 600px;

  &__buttons {
    position: absolute;
    bottom: -30px;
  }
  &__button {
    background: $color-bckg1;
    padding: 4px;
    font-family: sans-serif;
    font-size: 12px;
    border: 1px solid transparent;
    cursor: pointer;
    color: #2c3e50;
    margin-right: 4px;
    &:hover {
      background: $color-bckg2;
      color: $color-white;
    }
  }
}

.window {
  width: 100%;
  background: rgba(39, 167, 184, 0.2);
  border: 0px;
  display: flex;

  align-items: center;
  justify-content: center;

    &:hover {
        box-shadow: 0px 0px 8px $color-bckg1;
    }
  &-active {
    border: 2px solid rgba(39, 167, 184, 0.8);
    background: white;
    z-index: 10 !important;
  }
  &__button {
    padding: 4px;
    font-family: sans-serif;
    font-size: 12px;
    border: 1px solid transparent;
    cursor: pointer;
    color: #2c3e50;
    &:hover {
      background: #42b983;
      color: white;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
    .fade-leave-to

    /* .fade-leave-active до версии 2.1.8 */
 {
  opacity: 0;
}
</style>
