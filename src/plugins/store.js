import Vuex from 'vuex'
import Vue from 'vue'

import * as settings from './../scripts/settings'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{

        settings:{name:'',years:[],weeks:[],blocks:[],periods:[],subjects:[],rooms:[]},
    
    },
    mutations:{
        openSettings(state) {
            console.log('plugins/store/openSettings');
            if('settings' in settings) state.settings=JSON.parse(localStorage.getItem('settings'));
            else {
                state.settings=settings.initialSettings;
                localStorage.setItem('settings',JSON.stringify(state.settings));
            }
        },
        deleteSettings(state) {
            let keys=Object.keys(state);
            console.log(keys);
            for(let item of keys) state[item]=null;
            localStorage.removeItem('settings');

        },
        
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
        
        
    },
  


});

