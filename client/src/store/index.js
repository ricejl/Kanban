import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";
import AuthService from "../AuthService";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: []
  },
  mutations: {
    // list mutations
    setUser(state, user) {
      state.user = user;
    },
    // board mutations
    setBoards(state, boards) {
      state.boards = boards;
    },
    setActiveBoard(state, board) {
      state.activeBoard = board;
    },
    // list mutations
    setLists(state, lists) {
      state.lists = lists;
    },
    addList(state, list) {
      state.lists.push(list);
    },
    // task mutations
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    // reset state to avoid user data exposure
    resetState(state) {
      state.user = {};
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds);
        commit("setUser", user);
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds);
        commit("setUser", user);
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout();
        if (!success) {
        }
        commit("resetState");
        router.push({ name: "login" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    //#endregion

    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get("boards").then(res => {
        commit("setBoards", res.data);
      });
    },
    getBoardById({ commit, dispatch }, id) {
      api.get("boards/" + id).then(res => {
        commit("setActiveBoard", res.data);
      });
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post("boards", boardData).then(serverBoard => {
        dispatch("getBoards");
      });
    },
    //#endregion

    //#region -- LISTS --
    createList({ commit, dispatch }, listData) {
      api.post("lists", listData).then(res => {
        commit("addList", res.data);
      });
    },
    getLists({ commit, dispatch }, boardId) {
      api.get("boards/" + boardId + "/lists").then(res => {
        commit("setLists", res.data);
      });
    },
    //#endregion

    //#region -- TASK --
    createTask({ commit, dispatch }, taskData) {
      api.post("tasks", taskData).then(res => {
        commit("addTask", res.data);
      });
    },
    getTasks({ commit, dispatch }, listId) {
      api.get("lists/" + listId + "/tasks").then(res => {
        commit("setTasks", res.data);
      });
    }
    //#endregion
  }
});
