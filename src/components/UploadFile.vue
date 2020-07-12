<template>
    <div>

<!-- https://codepen.io/scottorgan/pen/LYYgYga -->    
<v-main>
      <v-container fill-height>
        <v-row justify="center">
          <v-col cols="auto">
            <v-card width="600" height="300" raised>
              <v-card-title>Vuetify v-file-input Example:</v-card-title>
              <br>
              <v-card-text>
                <v-file-input
                  accept=".csv"
                  label="Click here to select a .csv file"
                  outlined
                  v-model="chosenFile"
                >
                </v-file-input>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn right @click="importTxt">Read File</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="auto">
            <v-card width="600" height="300" raised>
              <v-card-title>File contents:</v-card-title>
              <v-card-text><p>{{ data }}</p></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>


     </div>
</template>

<script>


export default {
name: 'UploadFile',
data() {
    return{
        chosenFile:null,
        data:null
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
      }
    }
}

}
</script>
