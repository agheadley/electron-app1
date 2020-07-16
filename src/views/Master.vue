<template>
<v-container fluid fill-height style="overflow-x:scroll;">


<table cellspacing="0">
<tr>
<td v-for="(item,i) in test"><input class="class-details" :value="item"/></td>
</tr>
<tr>
<td v-for="(item,i) in test" ><input class="class-details staff-details" :value="item"/></td>
</tr>
<tr>
<td v-for="(item,i) in test2" ><input class="class-details room-details" :value="item"/></td>
</tr>
</table>




    
</v-container>
</template>

<script>
  

import * as csv from './../scripts/csv'

export default {
name: 'Master',
data() {
    return{
        message:'settings file',
        test:['1','2','3','4','5','6'],
        test2:[0]
    }
},
created() {
    for(let col=0;col<50;col++) {
        this.test[col]="Mai.Bs1";
        this.test2[col]="Itai."+col;
        
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

<style scoped>

table {
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid gray;
}

.class-details {
    font-family: "Helvetica Narrow","Arial Narrow",Tahoma,Arial,Helvetica,sans-serif;
    font-size:10px;
    width:36px;
    height:22px;
}

.staff-details {
    font-weight:bold;
}

.room-details {
    font-style:italic;
}
</style>