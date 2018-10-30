import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBz9MqHrEh6L_JfowxiohQopK_QInvj0zo",
    authDomain: "schedule-of-classes-8b222.firebaseapp.com",
    databaseURL: "https://schedule-of-classes-8b222.firebaseio.com",
    projectId: "schedule-of-classes-8b222",
    storageBucket: "schedule-of-classes-8b222.appspot.com",
    messagingSenderId: "146759229029"
};

export default firebase.initializeApp(config);