<template>

<v-row justify="center">
  <!--
  <template v-slot:activator="{ on, attrs }">
  <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-cog</v-icon></v-btn>
</template>-->
<v-btn icon @click="openDialog"><v-icon>mdi-cog</v-icon></v-btn>
<v-dialog v-model="dialog" scrollable max-width="70%">    
  <v-card>
    <v-card-title>Settings</v-card-title>
  <v-card-text>
  <br/>

<!-- timetable name -->
  
  <h3>Name</h3>
  <br/>
  <v-text-field
    v-model="settings.name"
    label="Timetable Name"
    description="Name of current timetable model"
    outlined
    :rules="[rules.name]"
    maxlength="25"
    counter
    @input="removeInvalidName">
  </v-text-field>
  <br/>
  

<!-- /timetable name -->
  

<!-- timetable structure -->
  
  <h3>Lesson Structure</h3>
  <br/>
  <template v-if="isLessons">
  <v-data-table
    :headers="lessonHeaders"
    :items="settings.lessons"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  <br/>
  <v-row>
      <v-spacer></v-spacer>
      <v-btn cancel @click="isLessons=false">Change</v-btn>
  </v-row>
  </template>
  <template v-if="!isLessons">
  <v-alert type="info">Update lesson structure.</v-alert>
  <v-file-input accept=".csv" 
      label="Click here to upload a .csv file"
      outlined
      v-model="chosenFile">
  </v-file-input>
  <v-row>
  <v-spacer></v-spacer>
  <v-btn right @click="isLessons=true">Cancel</v-btn>
  <v-btn right @click="importFile('Lessons')">Upload</v-btn>
  
  </v-row>
  </template>
    
    
  <!-- /timetable structure -->
  
  <!-- block colours -->
  <h3>Block Colours</h3>
  <br/>
  
  <template v-if="!isBlocks">
    <v-alert type="warning">No blocks stored in timetable structure. Update if necessary.</v-alert>
  </template>
  
  <template v-if="isBlocks">
  <br/>
  <v-alert type="info">Choose on a colour and then select block to change.</v-alert>
  <br/>
  
  <v-row>
  <v-col>
    <template v-for="(item,i) in this.settings.blocks">
      <v-btn :color="item.color" @click="checkBlockColor(i)">
        <span style="width:100px;">{{item.block}}</span>
    </v-btn>

    <br/>
    </template>
  </v-col>
  <v-col><v-color-picker v-model="color" hide-mode-switch mode="hexa"></v-color-picker></v-col>
  </v-row>
  
<!-- /block colours -->


<!-- timetable years -->
  
  <h3>Year Structure</h3>
  <br/>
  <v-alert type="info">Edit 'Year Codes'</v-alert>
  <br/>
  <template v-for="(item,i) in settings.years">
    <v-text-field
      v-model="settings.years[i]"
      :rules="[rules.year]"
      label="Year Code"
      counter
      maxlength="2"
      @input="removeInvalidYear(i)">
    </v-text-field>

  </template> 

  <v-btn @click="addYear" class="mx-2" fab dark small color="success">
      <v-icon dark>mdi-plus</v-icon>
  </v-btn>  
  <br/>
  <br/>
  <br/>
<!-- /timetable years-->

<!-- subject -->
  
  <h3>Subject/Departments</h3>
  <br/>
  <template v-if="isSubjects">
  <v-data-table
    :headers="subjectHeaders"
    :items="settings.subjects"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  <br/>
  <v-row>
      <v-spacer></v-spacer>
      <v-btn cancel @click="isSubjects=false">Change</v-btn>
  </v-row>
  </template>
  <template v-if="!isSubjects">
  <v-alert type="info">Update subject list.</v-alert>
  <v-file-input accept=".csv" 
      label="Click here to upload a .csv file"
      outlined
      v-model="chosenFile">
  </v-file-input>
  <v-row>
  <v-spacer></v-spacer>
  <v-btn right @click="isSubjects=true">Cancel</v-btn>
  <v-btn right @click="importFile('Subjects')">Upload</v-btn>
  
  </v-row>
  </template>
  
   
<!-- /subjects-->

<!-- rooms -->
  
  <h3>Rooms/Departments</h3>
  <br/>
  <template v-if="isRooms">
  <v-data-table
    :headers="roomHeaders"
    :items="settings.rooms"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  <br/>
  <v-row>
      <v-spacer></v-spacer>
      <v-btn cancel @click="isRooms=false">Change</v-btn>
  </v-row>
  </template>
  <template v-if="!isRooms">
  <v-alert type="info">Update room list.</v-alert>
  <v-file-input accept=".csv" 
      label="Click here to upload a .csv file"
      outlined
      v-model="chosenFile">
  </v-file-input>
  <v-row>
  <v-spacer></v-spacer>
  <v-btn right @click="isRooms=true">Cancel</v-btn>
  <v-btn right @click="importFile('Rooms')">Upload</v-btn>
  
  </v-row>
  </template>
  
   
<!-- /rooms-->



<v-snackbar v-model="snackbar" timeout="5000">
    {{snackbarMessage}}
    <template v-slot:action="{ attrs }">
    <v-btn color="red" text v-bind="attrs" @click="snackbar= false">Close</v-btn>
    </template>
</v-snackbar>

  

</v-card-text>
<v-card-actions>
<v-btn color="indigo" text @click="closeDialog">Save</v-btn>
<v-btn color="indigo" text @click="resetAll">Reset</v-btn>
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
        snackbar:false,
        snackbarMessage:null,

        settings:null,

        chosenFile:null,

        rules: {
          year: value => !!value && value.length <= 2 || 'Max 2 characters',
          name: value => !!value && value.length <= 25 || 'Max 25 characters',
        },
        
        isBlocks:false,
        color:null,
        
        isLessons:true,
        isSubjects:true,
        isRooms:true,

        lessonHeaders:[],
        subjectHeaders:[],
        roomHeaders:[],

  

      }
  },
  created() {
    //get copy of $store.state.settings
    this.settings=JSON.parse(JSON.stringify(this.$store.state.settings));
  
    if(this.settings.blocks.length>0) this.isBlocks=true;

    let keys=Object.keys(this.settings.lessons[0]);
    this.lessonHeaders=keys.map(el=>({text:el,align:"start",sortable:true,value:el}));
    console.log(this.lessonHeaders,this.settings.lessons);

    keys=Object.keys(this.settings.subjects[0]);
    this.subjectHeaders=keys.map(el=>({text:el,align:"start",sortable:true,value:el}));

    keys=Object.keys(this.settings.rooms[0]);
    this.roomHeaders=keys.map(el=>({text:el,align:"start",sortable:true,value:el}));
    

  },
  methods: {
    openDialog() {
      this.dialog=true;
      console.log(this.settings.blocks);
    },
    resetAll() {
      this.$store.commit('resetSettings');
      this.settings=JSON.parse(JSON.stringify(this.$store.state.settings));
      // populate blocks
      if(this.settings.blocks.length>0) this.isBlocks=true;
    },
    closeDialog() {
      this.$store.commit('saveSettings',this.settings);
      this.dialog=false;
    },
    removeInvalidName() {
      this.settings.name=this.settings.name.replace(/[^A-Za-z0-9-]/, "");
    },
    removeInvalidYear(i) {
      this.settings.years[i]=this.settings.years[i].replace(/[^A-Za-z0-9-]/, "");
    },
    addYear() {
      this.settings.years.push('X');
    },
    checkBlockColor(index) {
      this.settings.blocks[index].color=this.color.hex;
    },
    checkLessons(data) {
      console.log('SettingsDialog.vue : checkLessons()');
      this.settings.lessons=data;
      //let blocks=data.map(el=>el.block);
      let  blocks=[...new Set(data.map(el=>el.block).filter(el=>el!==""))];
      this.settings.blocks=blocks.sort().map(el=>({block:el,color:settings.initialSettings.blocks[0].color}));
      //let weeks=data.map(el=>el.week);
      let weeks=[...new Set(data.map(el=>el.week).filter(el=>el!==""))];
      this.settings.weeks=weeks.sort().map((el,index)=>({name:el,id:index}));
      
      
      console.log(blocks);
      this.isLessons=true;

    },
    checkSubjects(data) {
      console.log('SettingsDialog.vue : checkSubjects()');
      this.settings.subjects=data;
      this.isSubjects=true;
    },
    checkRooms(data) {
      console.log('SettingsDialog.vue : checkRooms()');
      this.settings.rooms=data;
      this.isRooms=true;
    },
    importFile(type) {
      console.log('importing : ',type);
      if (this.chosenFile) { 
        let reader = new FileReader();
        reader.readAsText(this.chosenFile);
        reader.onload = () => {
          this.data = reader.result;
          console.log(this.data);
          let response=null;
          let error=false;

          if(type==='Lessons') {
            response=settings.readTimetableStructure(reader.result);
            if(response!=='error') this.checkLessons(response);
            else error=true;
          }
          if(type==='Subjects') {
            response=settings.readSubjects(reader.result);
            if(response!=='error') this.checkSubjects(response);
            else error=true;
          }
          if(type==='Rooms') {
            response=settings.readRooms(reader.result);
            if(response!=='error') this.checkRooms(response);
            else error=true;
          }
          if(error) {
            this.snackbarMessage="Invalid "+type+" .csv file. Please cancel / upload a valid file.";
              this.snackbar=true;
          } else {
            this.chosenFile=null;
          }
          
        }
      }
    },
    
  }

}
</script>