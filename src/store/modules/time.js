import {DateTime, Settings} from "luxon";

export default {
    state: {
        local_time: {},
    },
    getters: {
        GET_LOCAL_TIME: (state) => state.local_time,
    },
    actions: {
        FETCH_LOCAL_TIME({commit}, payload) {
            commit("SET_LOCAL_TIME", payload);
        },
    },
    mutations: {
        SET_LOCAL_TIME(state, payload) {
            Settings.defaultZoneName = payload;
            const start = DateTime.local();
            return state.local_time = {
                full_time: start.toFormat("cccc, dd LLL yyyy hh:mma").toString(),
                hour: start.toFormat("hh").toString(),
                time_of_day:  start.toFormat("a").toString(),
            }
        },
    },
};
