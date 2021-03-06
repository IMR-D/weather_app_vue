import {DateTime, Settings} from "luxon";

export default {
    state: {
        localTimeCity: {},
    },
    getters: {
        local_time: (state) => state.localTimeCity,
    },
    mutations: {
        SET_LOCAL_TIME(state, payload) {
            Settings.defaultZoneName = payload;
            const start = DateTime.local();
            return state.localTimeCity = {
                full_time: start.toFormat("cccc, dd LLL yyyy hh:mma").toString(),
                hour: start.toFormat("hh").toString(),
                time_of_day: start.toFormat("a").toString(),
            }
        },
    },
    actions: {
        fetchLocalTime({commit}, payload) {
            commit("SET_LOCAL_TIME", payload);
        },
    },
};
