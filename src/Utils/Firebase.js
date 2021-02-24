import firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnuTJ5t_ybzEOoSW_LGeM3AkyL8hxUL9w",
  authDomain: "personal-finances-bd0ae.firebaseapp.com",
  projectId: "personal-finances-bd0ae",
  storageBucket: "personal-finances-bd0ae.appspot.com",
  messagingSenderId: "41009043099",
  appId: "1:41009043099:web:6376decb58592802bb983e",
};
// Initialize Firebase
export const firebaseapp = firebase.initializeApp(firebaseConfig);
