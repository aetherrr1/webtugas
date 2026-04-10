const express = require('express');
const app = express();

// --- 1. BACKEND: Jalur data API ---
app.get('/api', (req, res) => {
    res.json({ message: "API Backend Aether Aktif!" });
});

// --- 2. FRONTEND: Halaman Utama ---
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Aether</title>
        <style>
            body { 
                background: linear-gradient(135deg, #1e293b, #0f172a); 
                color: white; 
                font-family: 'Segoe UI', sans-serif; 
                display: flex; justify-content: center; align-items: center; 
                height: 100vh; margin: 0; 
            }
            .card { 
                background: rgba(30, 41, 59, 0.8); 
                padding: 40px; 
                border-radius: 20px; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.5); 
                text-align: center;
                border: 1px solid rgba(255,255,255,0.1);
            }
            h1 { margin: 0; font-size: 2rem; }
            .slogan { color: #94a3b8; margin: 10px 0 30px 0; font-style: italic; }
            #status-box { 
                background: #0f172a; 
                padding: 15px; 
                border-radius: 8px; 
                color: #4ade80; 
                font-family: monospace;
                border-left: 4px solid #4ade80;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>Project Node.js Aether</h1>
            <p class="slogan">Sopan, Santun, Senang.</p>
            <div id="status-box">Menghubungkan ke server...</div>
        </div>

        <script>
            // Fungsi ini jalan otomatis pas web dibuka
            window.onload = function() {
                const box = document.getElementById('status-box');
                fetch('/api')
                    .then(res => res.json())
                    .then(data => {
                        box.innerText = "Status: " + data.message;
                    })
                    .catch(err => {
                        box.innerText = "Error: Gagal konek ke API";
                        box.style.color = "#f87171";
                        box.style.borderLeftColor = "#f87171";
                    });
            };
        </script>
    </body>
    </html>
    `);
});

// --- 3. SERVER LOKAL (Buat Tes) ---
const port = 3000;
app.listen(port, () => {
    console.log("Server jalan di port " + port);
});

// --- 4. EXPORT UNTUK VERCEL (Paling Bawah!) ---
module.exports = app;
