/*
Данный модуль отвечает за отображение погодных условий.

Массив объектов current_weather_selective необходим для отображения дополнительной информации о погодных условиях в искомом городе.
Объект daily_weather содержит полную информацию о погодных условиях города.
key - ключ для доступа к API 

Action fetchdaily_weather получет данные о погодных условиях на 7 дней вперед ,а также настоящего времени.

Getter current_weather_selective - получает дополнительную информацию о погоде
Getter daily_weather - получает полную информацию о погоде

mutation SET_CURRENT_WEATHER_SELECTIVE - помещает необходимые выборочные данные в массив объектов 
mutation SET_DAILY_WEATHER  - помещает полную информацию о погоде 
Mutation CLEAR_WEATHER - очищает полученные ранее данные, при ошибочных запросах 
*/
import axios from "axios";

export default {
    // TODO DR: api key
    state: {
        current_weather_selective: [{}],
        daily_weather: {},
    },
    getters: {
        current_weather_selective: (state) => state.current_weather_selective,
        daily_weather: (state) => state.daily_weather,
    },
    mutations: {
        SET_DAY_LENGTH(state, payload) {
            return state.current_weather_selective.push({
                name: "Daytime",
                value: payload.day_length,
                measurement: "",
            });
        },
        SET_DAILY_WEATHER(state, payload) {
            return (state.daily_weather = payload.data);
        },
        SET_CURRENT_WEATHER_SELECTIVE(state, payload) {
            return (state.current_weather_selective = [
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
                    measurement: " km/h",
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
            state.daily_weather = {};
            state.current_weather_selective = [{}];
        },
    },
    actions: {
        async fetchDailyWeather({commit}, payload) {
            try {
                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/onecall`, {
                        params: {
                            lat: payload.lat,
                            lon: payload.lon,
                            lang: "en",
                            appid: process.env.VUE_APP_WEATHER_API_KEY,
                            units: "metric",
                        }
                    }
                );
                commit("SET_DAILY_WEATHER", res);
                commit("SET_CURRENT_WEATHER_SELECTIVE", res);
            } catch (e) {
                console.error(
                    "Could not find the city using the coordinates received.",
                    e
                );
                commit("CLEAR_WEATHER");
                throw e;
            }
        },
        async fetchDayLength({commit}, payload) {
            try {
                const res = await axios.get(`https://api.sunrise-sunset.org/json`, {
                    params: {
                        lat: payload.lat,
                        lng: payload.lon,
                        date: "today"
                    }
                });
                commit("SET_DAY_LENGTH", res.data.results);
            } catch (e) {
                console.log(e);
                throw e;
            }
        },
    },
};
