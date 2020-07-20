<template>
  <v-row justify="center">
  <v-dialog v-model="dialog" scrollable max-width="70%">    
  <template v-slot:activator="{ on, attrs }">
  <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-cog</v-icon></v-btn>
  </template>

  <v-card>
  <v-card-title>Timetable Structure</v-card-title>
  <v-spacer></v-spacer>


<template v-if="isChosen===false">
  <v-card-text>
<v-file-input accept=".csv"
  label="Click here to upload a .csv file"
  outlined
  v-model="chosenFile">
</v-file-input>
</v-card-text>
<v-card-actions>
<v-spacer></v-spacer>
<v-btn right @click="importTxt">Read File</v-btn>
</v-card-actions>
</template>

<template v-if="isChosen===true">

<template v-if="isOK===true">
<v-card-text>
 <v-alert type="success">Valid structure found.</v-alert>
   <v-data-table
    :headers="ttHeaders"
    :items="ttStructure"
    :items-per-page="10"
    class="elevation-1"
  ></v-data-table>
</v-card-text>
<v-card-actions>
<v-spacer></v-spacer>
<v-btn cancel @click="isChosen=false">Cancel</v-btn>
<v-btn right @click="updateStructure">Accept</v-btn>
</v-card-actions>
</template>

<template v-if="isOK===false">
<v-card-text>
 <v-alert type="error">
      Invalid Timetable Structure. Please upload a different file.
    </v-alert>
</v-card-text>
<v-card-actions>
<v-spacer></v-spacer>
<v-btn cancel @click="isChosen=false">Cancel</v-btn>
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

import * as csv from './../scripts/csv'

  export default {
    name: 'SettingsDialog',
    data () {
      return {
        dialog: false,
        chosenFile:null,
        data:null,
        headers:null,
        isChosen:false,
        isOK:false,
        ttHeaders:null,
        ttStructure:null,
      }
    },
    methods: {
       importTxt() {
      
        if (!this.chosenFile) {this.data = "No File Chosen"}
        var reader = new FileReader();
        
        // Use the javascript reader object to load the contents
        // of the file in the v-model prop
        reader.readAsText(this.chosenFile);
        reader.onload = () => {
          this.data = reader.result;
          console.log('UploadCSV.vue :');
          console.log(this.data);
          let response=csv.readCSV(this.data,',');
          console.log(response.data);


          if(response.isOK) {
            let headerArr=Object.keys(response.data[0]);
            this.ttHeaders=[];
            for(let item of headerArr) {
              this.ttHeaders.push({text:item,value:item,sortable:true});
            }
            this.ttStructure=response.data;
            console.log(this.ttStructure[0]);

          }


          this.isChosen=true;
          this.isOK=response.isOK;

          
        }

      },
    updateStructure() {
      this.$emit('fromUploadFile',this.ttStructure);
    }
    }
  }
</script>