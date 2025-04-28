  // Mengimpor modul Firebase yang dibutuhkan
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Konfigurasi Firebase yang diberikan oleh Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCksetmQe_ec2BH6g5MKqQU_1K1U6htmww",
  authDomain: "data-7d32f.firebaseapp.com",
  projectId: "data-7d32f",
  storageBucket: "data-7d32f.appspot.com",
  messagingSenderId: "156748846014",
  appId: "1:156748846014:web:4269883b14bdb400b2dfef",
  measurementId: "G-W3SBB85TF1"
};


// Inisialisasi aplikasi Firebase menggunakan konfigurasi di atas
const app = initializeApp(firebaseConfig);

// Mendapatkan referensi ke Firestore
const db = getFirestore(app);


// Fungsi untuk mengambil semua tugas dari koleksi "senin" dan mengurutkannya berdasarkan nama tugas
export async function ambildaftartugas() {
  // Mendapatkan referensi ke koleksi "senin"
  const refDokumen = collection(db, "senin");
  
  // Membuat query untuk mengurutkan dokumen berdasarkan field "tugas"
  const kueri = query(refDokumen, orderBy("tugas"));
  
  // Mengambil dokumen sesuai query
  const cuplikankueri = await getDocs(kueri);

  let hasil = [];
  
  // Mengonversi hasil query menjadi array tugas
  cuplikankueri.forEach((dok) => {
    hasil.push({
      id: dok.id, // ID dokumen
      tugas: dok.data().tugas, // Data tugas
      status: dok.data().status, // Status tugas
      prioritas: dok.data().prioritas, // Prioritas tugas
      tanggal: dok.data().tanggal, // Tanggal tugas
    });
  });

  // Mengembalikan hasil sebagai array
  return hasil;
}