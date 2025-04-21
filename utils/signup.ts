import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

export async function signUpWithEmail(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Missing email or password");
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    createdAt: new Date(),
    gender: "male", 
    skinTone: "#fff", 
    selectedOutfit: {
      top: {
        type: "Shirt",
        size: "M",
        color: "#00c0b0",
      },
      bottom: {
        type: "Pant",
        size: "M",
        color: "#00c0b0",
      },
    },
  });

  return user;
}
