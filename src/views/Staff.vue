<template>
<v-container fluid fill-height>



<div><button @click="getDownload">DOWNLOAD FILE</button></div>



    
</v-container>
</template>

<script>

import * as request from './../scripts/request';

export default {
name: 'Block',
data() {
    return{
        message:'staff file'
    }
},
methods: {
    
    getDownload() {
        fetch(request.url+'generateDownload', {  
            method: 'POST',  
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data:'test,test2,test3\nx,y,z'})
        }).then(res => res.json())
        .then (data=>{              
            this.message=data;
            console.log(data);
            console.log(data.response)
            if(data.response==="SUCCESS") {
                let x=request.download('out.csv');
                console.log(x);
            }
        }).catch(err=>{
            this.message=err;
            console.log(err);
        })
    },


}
}
</script>

