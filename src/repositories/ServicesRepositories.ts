import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { connectionDB } from "@/config/firebase";
import servicesDTO from "@/services/services/servicesDTO";
import { getStorage } from "@/data/commom";

export async function storeServices(data: servicesDTO): Promise<string | void> {
  try {
    const user = getStorage({ key: "user" });
    // await addDoc(collection(connectionDB, `services`), data);
    await setDoc(doc(connectionDB, "users", user, "services", data.name), data);
    return `O Serviço/Produto ${data.name} foi cadastrado com sucesso!`;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function findServicesBy(id: string) {
  const user = getStorage({ key: "user" });

  const snap = await getDoc(doc(connectionDB, "users", user, `services`, id));
  return snap.data();
}

export async function findAllServicesByUser() {
  const user = getStorage({ key: "user" });
  const querySnapshot = await getDocs(
    collection(connectionDB, "users", user, `services`)
  );
  let data: any[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
}

export async function findAllServices() {
  const user = getStorage({ key: "user" });
  const querySnapshot = await getDocs(
    collection(connectionDB, "users", user, `services`)
  );
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}
