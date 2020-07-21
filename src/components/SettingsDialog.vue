<template>
<v-row justify="center">
<v-dialog v-model="dialog" scrollable max-width="70%">    
  <template v-slot:activator="{ on, attrs }">
  <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-cog</v-icon></v-btn>
  </template>

  <v-card>
  <v-card-text>
  <br/>

<!-- timetable name -->
  
  <h3>Timetable Name</h3>
  <br/>
  <v-text-field
    v-model="timetableName"
    label="Timetable Name"
    description="Name of current timetable"
    outlined
    :rules="timetableNameRules"
    counter="25">
  </v-text-field>
  <br/>
  <v-row>
      <v-spacer></v-spacer>
      <v-btn right @click="storeName">Store</v-btn>
  </v-row>
  <v-snackbar v-model="snackbarNameError" timeout="3000">
      {{ snackbarNameErrorText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbarNameError = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

<!-- /timetable name -->
  

<!-- timetable structure -->
  
  <h3>Timetable Structure</h3>
  <br/>
  <template v-if="isValidStructure===false">
    <br/>
    <v-file-input accept=".csv" 
      label="Click here to upload a .csv file"
      outlined
      v-model="chosenFile">
    </v-file-input>
    <v-row>
    <v-spacer></v-spacer>
    <v-btn right @click="importFile">Read File</v-btn>
    </v-row>
     <v-snackbar v-model="snackbarStructureError" timeout="5000">
      {{ snackbarStructureErrorText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbarStructureError = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </template>

  <template v-if="isValidStructure===true">

      <v-alert type="success">Valid structure stored.</v-alert>
      <v-data-table
        :headers="displayHeaders"
        :items="displayStructure"
        :items-per-page="5"
        class="elevation-1">
      </v-data-table>
      <br/>
      <v-row>
      <v-spacer></v-spacer>
      <v-btn cancel @click="cancelStructure">Cancel</v-btn>
      </v-row>
    
  </template>

  <!-- /timetable structure -->
  
  <!-- block colours -->
  <br/>
  <h3>Block Colours</h3>
  <br/>
  <template v-if="!isBlocks">
    <v-alert type="warning">No blocks stored in timetable structure. Update if necessary.</v-alert>
  </template>
  <template v-if="isBlocks">
  <br/>
  <v-alert type="info">Click on a colour and click block to change.</v-alert>
  <br/>
  <v-row>
  <v-col>
    <template v-for="(item,i) in blockColor">
      <v-btn :color="item.color" @click="changeBlockColor(i)">
        <span style="width:100px;">{{item.block}}</span>
    </v-btn>
    <br/>
    </template>
  </v-col>
  <v-col><v-color-picker v-model="color" hide-mode-switch mode="hexa"></v-color-picker></v-col>
  </v-row>
    <v-alert v-if="isBlocksValidated" type="success">Block colours validated and stored.</v-alert>

  <v-row>
      <v-spacer></v-spacer>
      <v-btn right @click="storeColor">Store</v-btn>
  </v-row>
  </template>
  
<!-- /block colours -->


<!-- timetable years -->
  
  <h3>Timetable Years</h3>
  <br/>
  <v-alert type="info">Adjust School Year Codes to reflect your year structure. (2 characters max).</v-alert>
  <br/>
  <template v-for="(item,i) in timetableYears">
    <v-row>
    <v-col>
       <v-text-field
      v-model="timetableYears[i].NCYear"
      label="NC Year Code"
      outlined
      readonly>
    </v-text-field>
    </v-col>
    <v-col>
    <v-text-field
      v-model="timetableYears[i].SchoolCode"
      label="School Year Code"
      :rules="timetableYearCodeRules"
      counter="2"
      outlined>
    </v-text-field>
    </v-col>
    <br/>
    </v-row>
  </template>
  <v-alert v-if="isTimetableYearsValid" type="success">School Year Codes validated and stored.</v-alert>
  <v-row>
      <v-spacer></v-spacer>
      <v-btn right @click="storeYears">Store</v-btn>
  </v-row>
  <v-snackbar v-model="snackbarYearsError" timeout="3000">
      {{ snackbarYearsErrorText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbarYearsError = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
   

<!-- /timetable years-->



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
        dialog: false,
        timetableName:'',
        timetableNameRules:[v => v.length <= 25 && v.length>0 || 'Non-blank, max 25 characters'],
        chosenFile:null,
        data:null,
        headers:null,
        isValidStructure:false,
        displayHeaders:null,
        displayStructure:null,
        snackbarStructureError:false,
        snackbarStructureErrorText:'Invalid Timetable Structure. Upload another file.',
        snackbarNameError:false,
        snackbarNameErrorText:'Invalid Timetable Name. No spaces, 25 characters or less.',
        
        isBlocks:false,
        color:null,
        blockColor:[],
        isBlocksValidated:false,

        timetableYears:[],
        timetableYearCodeRules:[v => v.length <= 3 || 'Non-blank, max 2 characters'],
        snackbarYearsError:false,
        snackbarYearsErrorText:'Invalid Timetable Years. No spaces, 1-2 characters.',
        isTimetableYearsValid:false,
        
        
      }
  },
  created() {
    this.$store.commit('initialiseStore');
    this.timetableName=this.$store.state.timetableName;
    this.blockColor=this.$store.state.timetableBlocks;
    this.createStructureDisplay(this.$store.state.timetableStructure);
    if(this.blockColor.length>0 && this.isValidStructure) this.isBlocks=true;

    this.timetableYears=settings.schoolYears;

  },
  methods: {
    closeDialog() {
      this.dialog=false;
    },
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
            this.createStructureDisplay(response);
            this.storeStructure(response);
          } else {
            this.snackbarStructureError=true;
          }      
        }
      } 
    },
    createStructureDisplay(structure) {
      this.displayHeaders=[];
      for(let item of structure.displayHeaders) this.displayHeaders.push({text:item,value:item,sortable:true});
      this.displayStructure=structure.data;
      this.isValidStructure=true;

      //console.log(typeof(this.displayStructure));
    },
    storeStructure(structure) {
        console.log(structure);
        if(structure.blocks.length>1) {
          this.blockColor=[];
          for(let item of structure.blocks) this.blockColor.push({block:item,color:'#eeeeee'});
          this.isBlocks=true;
        }
        this.$store.commit('setTimetableStructure',structure);
    },
    cancelStructure() {
        this.isValidStructure=false;
        this.isBlocks=false;
    },
    storeName() {
      let txt=(' '+this.timetableName).trim();
      if(txt.length>0 && txt.length<=25) {
        txt=txt.replace(/ /g, "");
        this.$store.commit('setTimetableName',txt);
        this.timetableName=txt;
      } else {
        this.snackbarNameError=true;
      }
    },
    changeBlockColor(index) {
      console.log(index,this.color.hex);
      this.blockColor[index].color=this.color.hex;
    },
    storeColor() {
      this.isBlocksValidated=true;
      this.$store.commit('setTimetableBlockColor',this.blockColor);
    },
    storeYears() {
      console.log('**',this.timetableYears);
      let isValid=settings.checkValidYears(this.timetableYears);
      
      if(isValid) {
        this.isTimetableYearsValid=true;
        this.$store.commit('setTimetableYears',this.timetableYears);
      } else this.snackbarYearsError=true;
    }
  }

}
</script>