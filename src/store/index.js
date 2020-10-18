import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windows: JSON.parse(localStorage.getItem("activeWindowStorage")) || [
      {
        show: true,
        id: 1,
        name: 1,
        defaultWidth: 300,
        deafaultHeight: 100,
        x: 10,
        y: 10
      },
      {
        show: true,
        id: 2,
        name: 2,
        defaultWidth: 300,
        deafaultHeight: 100,
        x: 350,
        y: 10
      },
      {
        show: true,
        id: 3,
        name: 3,
        defaultWidth: 300,
        deafaultHeight: 100,
        x: 690,
        y: 10
      },
      {
        show: true,
        id: 4,
        name: 4,
        defaultWidth: 300,
        deafaultHeight: 100,
        x: 10,
        y: 130
      },
      {
        show: true,
        id: 5,
        name: 5,
        defaultWidth: 300,
        deafaultHeight: 100,
        x: 350,
        y: 130
      }
    ],
    linkWebSocket: "wss://ws.blockchain.info/inv",
    messages: [],
    allMessagesValues : 0,  
    connection: null,
    messageSubcribe: { op: "unconfirmed_sub" },
    messageUnSubcribe: { op: "unconfirmed_unsub" }
  },
  getters: {
    getMyWindows: state => state.windows,
    getLinkWebSocket: state => state.linkWebSocket,
    getMessages: state => state.messages,
    getAllMessagesValues: state => state.allMessagesValues,
  },
  mutations: {
    UPDATE_COORDINATE_WINDOW_DATA_IN_STORE: (state, payload) => {
      state.windows[payload.id].y = payload.y;
      state.windows[payload.id].x = payload.x;
      console.log(
        "INSIDE Изменилось расположение окна ",
        state.windows[payload.id],
        state.windows[payload.id].x,
        state.windows[payload.id].y
      );
    },
    UPDATE_SIZE_WINDOW_DATA_IN_STORE: (state, payload) => {
      state.windows[payload.id].y = payload.y;
      state.windows[payload.id].x = payload.x;
      state.windows[payload.id].defaultWidth = payload.width;
      state.windows[payload.id].deafaultHeight = payload.height;
      console.log(
        "INSIDE Изменился размер окна ",
        state.windows[payload.id],
        state.windows[payload.id].x,
        state.windows[payload.id].y,
        state.windows[payload.id].defaultWidth,
        state.windows[payload.id].deafaultHeight
      );
    },
    CLOSE_WINDOW: (state, payload) => {
      state.windows[payload.id].show = false;
      state.windows[payload.id].x = 350;
      state.windows[payload.id].y = 230;
      state.windows[payload.id].defaultWidth = 300;
      state.windows[payload.id].deafaultHeight = 100;
    },
    OPEN_WINDOW: (state, payload) => {
      state.windows[payload.windowId].show = true;
    },
    UPDATE_MESSAGES: (state, payload) => {
      state.messages.unshift(payload);
      console.log("В vuex добавлено значение ", payload);
          
      let outs = payload.x.out;    
      console.log("OUT`s из сообщения ", outs);
        for (let out of outs) {
           console.log(out.value);
            state.allMessagesValues = state.allMessagesValues + out.value;
            console.log("ЭТО СУММА ALL OUTS IN STORE", state.allMessagesValues);
        }
      
    },
    CLEAR_MESSAGES: (state) => {
      state.messages = [];
        state.allMessagesValues = 0;
      console.log("Сообщения сброшены");
    },  
  },
  actions: {
    START_SUBSCRIBE({ commit, state }) {
      console.log("подключение к WebSocket Server ");
      this.connection = new WebSocket(state.linkWebSocket);
      console.log("Начинаем подписку ");
      let body = JSON.stringify(state.messageSubcribe);
      console.log("Мое сообщение для подписки ", body);
      this.connection.onopen = () => this.connection.send(body);
      this.connection.onmessage = message => {
        console.log("Новое сообщение", message);
        let messageData = JSON.parse(message.data);
        commit("UPDATE_MESSAGES", messageData);
        console.log("Сообщение добавлено в хранилище ");
      };
    },
    STOP_SUBSCRIBE({ state }) {
      console.log("Останавливаем подписку ");
      let body = JSON.stringify(state.messageUnSubcribe);
      console.log("Мое сообщение для подписки ", body);
      this.connection.send(body);
      console.log("Подписка остановлена");
    }
  },
  modules: {}
});
