import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxdasPWGQy17nZEUVcjk0sD2ivhAD1I3w",
  authDomain: "codenight-dev-challenges.firebaseapp.com",
  projectId: "codenight-dev-challenges",
  storageBucket: "codenight-dev-challenges.appspot.com",
  messagingSenderId: "288465614232",
  appId: "1:288465614232:web:9e53c659515801d60467ed",
  measurementId: "G-YQ3DPD3WFC",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const loginWithGitHub = () => {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
};

auth.onAuthStateChanged((user) => {
  if (!user) {
    return;
  }

  const usersRef = collection(db, "users");
  const userRef = doc(usersRef, user.uid);

  setDoc(userRef, {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });
});

// function getCurrentUser(): User | null {
//   if (!auth.currentUser) {
//     return null;
//   }
// }
