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

//Fungsi untuk mengambil semua tugas dari koleksi "senin" dan mengurutkannya berdasarkan nama tugas
export async function ambildaftartugas() {
  const refDokumen = collection(db, "senin");
  const kueri = query(refDokumen, orderBy("tugas"));
  const cuplikankueri = await getDocs(kueri);

  let hasil = [];
  cuplikankueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      tugas: dok.data().tugas,
      status: dok.data().status,
      prioritas: dok.data().prioritas,
      tanggal: dok.data().tanggal,
    });
  });

  return hasil;
}

//fungsi untuk menambahkan tugas
export async function tambahtugas(tugas, status, prioritas, tanggal) {
  try {
    const dokRef = await addDoc(collection(db, 'senin'), {
      tugas: tugas,
      status: status,
      prioritas: prioritas,
      tanggal: tanggal,
    });
    console.log('berhasil menembah tugas ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah tugas ' + e);
  }
}

// mengahapus tugas
export async function hapustugas(docId) {
  await deleteDoc(doc(db, "senin", docId));
}

export async function ubahtugas(docId, tugas, status, prioritas, tanggal) {
  await updateDoc(doc(db, "senin", docId), {
    tugas: tugas,
    status: status,
    prioritas: prioritas,
    tanggal: tanggal,
  });
}


// ubah tugas
export async function ubah(docId, tugas, status, prioritas, tanggal) {
  await updateDoc(doc(db, "senin", docId), {
    tugas: tugas,
    status: status,
    prioritas: prioritas,
    tanggal: tanggal,
  });
}

export async function ambiltugas(docId) {
  const docRef = await doc(db, "senin", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}


// Ubah status tugas saja
export async function ubahstatus(docId, statusBaru) {
  await updateDoc(doc(db, "senin", docId), {
    status: statusBaru,
  });
}

// Fungsi ubah status tombol di tampilan
export function ubahStatus(tombol) {
  let status = tombol.dataset.status;

  if (status === "Selesai") {
    tombol.textContent = "Belum Selesai";
    tombol.dataset.status = "Belum Selesai";
  } else {
    tombol.textContent = "Selesai";
    tombol.dataset.status = "Selesai";
  }
}

// EVENT: Klik tombol status
$(document).on("click", ".btn-status", async function () {
  let tugasId = $(this).attr("data-id");
  let statusSekarang = $(this).attr("data-status");
  let statusBaru;

  if (statusSekarang === "Belum Selesai") {
    statusBaru = "Sedang Dikerjakan";
  } else if (statusSekarang === "Sedang Dikerjakan") {
    statusBaru = "Selesai";
  } else {
    statusBaru = "Belum Selesai";
  }

  // Update tampilan tombol
  $(this).attr("data-status", statusBaru);
  $(this).text(statusBaru);
  updateWarnaStatus($(this), statusBaru);

  // Update database
  await ubahstatus(tugasId, statusBaru);

  console.log(`Status tugas ID ${tugasId} diubah menjadi ${statusBaru}`);
});

// Fungsi update warna tombol berdasarkan status
function updateWarnaStatus(button, status) {
  if (status === "Belum Selesai") {
    button.css("background-color", "#dc3545").css("color", "white");
  } else if (status === "Sedang Dikerjakan") {
    button.css("background-color", "#ffc107").css("color", "black");
  } else {
    button.css("background-color", "#28a745").css("color", "white");
  }
}

// Atur warna saat halaman dimuat
$(document).ready(function () {
  $(".btn-status").each(function () {
    updateWarnaStatus($(this), $(this).attr("data-status"));
  });
});


