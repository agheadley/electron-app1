<template>
<div>
<v-container fluid fill-height>

<v-container>
<h3>Settings</h3>
<br/>
<v-spacer></v-spacer>
<v-alert type="warning">
Updating settings can invalidate current timetables.
</v-alert>
</v-container>
<v-container>
<upload-csv v-on:fromUploadFile="onUploadTimetableStructure"></upload-csv>
</v-container>




    
</v-container>
</div>

<!--
    <div>
    <v-card outlined>
    <v-card-title>Settings</v-card-title>
    </v-card>
    <v-container>    
    <upload-csv v-on:fromUploadFile="onUploadFile"></upload-csv>
    </v-container>
        
    </div>
-->
</template>

<script>
  
import UploadTTStructureCSV from './../components/UploadTTStructureCSV.vue'

import * as csv from './../scripts/csv'

export default {
name: 'Settings',
components: {
    'upload-csv':UploadTTStructureCSV
    
},
data() {
    return{
        message:'settings file'
    }
},
methods: {
    
    onUploadTimetableStructure(data) {
        console.log('Settings.vue');
        console.log(JSON.stringify(data));
        
        //let weeks=new Set([...data.map(el=>el.week)]);
        let weeks=[... new Set(data.map(el=>el.week))];
        console.log(weeks);

        this.$store.dispatch('setTimetableWeeks',weeks);

        let blankRow=[];

        for(let item of data) {
            let obj={id:null,title:null,class:' ',staff:" ",room:" "};
            if(item.visible==="YES") { 
                obj.id=item.id;
                obj.title=item.day+item.per;
                blankRow.push(obj);
            }
        }
        this.$store.dispatch('setTimetableRow',blankRow);

        
    },


}
}
</script>

