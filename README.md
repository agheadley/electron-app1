# electron-forge app vue/node/express/parcel boiler plate
https://www.electronforge.io/

```
npx create-electron-app my-app
```


## key ideas for the boilerplate

- follow by main process (index.js) requiring express server (port:3000)
- in dev, parcel creates server port:1234 for testing.
- in build, create a dist.html file in src/ (and adjust paths of css/js to dist/ file paths)
- change index.js to look for app as local file dist.hrml instead of localhost:1234




## electron/express

https://stackoverflow.com/questions/53346562/how-to-use-electron-with-an-existing-express-application

```
npm install --save express body-parser path

require('./app.js') // index.js         
```

app.js
```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World! xxx'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```


## parcel/vue

```
npm install --save parcel-bundler vue vue-router
```


package.json - build and run commands in "scripts":
```
    "dev": "parcel src/main.html",
    "build": "parcel build src/main.html -d dist --public-url ./"   //public-url corrects js/css path
```
*https://github.com/parcel-bundler/parcel/issues/323*
Dev:
- npm run dev
- index.js  
    ```
    //mainWindow.loadFile(path.join(__dirname, 'dist.html'));
    mainWindow.loadURL(`http://localhost:1234/`)
    ```

Build:
- npm run build
- index.js
    ```
    mainWindow.loadFile(path.join(__dirname, '../dist/main.html'));
    //mainWindow.loadURL(`http://localhost:1234/`)
    ```

## create executables

npm run package (creates out/ and contains executable)

(npm run make - to explore!)

## file structure

```
├── README.md
├── dist
├── node_modules
├── package.json
└── src
   ├── App.vue
   ├── app.js       (node/express)
   ├── components
   |  └── HelloWorld.vue
   ├── index.css
   ├── index.html    (test electron main)
   ├── index.js      (electron main process)
   ├── main.html     (route into vue app)
   ├── main.js       (start of vue app)
   ├── router.js
   ├── scripts
   |  └── request.js
   └── views
      ├── Home.vue
      └── Route1.vue
```

## file upload

- Text only, from FileReader javascript API

## file download 

- Express in app.js

## Vuetify

https://vuetifyjs.com/en/getting-started/quick-start/

```
npm install --save vuetify

src/plugins/vuetify.js :

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)


main.js additions :

import vuetify from './plugins/vuetify' // path to vuetify export

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  render: h => h(App)
})
```

main.html <head> :      // fonts and icons

<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">




<link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

## Vuex

npm install --save vuex

