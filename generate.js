// generate.js
const fs = require('fs');
const path = require('path');

// Daftar folder yang ingin di-scan
const foldersToScan = ['images1', 'images2', 'images3']; 
const outputData = {};

foldersToScan.forEach(folder => {
    const folderPath = path.join(__dirname, folder);
    
    // Cek apakah folder ada
    if (fs.existsSync(folderPath)) {
        // Baca semua file di dalam folder
        const files = fs.readdirSync(folderPath);
        
        // Filter hanya file gambar (jpg, png, dsb)
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
        });
        
        outputData[folder] = imageFiles;
    } else {
        console.log(`Folder ${folder} tidak ditemukan, dilewati.`);
    }
});

// Simpan hasilnya ke dalam file data.js agar bisa dibaca HTML
const fileContent = `const imageData = ${JSON.stringify(outputData, null, 4)};`;
fs.writeFileSync(path.join(__dirname, 'data.js'), fileContent);

console.log('Berhasil! File data.js telah dibuat.');