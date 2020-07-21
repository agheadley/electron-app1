import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        timetableRow:[],
        timetableWeeks:[],

        timetableName:null,
        timetableStructure:null,
        timetableBlocks:null,
        timetableYears:null,
       
    },
    mutations:{
        setTimetableName(state,txt) {
            state.timetableName=txt;
            localStorage.setItem('timetableName',txt);
        },
        setTimetableStructure(state,json) {
            state.timetableWeeks=json;
            localStorage.setItem('timetableStructure',JSON.stringify(json));
        },
        setTimetableBlockColor(state,blocks) {
            state.timetableBlocks=blocks;
            localStorage.setItem('timetableBlocks',JSON.stringify(blocks));
        },
        setTimetableYears(state,years) {
            state.timetableYears=years;
            localStorage.setItem('timetableYears',JSON.stringify(years));
        },
        initialiseStore(state) {
            if(localStorage.timetableName) {
                state.timetableName=localStorage.getItem('timetableName');
            }
            if(localStorage.timetableStructure) {
                state.timetableStructure=JSON.parse(localStorage.getItem('timetableStructure'));
            }
            if(localStorage.timetableBlocks) {
                state.timetableBlocks=JSON.parse(localStorage.getItem('timetableBlocks'));
            }
            if(localStorage.timetableYears) {
                state.timetableYears=JSON.parse(localStorage.getItem('timetableYears'));
            }

        },
        
        setTimetableRow(state,arr) {
            state.timetableRow=arr;
        },
        setTimetableWeeks(state,arr) {
            state.timetableWeeks=arr;
        }
        
    },
  


});

