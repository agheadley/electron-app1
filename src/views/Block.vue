<template>
    
    <v-container fluid fill-height>
    
    <v-row no-gutters>
      <div style="border:1px solid black">x</div>
    </v-row>

    </v-container>


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

