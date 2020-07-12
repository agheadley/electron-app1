<template>
    <div>
    <v-card outlined>
    <v-card-title>Settings</v-card-title>
    </v-card>
    <v-container>    
    <upload-csv v-on:fromUploadFile="onUploadFile"></upload-csv>
    </v-container>
    
        
    </div>
</template>

<script>
  
import UploadCSV from './../components/UploadCSV.vue'

import * as csv from './../scripts/csv'

export default {
name: 'Settings',
components: {
    'upload-csv':UploadCSV
    
},
data() {
    return{
        message:'settings file'
    }
},
methods: {
    
    onUploadFile(value) {
        console.log('uploaded file data: '+value)
        let response=csv.readCSV(value,',');
        
    },


}
}
</script>

