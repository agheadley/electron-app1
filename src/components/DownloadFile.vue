<template>
    <div>
        <p>DownloadFile.vue component</p>
       
        <template v-if="isDownloaded===false">
        <p>download file : </p>
        <a @click="removeFile" v-bind:href="fileData" v-bind:download="fileName">{{fileName}}</a>
        </template>
    
        <template v-if="isDownloaded===true">File downloaded.</template>
    

<v-content>
      <v-container fill-height>
        <v-row justify="center">
          <v-col cols="auto">
            <v-card width="600" height="300" raised>
              <v-card-title>Vuetify v-file-input Example:</v-card-title>
              <br>
              <v-card-text>
                <v-file-input
                  accept=".txt"
                  label="Click here to select a .txt file"
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
    </v-content>


    </div>
</template>

<script>

//https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server


export default {
name: 'DownloadFile',
data() {
    return{
        fileData:'data:text/plain;charset=utf-8,',
        isDownloaded:false,
        chosenFile: null, // <- initialize the v-model prop
        data: null
    }
},
props: {
    fileContent:String,
    fileName:String
},
created() {
    //this.fileContent+=encodeURIComponent(this.content);
    this.fileData+=this.fileContent;
    console.log(this.fileContent);
},
methods: {
    removeFile() {
        this.isDownloaded=true;
    },
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


<style scoped>
    
</style>