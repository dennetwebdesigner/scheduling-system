import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, connectionDB } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { setStorage } from "@/data/commom";

export async function register(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      try {
        // await addDoc(collection(connectionDB, `services`), data);
        setDoc(doc(connectionDB, "users", user.uid), {}).then((data) =>
          console.log(data)
        );
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

export function login(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      setStorage({ key: "user", data: user.uid });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
