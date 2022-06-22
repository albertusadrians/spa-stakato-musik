import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

// Import Tambahan
import '@fortawesome/fontawesome-free/css/all.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';


Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'fa' || 'md',
    },
    theme: {
        themes: {
            light: {
                background: '#f4f5fe',
            }
        },
        options: {
            customProperties: true
        },
    },
})
