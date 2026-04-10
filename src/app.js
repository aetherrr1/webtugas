const express = require('express');
const app = express();

app.use(express.json());

// --- DATA SIMULASI ---
let artPosts = [
    { id: 1, author: "Nicholas", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500", title: "Abstract Flow #01", likes: 24, dislikes: 0 }
];

app.get('/api/posts', (req, res) => res.json(artPosts));

// --- TAMPILAN ---
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Aether Digital Art</title>
        <style>
            :root { --bg: #0f172a; --card: #1e293b; --accent: #3b82f6; --text: #f8fafc; --dim: #94a3b8; --danger: #f87171; }
            body { background: var(--bg); color: var(--text); font-family: 'Segoe UI', sans-serif; margin: 0; padding-bottom: 80px; }
            header { background: var(--card); padding: 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .container { max-width: 500px; margin: auto; padding: 20px; }
            .art-card { background: var(--card); border-radius: 15px; overflow: hidden; margin-bottom: 25px; }
            .art-img { width: 100%; height: 280px; object-fit: cover; background: #334155; }
            .art-content { padding: 15px; }
            .btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 0.8rem; }
            .btn:hover { background: var(--accent); }
            .post-box { background: var(--card); padding: 20px; border-radius: 15px; margin-bottom: 25px; border: 1px dashed var(--accent); }
            input, textarea { width: 100%; padding: 10px; margin: 10px 0; background: #0f172a; border: 1px solid #334155; color: white; border-radius: 8px; box-sizing: border-box; }
            nav { position: fixed; bottom: 0; width: 100%; background: var(--card); display: flex; justify-content: space-around; padding: 15px 0; border-top: 1px solid rgba(255,255,255,0.1); }
            .nav-link { color: var(--dim); cursor: pointer; }
            .nav-active { color: var(--accent); font-weight: bold; }
            .tab { display: none; }
            .active { display: block; }
        </style>
    </head>
    <body>

    <header>
        <h1 style="margin:0">Project Aether</h1>
        <div style="color:var(--dim); font-style:italic">Sopan, Santun, Senang.</div>
    </header>

    <div class="container">
        <div id="showcase" class="tab active">
            <div class="post-box">
                <h4 style="margin:0">Post New Art</h4>
                <input type="text" id="postTitle" placeholder="Judul Karya...">
                <input type="text" id="postImg" placeholder="Link Gambar (URL)...">
                <button class="btn" style="background:var(--accent); width:100%" onclick="addNewPost()">Posting Sekarang</button>
            </div>

            <div id="feed">
                <div class="art-card">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500" class="art-img">
                    <div class="art-content">
                        <h3 style="margin:0">Abstract Flow #01</h3>
                        <p style="color:var(--dim); font-size:0.8rem">By Nicholas</p>
                        <div style="display:flex; gap:10px; margin-top:10px;">
                            <button class="btn">👍 24</button>
                            <button class="btn">👎 0</button>
                            <button class="btn">💬 Comment</button>
                            <button class="btn" style="color:var(--danger)">🚩 Report</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="settings" class="tab">
            <h2>Settings</h2>
            <label>Nickname</label>
            <input type="text" value="Nicholas">
            <label>Bio</label>
            <textarea>Digital Art Student | Sopan, Santun, Senang.</textarea>
            <button class="btn" style="background:var(--accent); width:100%">Simpan</button>
        </div>

        <div id="tos" class="tab">
            <h2>Terms of Service</h2>
            <div style="background:var(--card); padding:20px; border-radius:15px; font-size:0.9rem">
                <ol>
                    <li>Dilarang konten SARA/Kebencian.</li>
                    <li>Dilarang Plagiarisme.</li>
                    <li>Dilarang konten NSFW/Pornografi.</li>
                    <li>Komentar harus Sopan & Santun.</li>
                    <li>Dilarang Spam iklan.</li>
                    <li>Hargai privasi orang lain.</li>
                    <li>Dilarang manipulasi Like dengan bot.</li>
                    <li>Konten 10x report otomatis ditinjau.</li>
                    <li>Dilarang promosi barang ilegal.</li>
                    <li>Admin berhak hapus konten melanggar.</li>
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
        }

        function addNewPost() {
            const title = document.getElementById('postTitle').value;
            const img = document.getElementById('postImg').value;
            if(!title || !img) return alert('Isi dulu judul sama link fotonya!');

            const feed = document.getElementById('feed');
            const newCard = document.createElement('div');
            newCard.className = 'art-card';
            newCard.innerHTML = \`
                <img src="\${img}" class="art-img" onerror="this.src='https://via.placeholder.com/500x300?text=Gambar+Gagal+Load'">
                <div class="art-content">
                    <h3 style="margin:0">\${title}</h3>
                    <p style="color:var(--dim); font-size:0.8rem">By Nicholas</p>
                    <div style="display:flex; gap:10px; margin-top:10px;">
                        <button class="btn">👍 0</button>
                        <button class="btn">👎 0</button>
                        <button class="btn">💬 Comment</button>
                        <button class="btn" style="color:var(--danger)">🚩 Report</button>
                    </div>
                </div>
            \`;
            feed.prepend(newCard);
            document.getElementById('postTitle').value = '';
            document.getElementById('postImg').value = '';
        }
    </script>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server Live!"));

module.exports = app;
