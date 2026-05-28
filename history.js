// history.js
import { db } from './firebase-config.js';
import { ref, onValue, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const tableBody = document.getElementById('table-body');
const btnDownload = document.getElementById('btn-download');

// Referensi ke path riwayat data di Firebase
const historyRef = ref(db, 'monitoring_history');

// Menampilkan data ke dalam Tabel secara Real-time
onValue(historyRef, (snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        tableBody.innerHTML = ""; // Bersihkan teks "Memuat data..."

        // Looping untuk membalik urutan data (yang terbaru di atas)
        const keys = Object.keys(data).reverse(); 

        keys.forEach(key => {
            let row = data[key];
            let tr = document.createElement('tr');
            
            // Asumsi ESP32 mengirim: temp, power, dan timestamp
            let waktu = row.timestamp || "-";
            let suhu = row.temp !== undefined ? row.temp : "-";
            let daya = row.power !== undefined ? row.power : "-";

            tr.innerHTML = `
                <td>${waktu}</td>
                <td>${suhu}</td>
                <td>${daya}</td>
            `;
            tableBody.appendChild(tr);
        });
    } else {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center;">Belum ada riwayat data.</td></tr>`;
    }
});

// Fitur Download CSV 
btnDownload.addEventListener('click', () => {
    get(historyRef).then((snapshot) => {
        if (snapshot.exists()) {
            const dataObj = snapshot.val();
            let csvContent = "Waktu,Suhu (C),Daya (W)\n";

            for (let key in dataObj) {
                let row = dataObj[key];
                let waktu = row.timestamp || "Tidak diketahui"; 
                let suhu = row.temp || 0;
                let daya = row.power || 0;
                csvContent += `${waktu},${suhu},${daya}\n`;
            }

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Riwayat_Data_Bueni.csv";
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("Data riwayat kosong.");
        }
    });
});