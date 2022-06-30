import { VuesticPlugin } from 'vuestic-ui';
import { createApp } from 'vue'
import { createGtm, VueGtmUseOptions } from 'vue-gtm'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import { i18n } from './translation';



const app = createApp(App)
app.use(store);
app.use(router);
if (process.env.VUE_APP_GTM_ENABLED === 'true') {
  const gtmConfig: VueGtmUseOptions = {
    id: process.env.VUE_APP_GTM_KEY ?? '',
    debug: false,
    vueRouter: router,
  }
  app.use(createGtm(gtmConfig))
}
app.use(i18n)
app.use(VuesticPlugin, vuesticGlobalConfig)
app.mount('#app')

