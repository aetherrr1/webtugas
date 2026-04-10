const express = require('express');
const app = express();

// --- 1. SETTING DASAR ---
app.use(express.json());

// --- 2. JALUR API (BACKEND) ---
app.get('/api', (req, res) => {
    res.json({ message: "API Backend Aether Aktif!" });
});

// --- 3. TAMPILAN UTAMA (FRONTEND) ---
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Aether Digital Art</title>
        <style>
            :root { 
                --bg: #0f172a; --card: #1e293b; --accent: #3b82f6; 
                --text: #f8fafc; --dim: #94a3b8; --danger: #f87171;
            }
            body { 
                background-color: var(--bg); color: var(--text); 
                font-family: 'Segoe UI', Tahoma, sans-serif; margin: 0; padding-bottom: 80px;
            }
            header { 
                background: var(--card); padding: 20px; text-align: center; 
                border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            .slogan { color: var(--dim); font-style: italic; font-size: 0.9rem; margin-top: 5px; }
            .container { max-width: 500px; margin: auto; padding: 20px; }
            
            /* Art Card */
            .art-card { 
                background: var(--card); border-radius: 15px; overflow: hidden; 
                margin-bottom: 25px; box-shadow: 0 10px 15px rgba(0,0,0,0.3);
            }
            .art-img { width: 100%; height: 280px; background: #334155; object-fit: cover; }
            .art-content { padding: 15px; }
            .btn-group { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 15px; }
            .btn { 
                background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                color: white; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 0.8rem;
            }
            .btn:hover { background: var(--accent); }
            .btn-report { color: var(--danger); border-color: var(--danger); }

            /* Settings Form */
            input, textarea { 
                width: 100%; padding: 12px; margin: 10px 0; background: #0f172a; 
                border: 1px solid #334155; color: white; border-radius: 8px; box-sizing: border-box;
            }

            /* ToS List */
            .tos-box { background: var(--card); padding: 20px; border-radius: 15px; text-align: left; }
            .tos-box ol { padding-left: 20px; color: var(--dim); }
            .tos-box li { margin-bottom: 10px; }

            /* Navigation */
            nav { 
                position: fixed; bottom: 0; width: 100%; background: var(--card); 
                display: flex; justify-content: space-around; padding: 15px 0; 
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            .nav-link { color: var(--dim); text-decoration: none; font-size: 0.9rem; cursor: pointer; }
            .nav-active { color: var(--accent); font-weight: bold; }
            .tab { display: none; }
            .active { display: block; }
        </style>
    </head>
    <body>

    <header>
        <h1 style="margin:0">Project Aether</h1>
        <div class="slogan">Sopan, Santun, Senang.</div>
    </header>

    <div class="container">
        <div id="showcase" class="tab active">
            <div class="art-card">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500" class="art-img">
                <div class="art-content">
                    <h3 style="margin:0">Abstract Flow #01</h3>
                    <p style="color:var(--dim); font-size:0.8rem">By NOX\`aether</p>
                    <div class="btn-group">
                        <button class="btn" onclick="alert('Liked!')">👍 24</button>
                        <button class="btn" onclick="alert('Disliked!')">👎 0</button>
                        <button class="btn" onclick="alert('Buka Komentar...')">💬 Comment</button>
                        <button class="btn btn-report" onclick="alert('Konten dilaporkan!')">🚩 Report</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="settings" class="tab">
            <h2>Profile Settings</h2>
            <label>Nickname</label>
            <input type="text" value="Aether">
            <label>Bio Deskripsi</label>
            <textarea rows="3">Digital Artist | TKJ Student | Sopan, Santun, Senang.</textarea>
            <button class="btn" style="background:var(--accent); width:100%" onclick="alert('Profil disimpan!')">Simpan Perubahan</button>
        </div>

        <div id="tos" class="tab">
            <h2>Terms of Service</h2>
            <div class="tos-box">
                <ol>
                    <li>Dilarang keras memposting konten SARA atau kebencian.</li>
                    <li>Plagiarisme karya orang lain akan diberikan sanksi hapus akun.</li>
                    <li>Dilarang memposting konten pornografi atau eksplisit.</li>
                    <li>Gunakan bahasa yang Sopan dalam berkomentar.</li>
                    <li>Dilarang spam atau mempromosikan link ilegal.</li>
                    <li>Hargai privasi dan data pribadi artist lain.</li>
                    <li>Satu user hanya diperbolehkan memiliki satu akun utama.</li>
                    <li>Konten yang mendapat 10 report akan disembunyikan otomatis.</li>
                    <li>Dilarang menggunakan bot untuk manipulasi interaksi.</li>
                    <li>Admin berhak menghapus konten yang melanggar norma hukum.</li>
                </ol>
            </div>
        </div>
    </div>

    <nav>
        <div class="nav-link nav-active" id="n-showcase" onclick="openTab('showcase')">Home</div>
        <div class="nav-link" id="n-settings" onclick="openTab('settings')">Settings</div>
        <div class="nav-link" id="n-tos" onclick="openTab('tos')">ToS</div>
    </nav>

    <script>
        function openTab(name) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('nav-active'));
            
            document.getElementById(name).classList.add('active');
            document.getElementById('n-' + name).classList.add('nav-active');
            window.scrollTo(0,0);
        }
    </script>

    </body>
    </html>
    `);
});

// --- 4. SERVER LOKAL ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

// --- 5. MODULE EXPORTS (PALING BAWAH SESUAI PERINTAH!) ---
module.exports = app;
