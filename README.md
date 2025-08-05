# 🧑‍🏫 Chamada Virtual com Reconhecimento Facial e Tela Touchscreen

## 📘 Descrição do Projeto

Este projeto tem como objetivo modernizar o processo de chamada escolar por meio de um sistema interativo instalado em uma **Raspberry Pi** com **tela touchscreen**.  
O sistema utiliza **reconhecimento facial** para identificar os alunos automaticamente e registrar a presença em uma interface amigável.

---

## 🛠️ Tecnologias Utilizadas

- **Raspberry Pi 3 ou 4**  
- **Tela Touchscreen 7" oficial ou compatível**  
- **TensorflowJS** (para reconhecimento facial)  
- **NodeJS** (backend)  
- **SQLite ou Google Sheets** (para armazenamento dos dados de presença)  
- **React** (para a interface do usuário)

---

## 🎯 Funcionalidades

- 📸 **Reconhecimento Facial** dos alunos ao se posicionarem em frente à câmera
- 📝 Registro automático de **data, hora e nome** do aluno
- 📊 Exibição de **relatórios de presença**
- 🧑‍💻 Interface touchscreen com feedback visual
- 🔐 Área administrativa protegida por senha para consultar e exportar dados

---

## 💻 Instalação

1. Clone este repositório:
```bash
git clone https://github.com/seuusuario/chamada-virtual.git
```

2. Instale as dependências:
```bash
sudo apt update
sudo apt install python3-opencv python3-pip
pip3 install face_recognition flask kivy
```

3. Execute o sistema:
```bash
python3 app.py
```

---

## 📂 Estrutura do Projeto

```
chamada-virtual/
├── app.py
├── recognizer/
│   ├── capture_faces.py
│   ├── trained_faces/
│   └── face_utils.py
├── database/
│   └── presencas.db
├── templates/
│   └── interface.html
├── static/
│   └── style.css
└── README.md
```

---

## 📷 Imagens do Projeto

> *(Espaço reservado para fotos do dispositivo em uso ou interface do sistema)*  
📷 **[INSERIR FOTO AQUI]**

---

## ⚠️ Avisos

- Para melhor desempenho do reconhecimento facial, a iluminação do ambiente deve ser adequada.
- Recomendável treinar o sistema com múltiplas imagens de cada aluno em diferentes ângulos.

---

## ✨ Créditos

**Professor responsável:** André Veiga  
**Turmas envolvidas:** 901 e 902  
**Escola:** Professor Joaquim de Freitas – Queimados/RJ  
**Ano:** 2025

---

Modernizando a educação com tecnologia de ponta! 🚀
