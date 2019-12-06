import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyDNoGBSjEXF0MiV4jNp-d3W44ffvjho74U",
    authDomain: "glxsoph.firebaseapp.com",
    databaseURL: "https://glxsoph.firebaseio.com",
    projectId: "glxsoph",
    storageBucket: "glxsoph.appspot.com",
    messagingSenderId: "993541111453",
    appId: "1:993541111453:web:d25a76824b292cf05c5e74",
    measurementId: "G-D1GH6DT4MX"
};
let app = Firebase.initializeApp(config);
export const db = app.database();