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
            if('settings' in localStorage) {
                state.settings=JSON.parse(localStorage.getItem('settings'));
                console.log('found localStorage : '+state.settings);
            }
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
        setName(state,txt) {
            state.settings.name=txt;
            localStorage.setItem('settings',JSON.stringify(state.settings));
        },
        setBlockColor(state,blocks) {
            state.settings.blocks=blocks;
            console.log('plugins/store.js/setBlockColor');
            console.log(state.settings.blocks);
            localStorage.setItem('settings',JSON.stringify(state.settings));

        },
    },
   


});

