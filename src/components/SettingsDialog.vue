<template>
<v-row justify="center">
<v-dialog v-model="dialog" scrollable max-width="70%">    
  <template v-slot:activator="{ on, attrs }">
  <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-cog</v-icon></v-btn>
  </template>

  <v-card>
    <v-card-title>Settings</v-card-title>
  <v-card-text>
  <br/>

<!-- timetable name -->
  
  <h3>Timetable Name</h3>
  <br/>

<!-- /timetable name -->
  

<!-- timetable structure -->
  
  <h3>Timetable Structure</h3>
  <br/>
  <!-- /timetable structure -->
  
  <!-- block colours -->
  <h3>Block Colours</h3>
  <br/>
  
<!-- /block colours -->


<!-- timetable years -->
  
  <h3>Timetable Years</h3>
  <br/>
   
<!-- /timetable years-->

<!-- subject -->
  
  <h3>Subjects</h3>
  <br/>
   
<!-- /subjects-->

<!-- rooms -->
  
  <h3>Rooms</h3>
  <br/>
   
<!-- /rooms-->


</v-card-text>
<v-card-actions>
<v-btn color="indigo" text @click="closeDialog">Close</v-btn>

</v-card-actions>
</v-card>



</v-dialog>
</v-row>
</template>

<script>

import * as settings from './../scripts/settings'

export default {
  name: 'SettingsDialog',
  data () {
      return {
        dialog:false,
      }
  },
  created() {

  },
  methods: {
    closeDialog() {
      this.dialog=false;
    },
    
  }

}
</script>