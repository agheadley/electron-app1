<template>
  <v-row justify="center">
  <v-dialog v-model="dialog" scrollable max-width="70%">
  <template v-slot:activator="{ on, attrs }">
  <v-btn text color="indigo" v-bind="attrs" v-on="on">Export</v-btn>
  </template>
  <v-card>
  <v-card-title>Export Timetable</v-card-title>
  <v-divider></v-divider>
  <v-card-text>

  </v-card-text>
  <v-divider></v-divider>
  <v-card-actions>
  <v-btn color="indigo" text @click="dialog = false">Cancel</v-btn>
  <v-btn color="indigo" text @click="dialog = false">Save</v-btn>
  </v-card-actions>
  </v-card>
  </v-dialog>
  </v-row>
</template>


<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
      
    }
  }
</script>