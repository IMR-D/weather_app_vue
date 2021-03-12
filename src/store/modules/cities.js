/*
Данный модуль отвечает за нахождение местоположения пользователя или местоположения по запросу города. .

Объект "current_location" содержит информацию по искомому городу,
а именно его полное наименование, от области/края до города и широту с долготой 

Action fetchNameCity - Делает запрос на API и по долготе и широте узнает местоположение пользователя и выдает текущую погоду.
Данный метод дает несовсем точный результат местонахождение за счет быстроты.

Action fetchLatLonCity - Делает запрос по имени города и получает его широту и долготу, принимает в качествте аргумента
как английское так и русское название города

Getter current_current_location - Получает текущие данные о городе.

Mutation SET_current_location - Помещает данные о местоположении по введенным данным. (Название города)

Mutation CLEAR_current_location - очищает полученные ранее данные, при ошибочных запросах
*/

import axios from "axios";
import country from 'country-list-js';

export default {
	state: {
		currentLocation: {},
	},
	getters: {
		current_current_location: (state) => state.currentLocation,
	},
	mutations: {
		SET_current_location(state, payload) {
			const ctr = country.findByIso2(payload.country);
			state.currentLocation = {
				name: `${payload.name}, ${ctr.name}`,
				lat: payload.lat,
				lon: payload.lon,
			};
		},
		CLEAR_current_location(state) {
			state.currentLocation = {};
		},
	},
	actions: {
		async fetchLatLonCity({commit}, payload) {
			try {
				const res = await axios.get(
						`http://api.openweathermap.org/geo/1.0/direct`, {
							params: {
								q: payload,
								limit: 1,
								appid: process.env.VUE_APP_CITY_API_KEY
							}
						})
				commit("SET_current_location", ...res.data)
			} catch (e) {
				console.error(
						"The name with such a city does not exist, or is absent in the database.",
						e
				);
				commit("CLEAR_current_location");
				throw e;
			}
		},

		async fetchNameCity({commit}, payload) {
			try {
				const res = await axios.get(
						`http://api.openweathermap.org/geo/1.0/reverse`, {
							params: {
								lat: payload.lat,
								lon: payload.lon,
								appid: process.env.VUE_APP_WEATHER_API_KEY,
							}
						}
				)
				commit("SET_current_location", res.data[0])
			} catch (e) {
				console.error(
						"Coordinate search is not possible due to invalid data.",
						e
				)
				throw e;
			}

		},
	},
};
