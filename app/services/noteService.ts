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
  apiKey: "AIzaSyBIVKzHquJd8BisVbIpBg9ens3qVQxsyd8",
  authDomain: "ecowiser-notepad.firebaseapp.com",
  projectId: "ecowiser-notepad",
  storageBucket: "ecowiser-notepad.firebasestorage.app",
  messagingSenderId: "599158945839",
  appId: "1:599158945839:web:f3fc403615e35d6ba52eda",
  measurementId: "G-SY5HNK7KYJ",
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
