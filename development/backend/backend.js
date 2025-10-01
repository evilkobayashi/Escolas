const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// ================= ALUNOS =================
app.get('/alunos', (req, res) => {
  res.json({ message: 'Listar alunos' });
});

app.get('/alunos/:id', (req, res) => {
  res.json({ message: `Buscar aluno ${req.params.id}` });
});

app.post('/alunos', (req, res) => {
  res.json({ message: 'Criar aluno', data: req.body });
});

app.put('/alunos/:id', (req, res) => {
  res.json({ message: `Atualizar aluno ${req.params.id}`, data: req.body });
});

app.delete('/alunos/:id', (req, res) => {
  res.json({ message: `Deletar aluno ${req.params.id}` });
});

// ================= DISCIPLINAS =================
app.get('/disciplinas', (req, res) => {
  res.json({ message: 'Listar disciplinas' });
});

app.get('/disciplinas/:id', (req, res) => {
  res.json({ message: `Buscar disciplina ${req.params.id}` });
});

app.post('/disciplinas', (req, res) => {
  res.json({ message: 'Criar disciplina', data: req.body });
});

app.put('/disciplinas/:id', (req, res) => {
  res.json({ message: `Atualizar disciplina ${req.params.id}`, data: req.body });
});

app.delete('/disciplinas/:id', (req, res) => {
  res.json({ message: `Deletar disciplina ${req.params.id}` });
});

// ================= AULAS =================
app.get('/aulas', (req, res) => {
  res.json({ message: 'Listar aulas' });
});

app.get('/aulas/:id', (req, res) => {
  res.json({ message: `Buscar aula ${req.params.id}` });
});

app.post('/aulas', (req, res) => {
  res.json({ message: 'Criar aula', data: req.body });
});

app.put('/aulas/:id', (req, res) => {
  res.json({ message: `Atualizar aula ${req.params.id}`, data: req.body });
});

app.delete('/aulas/:id', (req, res) => {
  res.json({ message: `Deletar aula ${req.params.id}` });
});

// ================= PRESENÇAS =================
app.get('/presencas', (req, res) => {
  res.json({ message: 'Listar presenças' });
});

app.get('/presencas/:id', (req, res) => {
  res.json({ message: `Buscar presença ${req.params.id}` });
});

app.post('/presencas', (req, res) => {
  res.json({ message: 'Criar presença', data: req.body });
});

app.put('/presencas/:id', (req, res) => {
  res.json({ message: `Atualizar presença ${req.params.id}`, data: req.body });
});

app.delete('/presencas/:id', (req, res) => {
  res.json({ message: `Deletar presença ${req.params.id}` });
});

// ================= INICIAR SERVIDOR =================
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
