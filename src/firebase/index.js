import firebase from 'firebase';
import { apiKey, projectId, messagingSenderId } from '@/firebase/firebase.conf.json';

const config = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId: `${projectId}`,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId,
};

export default firebase.initializeApp(config);
