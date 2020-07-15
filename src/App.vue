<template>

<v-app>

  <v-app-bar app class="d-print-none">
<v-toolbar-title>TT version1</v-toolbar-title>

      <v-spacer></v-spacer>
     
      <template v-slot:extension>
        <v-tabs
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
          <v-list-item @click="()=>{}"> <v-list-item-title>DOWNLOAD</v-list-item-title></v-list-item>
          <v-list-item @click="()=>{}"> <v-list-item-title>UPLOAD</v-list-item-title></v-list-item>

          <v-list-item to="/settings" @click="()=>{}"> <v-list-item-title>SETTINGS</v-list-item-title></v-list-item>
          <v-list-item @click="print"> <v-list-item-title>PRINT</v-list-item-title></v-list-item>
          <v-list-item @click="quit"> <v-list-item-title>QUIT</v-list-item-title></v-list-item>
          
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
  <v-btn icon @click="print">
    <v-icon>mdi-printer</v-icon>
  </v-btn>


  </v-footer>
</v-app>

</template>


<script>


export default {
  name: 'App',
  data() {
    return {
      tabs:null
    }
  },
  methods: {
    quit() {
      fetch('http://localhost:3000/quit', {
        credentials: 'omit'
      });
    },
    print() {
      console.log('print');

      window.print();
    }    
  }  
}
</script>
