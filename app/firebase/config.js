
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCH7iu11i09ELkBBTvDo8RC3hvwyB6T6ns",
  authDomain: "fir-90445.firebaseapp.com",
  databaseURL: "https://fir-90445-default-rtdb.firebaseio.com/",
  projectId: "fir-90445",
  storageBucket: "fir-90445.firebasestorage.app",
  messagingSenderId: "45156778221",
  appId: "1:45156778221:web:19ce7ce4121edca11d4ce4",
  measurementId: "G-6Y619LEWCG"
};


export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app);
export const database = getDatabase(app);


