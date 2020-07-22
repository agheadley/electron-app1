<template>


<v-container fluid>

<!-- selection row -->
<v-row align="baseline">
<v-col class="d-flex" cols="3">
<v-text-field
    v-model="settingsName"
    label="Timetable Name"
    outlined
    @focus="snackbarName=true"
    readonly/>

</v-col>

<v-col class="d-flex" cols="2">

 <v-select
          v-model="selectedWeek"
          :items="settingsWeeks"
          label="Timetable Week"
          item-text="name"
          item-value="id"
          outlined/>

</v-col>
<v-col class="d-flex d-print-none" cols="1" >
    <p>Year Group</p>
</v-col>
<v-col class="d-flex d-print-none" cols="6">
 <v-btn-toggle v-model="toggle_years" mandatory title="years" color="indigo">
     <template v-for="(item,i) in settingsYears">
     <v-btn v-if="item.code.length>0">{{item.code}}</v-btn>
     </template>
 </v-btn-toggle>

</v-col>
</v-row>

<v-snackbar v-model="snackbarName" timeout="3000">
    Adjust timetable name in settings.
    <template v-slot:action="{ attrs }">
    <v-btn color="red" text v-bind="attrs" @click="snackbarName = false">Close</v-btn>
    </template>
</v-snackbar>
  


<!-- /selection row-->

<!-- display  -->

<!--
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

-->

<!-- /display  -->
    
</v-container>
</template>

<script>
  

export default {
name: 'Master',
data() {
    return{
        message:'',
        toggle_years:0,
        selectedWeek:0,
        snackbarName:false,
    }
},
computed : {
    settingsName() {return this.$store.state.settings.name},
    settingsWeeks() {
        let arr=this.$store.state.settings.weeks.map((el,index)=>({id:index,name:el}));
        return arr;
    },
    settingsYears() {return this.$store.state.settings.years},
    
},
methods: {
    


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