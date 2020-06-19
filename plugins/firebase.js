import Vue from 'vue'
import * as firebase from 'firebase/app'

import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD7Ze1XIecNdIqUptZdfxmYDsY_nVBE6ds",
    authDomain: "bizprison-a9fc9.firebaseapp.com",
    databaseURL: "https://bizprison-a9fc9.firebaseio.com",
    projectId: "bizprison-a9fc9",
    storageBucket: "bizprison-a9fc9.appspot.com",
    messagingSenderId: "287851091041",
    appId: "1:287851091041:web:0f81f804cba83526ddc620"
  };

firebase.initializeApp(firebaseConfig);

export default function(app,inject){
    inject('firebase',firebase)
}