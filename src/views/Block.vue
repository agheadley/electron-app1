<template>
    <div>
    <v-card outlined>
    <v-card-title>Block</v-card-title>

    
    </v-card>
        
    </div>
</template>

<script>
  

//import * as csv from './../scripts/csv'

export default {
name: 'Block',
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

