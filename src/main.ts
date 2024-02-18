import '@/assets/sass/main.sass'

import { createApp } from 'vue'
import App from './App.vue'

import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/ru'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

const app = createApp(App)
app.use(Quasar, {
  plugins: {},
  lang: quasarLang
})

app.mount('#app')
