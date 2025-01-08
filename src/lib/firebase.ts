import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALDsg_3p5kuZ1vxk2YGs4dOBIoEkOrqzU",
  authDomain: "couplespace-b6b73.firebaseapp.com",
  projectId: "couplespace-b6b73",
  storageBucket: "couplespace-b6b73.firebasestorage.app",
  messagingSenderId: "904075449484",
  appId: "1:904075449484:web:7898669818d7451a7257a9",
  measurementId: "G-WG7WLXP570",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytesResumable, getDownloadURL };
