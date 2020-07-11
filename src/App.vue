<template>
<v-app>
  <!--
  <v-navigation-drawer app>
     </v-navigation-drawer>
  -->
  <v-app-bar flat app>
    
 <!--<v-app-bar>-->
      <!--<v-app-bar-nav-icon></v-app-bar-nav-icon>-->

      <v-toolbar-title>TT version1</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn to="/" text color="primary">MASTER</v-btn>
      <v-btn to="/route1" text color="error">BLOCK</v-btn>
      <v-btn text disabled>STAFF</v-btn>
      <v-btn text disabled>ROOM</v-btn>
      
      
      

      <!--
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>  -->

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    <!--</v-app-bar>-->





  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
          <v-toolbar-title>AGH</v-toolbar-title>

      <v-spacer></v-spacer>

    <v-btn icon>
        <v-icon>mdi-printer</v-icon>
      </v-btn>

  </v-footer>
</v-app>
</template>