<template>
<v-row justify="center">
<v-dialog v-model="dialog" scrollable max-width="70%">    
  <template v-slot:activator="{ on, attrs }">
  <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-cog</v-icon></v-btn>
  </template>



  <v-card>
  <v-card-title>Timetable Title</v-card-title>
  <v-card-text>
  <br/>
  <v-text-field
    v-model="timetableName"
    label="Timetable Name"
    description="Name of current timetable"
    outlined
    :rules="timetableNameRules"
    counter="25"
  >
  </v-text-field>
  </v-card-text>


  <v-card-title>Timetable Structure</v-card-title>


  <template v-if="isTimetableFileChosen===false">
    <v-card-text>
    <br/>
    <v-file-input accept=".csv" 
      label="Click here to upload a .csv file"
      outlined
      v-model="chosenFile">
    </v-file-input>
    </v-card-text>
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn right @click="importFile">Read File</v-btn>
    </v-card-actions>
  </template>

  <template v-if="isTimetableFileChosen===true">

    <template v-if="isTimetableFileOK===true">
      <v-card-text>
      <v-alert type="success">Valid structure found.</v-alert>
      <v-data-table
        :headers="timetableHeaders"
        :items="timetableStructure"
        :items-per-page="5"
        class="elevation-1">
      </v-data-table>
      </v-card-text>
      <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn cancel @click="isTimetableFileChosen=false">Cancel</v-btn>
      <v-btn right @click="updateStructure">Accept</v-btn>
      </v-card-actions>
    </template>

    <template v-if="isTimetableFileOK===false">
      <v-card-text>
      <v-alert type="error">
        Invalid Timetable Structure. Please upload a different file.
      </v-alert>
      </v-card-text>
      <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn cancel @click="isTimetableFileChosen=false">Cancel</v-btn>
    </template>

  </template>




<v-card-actions>
<v-btn color="indigo" text @click="dialog = false">Cancel</v-btn>
<v-btn color="indigo" text @click="dialog = false">Save</v-btn>
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
        dialog: false,
        timetableName:'',
        timetableNameRules:[v => v.length <= 25 && v.length>0 || 'Non-blank, max 25 characters'],
        chosenFile:null,
        data:null,
        headers:null,
        isTimetableFileChosen:false,
        isTimetableFileOK:false,
        isTimetableStructureOK:false,
        timetableHeaders:null,
        timetableStructure:null,


      }
    },
  methods: {
    importFile() {
    
      if (this.chosenFile) { 
        let reader = new FileReader();
      
        reader.readAsText(this.chosenFile);
        reader.onload = () => {
          this.data = reader.result;
          console.log(this.data);
          let response=settings.readTimetableStructure(this.data,',');
          console.log('***',response);
          if(response.isValid) {
            let headerArr=Object.keys(response.data[0]);
            this.timetableHeaders=[];
            for(let item of headerArr) this.timetableHeaders.push({text:item,value:item,sortable:true});
            this.timetableStructure=response.data;
            this.isTimetableFileChosen=true;
            this.isTimetableFileOK=true;
            this.isTimetableStructureOK=true;
          }      
          


        }

      } 

    },
    updateStructure() {
        //let structure=settings.processTimetableStructure(this.timetableStructure);

        //this.$store.dispatch('setTimetableWeeks',weeks);
    }
  }

}
</script>