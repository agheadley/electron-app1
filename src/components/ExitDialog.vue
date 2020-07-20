<template>
  <v-row justify="center">
  <v-dialog v-model="dialog" scrollable max-width="70%">
  <template v-slot:activator="{ on, attrs }">
  <v-btn text outlined color="indigo" v-bind="attrs" v-on="on">Exit</v-btn>
  </template>
  <v-card>
  <v-card-title>Exit the application?</v-card-title>
  <v-divider></v-divider>
  <v-card-text style="height: 300px;">

  </v-card-text>
  <v-divider></v-divider>
  <v-card-actions>
  <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
  <v-btn color="blue darken-1" text @click="quit">Quit</v-btn>
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
        quit() {
        this.dialog=false;
        fetch('http://localhost:3000/quit', {
            credentials: 'omit'
        });
        },
    }
  }
</script>