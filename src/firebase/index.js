 
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyCVBvDqesxP0S7-R853faGE5fhM8AOqcH8",
  authDomain: "badass-todo-8ea0b.firebaseapp.com",
  projectId: "badass-todo-8ea0b",
  storageBucket: "badass-todo-8ea0b.appspot.com",
  messagingSenderId: "1092979196276",
  appId: "1:1092979196276:web:f2d795fec891282ef72c21"
}

 
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
    db
}