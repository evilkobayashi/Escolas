# 📓 Caderno Virtual com Raspberry Pi e Tela Touchscreen

## 📘 Descrição do Projeto

Este projeto tem como objetivo fornecer uma alternativa digital ao caderno tradicional, utilizando um dispositivo baseado em **Raspberry Pi** com **tela touchscreen**.  
O sistema permite que os alunos escrevam, desenhem e salvem suas anotações diretamente em arquivos digitais que são sincronizados automaticamente com a **nuvem** (Google Drive, Dropbox, etc.), garantindo portabilidade e segurança dos dados.

---

## 🛠️ Componentes Utilizados

- **Raspberry Pi 3 ou 4**  
- **Tela Touchscreen 7" oficial ou compatível**  
- **Caneta capacitiva (opcional)**  
- **Cartão microSD com sistema operacional Raspberry Pi OS**  
- **Conexão Wi-Fi** para sincronização com a nuvem  
- **Serviço de sincronização (rclone, Google Drive API, Dropbox API, etc.)**

---

## 🎯 Funcionalidades

- 🖊️ Escrita e desenho direto na tela touchscreen  
- 💾 Salvamento automático de anotações como arquivos de imagem ou PDF  
- ☁️ Sincronização com a nuvem (Google Drive, Dropbox, etc.)  
- 📂 Organização por pastas, disciplinas ou datas  
- 🔍 Interface intuitiva para alunos

---

## 💻 Instalação

1. Instale o sistema operacional Raspberry Pi OS no cartão microSD.
2. Instale as bibliotecas necessárias:
```bash
sudo apt update
sudo apt install python3-pip python3-tk
pip3 install pillow flask
