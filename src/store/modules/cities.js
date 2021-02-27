/*
Данный модуль отвечает за нахождение местоположения пользователя или местоположения по запросу города. .

Объект "location" содержит информацию по искомому городу, 
а именно его полное наименование, от области/края до города и широту с долготой 

Action FETCH_NAME_CITY - Делает запрос на API и по долготе и широте узнает местоположение пользователя и выдает текущую погоду. 
Данный метод дает несовсем точный результат местонахождение за счет быстроты.

Action FETCH_LAT_LON_CITY - Делает запрос по имени города и получает его широту и долготу, принимает в качествте аргумента 
как английское так и русское название города

Getter GET_CURRENT_LOCATION - Получает текущие данные о городе.

Mutation SET_LOCATION - Помещает данные о местоположении по введенным данным. (Название города) 
*/

import axios from "axios";

export default {
  state: {
    location: {},
    key: "5a115db62558b21cbdf8aaccddab4823",
  },
  mutations: {
    SET_LOCATION(state, payload) {
      return (state.location = {
        name: `${payload.country}, ${payload.name}`,
        lat: payload.lat,
        lon: payload.lon,
      });
    },
  },
  actions: {
    async FETCH_LAT_LON_CITY({ commit, state }, payload) {
      await axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${payload}&limit=1&appid=${state.key}`
        )
        .then((response) => commit("SET_LOCATION", ...response.data))
        .catch((error) => console.log(error));
    },

    async FETCH_NAME_CITY({ commit, state }, payload) {
      await axios
        .get(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${payload.lat}&lon=${payload.lon}&limit=1&appid=${state.key}`
        )
        .then((response) => commit("SET_LOCATION", response.data))
        .catch((error) => console.log(error));
    },
  },
  getters: {
    GET_CURRENT_LOCATION: (state) => state.location,
  },
};
