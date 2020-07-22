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
    :rules="nameRules"
    counter="25"
    @input="checkName">
  </v-text-field>
  <br/>
  <!--
  <v-row>
      <v-spacer></v-spacer>
      <v-btn right @click="storeName">Store</v-btn>
  </v-row>
  -->
  <v-snackbar v-model="snackbarName" timeout="3000">
    Valid name required, before being stored.
    <template v-slot:action="{ attrs }">
    <v-btn color="red" text v-bind="attrs" @click="snackbarName = false">Close</v-btn>
    </template>
  </v-snackbar>

  

<!-- /timetable name -->
  

<!-- timetable structure -->
  
  <h3>Week Structure</h3>
  <br/>
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
   
<!-- /timetable years-->

<!-- subject -->
  
  <h3>Subject/Departments</h3>
  <br/>
   
<!-- /subjects-->

<!-- rooms -->
  
  <h3>Rooms/Departments</h3>
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

        settings:null,

        nameRules:[v => v.length <= 25 && v.length>0 || 'Non-blank, max 25 characters'],
        snackbarName:false,
        
        isBlocks:false,
        color:null,
      }
  },
  created() {
    //get copy of $store.state.settings
    this.settings=JSON.parse(JSON.stringify(this.$store.state.settings));
    // populate blocks
    if(this.settings.blocks.length>0) this.isBlocks=true;
  },
  methods: {
    openDialog() {
      this.dialog=true;
      console.log(this.settings.blocks);
    },
    closeDialog() {
      this.dialog=false;
    },
    checkName() {
      console.log('components/SettingsDialog.vue/chekName()');
      let txt=this.settings.name.replace(/ /g, "");
      if(txt.length>0 && txt.length<25) this.$store.commit('setName',txt);
      else this.snackbarName=true;  
    },
    checkBlockColor(index) {
      this.settings.blocks[index].color=this.color.hex;
      console.log(this.color.hex,this.settings.blocks[index]);
      this.$store.commit('setBlockColor',this.settings.blocks);
    },
    
  }

}
</script>