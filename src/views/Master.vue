<template>
    <div>

    <v-card outlined>
         <v-toolbar flat>
         <v-toolbar-title>Master</v-toolbar-title>
         <v-spacer></v-spacer>
          <v-toolbar-title>model title</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-text-field solo
            label="Search"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
         </v-toolbar>
    <v-container fluid>
    </v-container>
    </v-card>
        
    </div>
</template>

<script>
  

import * as csv from './../scripts/csv'

export default {
name: 'Master',
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

