import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        timetableRow:[],
        timetableWeeks:[]
    },
    getters:{
        timetableWeeks: state => {return state.timetableWeeks} 
    },
    mutations:{
        
        setTimetableRow(state,arr) {
            state.timetableRow=arr;
        },
        setTimetableWeeks(state,arr) {
            state.timetableWeeks=arr;
        }
        
    },
    actions:{
        
        setTimetableWeeks(context,arr) {
            context.commit('setTimetableWeeks',arr)
        },
        setTimetableRow(context,arr) {
            context.commit('setTimetableRow',arr);
        },
        
    }




});

