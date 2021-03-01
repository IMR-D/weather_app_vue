/*
Данный модуль отвечает за отображение погодных условий.

Массив объектов currentWeatherSelective необходим для отображения дополнительной информации о погодных условиях в искомом городе. 
Объект dayliWeather содержит полную информацию о погодных условиях города.
key - ключ для доступа к API 

Action FETCH_DAYLI_WEATHER получет данные о погодных условиях на 7 дней вперед ,а также настоящего времени.

Getter GET_CURRENT_WEATHER_SELECTIVE - получает дополнительную информацию о погоде 
Getter GET_DAYLI_WEATHER - получает полную информацию о погоде

mutation SET_CURRENT_WEATHER_SELECTIVE - помещает необходимые выборочные данные в массив объектов 
mutation SET_DAILY_WEATHER  - помещает полную информацию о погоде 
Mutation CLEAR_WEATHER - очищает полученные ранее данные, при ошибочных запросах 
*/
import axios from "axios";

export default {
  state: {
    currentWeatherSelective: [{}],
    dayliWeather: {},
    key: "3a58dc3293b0300059e35bfce7c162e7",
  },
  getters: {
    GET_CURRENT_WEATHER_SELECTIVE: (state) => state.currentWeatherSelective,
    GET_DAYLI_WEATHER: (state) => state.dayliWeather,
  },
  actions: {
    async FETCH_DAYLI_WEATHER({ commit, state }, payload) {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${payload.lat}&lon=${payload.lon}&lang=ru&appid=${state.key}&units=metric`
        )
        .then((response) => {
          commit("SET_DAILY_WEATHER", response);
          commit("SET_CURRENT_WEATHER_SELECTIVE", response);
        })
        .catch((error) => {
          console.error(
            "Не удалось найти город по полученным координатам",
            error
          );
          commit("CLEAR_WEATHER");
        });
    },
    async FETCH_DAY_LENGTH({ commit }, payload) {
      await axios
        .get(
          `https://api.sunrise-sunset.org/json?lat=${payload.lat}&lng=${payload.lon}&date=today`
        )
        .then((response) => {
          commit("SET_DAY_LENGTH", response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mutations: {
    SET_DAY_LENGTH(state, payload) {
      return state.currentWeatherSelective.push({
        name: "Daytime",
        value: payload.day_length,
        measurement: "",
      });
    },
    SET_DAILY_WEATHER(state, payload) {
      return (state.dayliWeather = payload.data);
    },
    SET_CURRENT_WEATHER_SELECTIVE(state, payload) {
      return (state.currentWeatherSelective = [
        {
          name: "Humidity",
          value: payload.data.current.humidity,
          measurement: "%",
        },
        {
          name: "Pressure",
          value: payload.data.current.pressure,
          measurement: "mBar",
        },
        {
          name: "Wind",
          value: payload.data.current.wind_speed,
          measurement: "km/h",
        },
        {
          name: "Sunrise",
          value: payload.data.current.sunrise,
          measurement: "",
        },
        {
          name: "Sunset",
          value: payload.data.current.sunset,
          measurement: "",
        },
      ]);
    },
    CLEAR_WEATHER(state) {
      state.dayliWeather = {};
      state.currentWeatherSelective = [{}];
    },
  },
};
