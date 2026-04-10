const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// DATABASE SEDERHANA (File JSON)
const DB_FILE = './database.json';
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], posts: [] }));
}

const getData = () => JSON.parse(fs.readFileSync(DB_FILE));
const saveData = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// --- API ROUTES ---

// 1. Registrasi Siswa
app.post('/api/register', (req, res) => {
    const { nama, kelas, id } = req.body;
    const db = getData();
    const userExists = db.users.find(u => u.id === id);
    if (!userExists) {
        db.users.push({ id, nama, kelas, role: 'user' });
        saveData(db);
    }
    res.json({ success: true });
});

// 2. Ambil Postingan
app.get('/api/posts', (req, res) => {
    const db = getData();
    res.json(db.posts);
});

// 3. Post Karya Baru
app.post('/api/post', (req, res) => {
    const { author, title, content } = req.body;
    const db = getData();
    db.posts.push({ 
        id: Date.now(), 
        author, 
        title, 
        content, 
        likes: 0, 
        dislikes: 0,
        reports: 0 
    });
    saveData(db);
    res.json({ success: true });
});

// 4. Fitur Report (Laporan)
app.post('/api/report', (req, res) => {
    const { postId } = req.body;
    const db = getData();
    const post = db.posts.find(p => p.id === parseInt(postId));
    if (post) {
        post.reports += 1;
        saveData(db);
        return res.json({ success: true });
    }
    res.status(404).json({ message: "Postingan ilang!" });
});

// 5. Fitur Admin Hapus (Ganti 'aether_secret' dengan pass rahasiamu)
app.post('/api/admin/delete', (req, res) => {
    const { postId, adminKey } = req.body;
    if (adminKey === 'aether_secret') {
        const db = getData();
        db.posts = db.posts.filter(p => p.id !== parseInt(postId));
        saveData(db);
        return res.json({ success: true });
    }
    res.status(403).json({ message: "Bukan Admin!" });
});

app.listen(port, () => {
    console.log(`Web JNJ Showcase ON: http://localhost:${port}`);
});

module.exports = app;