<template>

<v-app>

  <v-app-bar app class="d-print-none">
<v-toolbar-title>TT version1</v-toolbar-title>

      <v-spacer></v-spacer>
     
      <template v-slot:extension>
        <v-tabs color="indigo"
          v-model="tabs"
        >
          <v-tab href="#" to="/">master</v-tab>
          <v-tab href="#" to="/block">block</v-tab>
          <v-tab href="#" to="/staff" >staff</v-tab>
          <v-tab href="#" to="/room" >room</v-tab>
          
          <v-tabs-slider color="red"></v-tabs-slider>
        </v-tabs>
      </template>

 <v-spacer></v-spacer>
 <v-menu left bottom >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
            <v-list-item><download-dialog></download-dialog></v-list-item>
           <v-list-item><export-dialog></export-dialog></v-list-item>
          
          <v-list-item><import-dialog></import-dialog></v-list-item>
          <v-list-item><v-row justify="center"><v-btn text color="indigo" @click="print">PRINT</v-btn></v-row></v-list-item>
          <v-list-item><exit-dialog></exit-dialog></v-list-item>
          
          
        </v-list>
      </v-menu>
  

  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>

    
    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>

  </v-main>

  <v-footer app class="d-print-none">
    
 <v-toolbar-title>AGH</v-toolbar-title>
 <v-spacer></v-spacer>
 
 <v-item-group>
   <v-row>
     <v-col>
       <settings-dialog></settings-dialog>
     </v-col>
     <v-col>
  <v-btn icon @click="print">
    <v-icon>mdi-printer</v-icon>
  </v-btn>
     </v-col>
  </v-row>
 </v-item-group>
  </v-footer>
</v-app>

</template>


<script>

import SettingsDialog from './components/SettingsDialog.vue'
import ExitDialog from './components/ExitDialog.vue'
import ImportDialog from './components/ImportDialog.vue'
import ExportDialog from './components/ExportDialog.vue'
import DownloadDialog from './components/DownloadDialog.vue'

export default {
  name: 'App',
  components: {
    'settings-dialog':SettingsDialog,
    'exit-dialog':ExitDialog,
    'import-dialog':ImportDialog,
    'export-dialog':ExportDialog,
    'download-dialog':DownloadDialog,
    
    
  },
  data() {
    return {
      tabs:null,
    }
  },
  created() {
    this.$store.commit('openSettings');
  },
  methods: {
    /* accessed via exit dialog now
    quit() {
      fetch('http://localhost:3000/quit', {
        credentials: 'omit'
      });
    },
    */
    print() {
      console.log('print');
      window.print();
    },    
  }  
}
</script>
