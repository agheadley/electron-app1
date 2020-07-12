<template>
    <div>
        <p>Route1.vue (Route: /route1)</p>
        <button @click="onClickGo">Go to /</button>

        <download-file :fileContent="csv" :fileName="file"></download-file>
        <p> </p>
        <upload-file :fileType="csv" v-on:fromUploadFile="onUploadFile"></upload-file>

    </div>
</template>

<script>
import UploadFile from './../components/UploadFile.vue'

import * as csv from './../scripts/csv'

export default {
name: 'Settings',
components: {
    'upload-file':UploadFile
},
data() {
    return{
        message:'Hello from route1 ...',
        file:'test.csv',
        csv:encodeURIComponent('x,y,z')
    }
},
methods: {
    onClickGo() {
    this.$router.push('/')
    },
    onUploadFile(value) {
        console.log('uploaded file data: '+value)
        let response=csv.readCSV(value,',');
        
    },


}
}
</script>