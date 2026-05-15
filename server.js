import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const IMAGES_DIR = path.join(__dirname, 'public', 'imagens');

// Garante que a pasta de imagens existe
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

app.use(express.json());
app.use('/imagens', express.static(IMAGES_DIR));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Configuração do multer — salva o arquivo com nome único
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMAGES_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nome = `img-${Date.now()}${ext}`;
    cb(null, nome);
  }
});
const upload = multer({ storage });

function lerArquivo(nome) {
  const caminho = path.join(DATA_DIR, `${nome}.json`);
  const conteudo = fs.readFileSync(caminho, 'utf-8');
  return JSON.parse(conteudo);
}

function salvarArquivo(nome, dados) {
  const caminho = path.join(DATA_DIR, `${nome}.json`);
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), 'utf-8');
}

// ─── UPLOAD DE IMAGEM ────────────────────────────────────
app.post('/upload', upload.single('imagem'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ erro: 'Nenhum arquivo enviado' });
  }
  const url = `http://localhost:3001/imagens/${req.file.filename}`;
  res.json({ url });
});

// ─── PRODUTOS ────────────────────────────────────────────
app.get('/produtos', (req, res) => {
  res.json(lerArquivo('produtos'));
});

app.post('/produtos', (req, res) => {
  const lista = lerArquivo('produtos');
  const novo = { ...req.body, id: `produto-${Date.now()}` };
  lista.push(novo);
  salvarArquivo('produtos', lista);
  res.status(201).json(novo);
});

app.put('/produtos/:id', (req, res) => {
  let lista = lerArquivo('produtos');
  lista = lista.map(p => p.id === req.params.id ? req.body : p);
  salvarArquivo('produtos', lista);
  res.json(req.body);
});

app.delete('/produtos/:id', (req, res) => {
  let lista = lerArquivo('produtos');
  lista = lista.filter(p => p.id !== req.params.id);
  salvarArquivo('produtos', lista);
  res.json({ ok: true });
});

// ─── USUÁRIOS ────────────────────────────────────────────
app.get('/usuarios', (req, res) => {
  res.json(lerArquivo('usuarios'));
});

app.post('/usuarios', (req, res) => {
  const lista = lerArquivo('usuarios');
  const novo = { ...req.body, id: `usuario-${Date.now()}` };
  lista.push(novo);
  salvarArquivo('usuarios', lista);
  res.status(201).json(novo);
});

app.put('/usuarios/:id', (req, res) => {
  let lista = lerArquivo('usuarios');
  lista = lista.map(u => u.id === req.params.id ? req.body : u);
  salvarArquivo('usuarios', lista);
  res.json(req.body);
});

app.post('/usuarios/login', (req, res) => {
  const { usuario, senha } = req.body;
  const lista = lerArquivo('usuarios');
  const encontrado = lista.find(
    u => u.credenciais?.usuario === usuario && u.credenciais?.senha === senha
  );
  if (encontrado) {
    res.json(encontrado);
  } else {
    res.status(401).json({ erro: 'Usuário ou senha inválidos' });
  }
});

// ─── PEDIDOS ─────────────────────────────────────────────
app.get('/pedidos', (req, res) => {
  res.json(lerArquivo('pedidos'));
});

app.post('/pedidos', (req, res) => {
  const lista = lerArquivo('pedidos');
  const novo = { ...req.body, id: `PED-${Date.now()}` };
  lista.unshift(novo);
  salvarArquivo('pedidos', lista);
  res.status(201).json(novo);
});

app.put('/pedidos/:id', (req, res) => {
  let lista = lerArquivo('pedidos');
  lista = lista.map(p => {
    if (p.id !== req.params.id) return p;
    const atualizado = { ...p, ...req.body };
    // Remove horarioEntrega se vier undefined para não sujar o JSON
    if (atualizado.horarioEntrega === undefined) delete atualizado.horarioEntrega;
    return atualizado;
  });
  salvarArquivo('pedidos', lista);
  res.json(lista.find(p => p.id === req.params.id));
});

// ─── CONFIGURAÇÕES ───────────────────────────────────────
app.get('/configuracoes', (req, res) => {
  res.json(lerArquivo('configuracoes'));
});

app.put('/configuracoes', (req, res) => {
  salvarArquivo('configuracoes', req.body);
  res.json(req.body);
});

// ─── START ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Servidor DiCasa rodando em http://localhost:${PORT}`);
});