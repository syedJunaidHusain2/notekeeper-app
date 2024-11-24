import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const notesCollection = collection(db, "notes");

export async function fetchNotes(): Promise<Note[]> {
  const snapshot = await getDocs(notesCollection);
  const notes: Note[] = [];
  snapshot.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() } as Note);
  });
  return notes;
}

export async function saveNote(note: Note): Promise<Note[]> {
  if (note.id) {
    const noteDoc = doc(db, "notes", note.id);
    await updateDoc(noteDoc, {
      title: note.title,
      tagline: note.tagline,
      body: note.body,
      choosenColor: note.choosenColor,
      pinned: note.pinned,
      
    });
  } else {
    await addDoc(notesCollection, {
      title: note.title,
      tagline: note.tagline,
      body: note.body,
      choosenColor: "#ffffff",
      pinned: false,
    });
  }
  return await fetchNotes();
}

export async function deleteNote(noteId: string): Promise<Note[]> {
  const noteDoc = doc(db, "notes", noteId);
  await deleteDoc(noteDoc);
  return await fetchNotes();
}
