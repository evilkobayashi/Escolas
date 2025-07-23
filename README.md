# 🪟 Abertura e Fechamento Automático de Janelas

## 📘 Descrição do Projeto

Este projeto tem como objetivo automatizar o processo de **abertura e fechamento de janelas** com base em **condições ambientais**, como temperatura, umidade, horário ou comando manual.  
Utilizando sensores e um microcontrolador, o sistema controla um motor que movimenta a janela de forma segura e eficiente, promovendo conforto e economia de energia.

---

## 🛠️ Componentes Utilizados

- **Arduino Uno ou Nano**  
- **Motor de passo com driver (ex: A4988, ULN2003 ou ponte H L298N)**  
- **Sensor de temperatura e umidade DHT11 ou DHT22**  
- **Sensor de chuva (opcional)**  
- **Relé ou driver para controle de potência**  
- **Display LCD 16x2 com interface I2C (opcional)**  
- **Botões físicos para abertura/fechamento manual (opcional)**  
- **Fonte de alimentação externa (12V ou 5V dependendo do motor)**

---

## 🎯 Funcionalidades

- 🌡️ Abertura e fechamento automático com base na temperatura (ex: abre se > 30°C)  
- ☔ Fechamento automático em caso de chuva (se usar sensor de chuva)  
- 🕒 Possibilidade de agendamento por horário  
- 🖲️ Controle manual por botões físicos ou interface no display  
- 🧠 Lógica programável com sensores ajustáveis  

---

## 💻 Instalação e Programação

1. Conecte os sensores e motor ao Arduino conforme o esquema elétrico.
2. Instale a biblioteca do sensor DHT:
   ```cpp
   Sketch > Incluir Biblioteca > Gerenciar Bibliotecas > DHT sensor library
   ```
3. Faça o upload do código principal para o Arduino usando a IDE Arduino.
4. Ajuste os limites de temperatura ou condições no código conforme a necessidade.

---

## 📂 Estrutura do Projeto

```
abrir-janelas-automatica/
├── codigo/
│   └── janela_automatica.ino
├── imagens/
│   └── esquema_ligacao.png
├── docs/
│   └── README.md
```

---

## 📷 Imagens do Projeto

> *(Espaço reservado para imagens do protótipo ou do sistema instalado)*  
📷 **[INSERIR FOTO AQUI]**

---

## ⚠️ Avisos

- Certifique-se de que a estrutura da janela é compatível com automação.
- O motor deve ser dimensionado corretamente para o peso da janela.
- Utilize proteções contra curto-circuito e falhas de energia, especialmente se conectado a redes elétricas maiores.

---

## ✨ Créditos

**Professor responsável:** André Veiga  
**Turmas envolvidas:** 901 e 902  
**Escola:** Professor Joaquim de Freitas – Queimados/RJ  
**Ano:** 2025

---

Automatizando o ambiente escolar com soluções inteligentes e acessíveis! 🤖🌬️
