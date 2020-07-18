<template>


<v-container fluid>



<v-row align="baseline">
<v-col class="d-flex" cols="3">
 <v-text-field
            v-model="timetableName"
            label="Timetable Name"
            outlined
            readonly
          ></v-text-field>
</v-col>

<v-col class="d-flex" cols="2">

 <v-select
          :items="weeks"
          label="Timetable Week"
          outlined
></v-select>
</v-col>
<v-col class="d-flex" cols="1">
    <p>Year Group</p>
</v-col>
<v-col class="d-flex" cols="6">
 <v-btn-toggle v-model="toggle_weeks" mandatory title="cww" color="indigo">
     <v-btn v-for="(item,i) in years">{{item}}</v-btn>
 </v-btn-toggle>

</v-col>
<!--
<v-col class="d-flex" cols="12" sm="2">
<v-alert type="info">Week : {{weeks[toggle_weeks]}}</v-alert>
</v-col>
-->
</v-row>


<v-row>
<div class="tt-row">

<table cellspacing="0">
<tr>
<td v-for="(item,i) in blankRow" class="title-details">{{item.title}}</td>
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

</div>
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
        toggle_weeks:0,
        timetableNameRules: [v => v.length <= 25 || 'Max 25 characters'],
        timetableName:'Sample-timetable',
        years:['7','6','5','4','3','2','1','0','X'],
    }
},
computed : {
    //weeks() { return this.$store.getters.timetableWeeks}
    weeks() {return this.$store.state.timetableWeeks},
    blankRow() {return this.$store.state.timetableRow}
},
created() {
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
.tt-row {
    overflow-x:auto;
}

.tt-row::-webkit-scrollbar {
    display: none;
  /*display: auto;*/
}

table {
  border-collapse: collapse;
}

table,th,td {
  border: 1px solid gray;
}

.title-details {
    font-family: Helvetica,Arial,sans-serif;
    font-size:10px;
    width:36px;
    height:22px;
    text-align:center;
    font-weight:bold;
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