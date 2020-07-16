<template>


<v-container fluid>



 <v-row align="center">
<v-col class="d-flex" cols="12" sm="4">
Timetable Title
</v-col>

<v-col class="d-flex" cols="12" sm="4">

 <v-select
          :items="weeks"
          label="Timetable Week"
></v-select>
</v-col>
</v-row>


<v-row>


<table cellspacing="0">
<tr>
<td v-for="(item,i) in blankRow"><input class="class-details" :value="item.title"/></td>
</tr>

<tr>
<td v-for="(item,i) in blankRow"><input class="class-details" :value="item.class"/></td>
</tr>
<tr>
<td v-for="(item,i) in blankRow"><input class="class-details staff-details" :value="item.staff"/></td>
</tr>
<tr>
<td v-for="(item,i) in blankRow"><input class="class-details room-details" :value="item.room"/></td>
</tr>
</table>


</v-row>

    
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
computed : {
    //weeks() { return this.$store.getters.timetableWeeks}
    weeks() {return this.$store.state.timetableWeeks},
    blankRow() {return this.$store.state.timetableRow}
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