import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import "firebase/database";


const config = {
    apiKey: "AIzaSyDhAlJ2kH_ilvTb6FMrnnuRCDCw1MMP7dI",
    authDomain: "test-baucuatomca.firebaseapp.com",
    databaseURL: "https://test-baucuatomca-default-rtdb.firebaseio.com",
    projectId: "test-baucuatomca",
    storageBucket: "test-baucuatomca.appspot.com",
    messagingSenderId: "195498228780",
    appId: "1:195498228780:web:ee787e920bac5fe2786589",
    measurementId: "G-LWKL028W31"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
export const firestore = firebase.firestore();