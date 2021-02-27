/*
Данный модуль отвечает за нахождение местоположения пользователя или местоположения по запросу города. .

Объект "location" содержит информацию по искомому городу, 
а именно его полное наименование, от области/края до города и широту с долготой 

Широту и долготу получаю через API sputnik от Ростелекома который позволяет по названию города 
получить его данные, собсвтенно ранее представленный объект location требуется 
для поиска через другую API open weather map требуемый город с погодой используя полученные широту и долготу, т.к. 
бесплатные API по названию города, не позволяют найти русские города, а только использую долготу и широту. 

 Action FETCH_NAME_CITY - Делает запрос на API и по долготе и широте узнает местоположение пользователя и выдает текущую погоду. 
Данный метод дает несовсем точный результат местонахождение за счет быстроты.

 Action FETCH_LAT_LON_CITY - Делает запрос по имени города и получает его широту и долготу, принимает в качествте аргумента 
как английское так и русское название города, но поиск по городам России работает исключительно с русским языком, 
европейские города можно искать на 2-х языках

GET_CURRENT_LOCATION - Получает текущие данные о городе.
SET_LOCATION - Помещает данные о местоположении по введенным данным. (Название города) 
SET_LOCATION_AUTO - Помещает данные о местоположении если пользователь согласился предоставить их автоматически.
*/

import axios from "axios";

export default {
  state: {
    location: {},
    url: "http://search.maps.sputnik.ru/search?q=",
  },
  mutations: {
    SET_LOCATION(state, payload) {
      return (state.location = {
        name: payload.display_name,
        lat: payload.position.lat,
        lon: payload.position.lon,
      });
    },
    SET_LOCATION_AUTO(state, payload) {
      return (state.location = {
        name:
          payload.address.county +
          ", " +
          payload.address.state +
          ", " +
          payload.address.city,
        lat: payload.lat,
        lon: payload.lon,
      });
    },
  },
  actions: {
    async FETCH_LAT_LON_CITY({ commit, state }, payload) {
      await axios
        .get(state.url + payload)
        .then((response) => commit("SET_LOCATION", ...response.data.result))
        .catch((error) => console.log(error));
    },
    async FETCH_NAME_CITY({ commit }, payload) {
      console.log(payload);
      await axios
        .get(
          "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
            payload.lat +
            "&lon=" +
            payload.lon
        )
        .then((response) => commit("SET_LOCATION_AUTO", response.data))
        .catch((error) => console.log(error));
    },
  },
  getters: {
    GET_CURRENT_LOCATION: (state) => state.location,
  },
};
