<template>
<v-container fluid fill-height>








    
</v-container>
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

