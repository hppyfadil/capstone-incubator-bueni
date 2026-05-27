// script.js
import { db } from './firebase-config.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Mengambil elemen HTML tempat data akan ditampilkan
const tempDisplay = document.getElementById('temp-value');
const powerDisplay = document.getElementById('power-value');

// --- BAGIAN YANG DIGANTI ---
// Ubah dari '/' menjadi 'monitoring' agar web membaca data dari dalam folder tersebut
const sensorRef = ref(db, 'monitoring'); 
// ---------------------------

onValue(sensorRef, (snapshot) => {
  const data = snapshot.val();
  
  if (data) {
    // Karena sensorRef sudah masuk ke folder 'monitoring', 
    // variabel 'data' langsung berisi { temp: ..., power: ... }
    tempDisplay.innerText = data.temp !== undefined ? data.temp + " °C" : "-- °C";
    powerDisplay.innerText = data.power !== undefined ? data.power + " W" : "-- W";
  } else {
    console.log("Data di folder 'monitoring' tidak ditemukan");
  }
});