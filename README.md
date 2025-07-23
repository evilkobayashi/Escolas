# 🔐 Tranca Automática com RFID, LCD e Monitoramento de Bateria

## 📘 Descrição do Projeto

Este projeto implementa uma **tranca automática inteligente** utilizando Arduino Nano.  
A abertura da tranca é feita por meio de **cartões RFID autorizados**, com **visualização em LCD** e monitoramento da **porcentagem da bateria** que alimenta o sistema.

---

## 🧩 Componentes Utilizados

- ✅ **Arduino Nano**
- 📘 **Módulo RFID RC522** – para leitura de cartões e chaveiros RFID
- 🔒 **Tranca Solenóide 12V** – controlada por um **módulo de relé**
- 🖥️ **Display LCD 16x2 com interface I2C** – para exibir mensagens como “Acesso Autorizado”
- 🔋 **Sensor de Tensão** – para monitorar o nível da bateria (ligado ao pino A0)
- ⚡ **Fonte Externa de 12V** – para alimentar a tranca e o sistema

---

## ⚙️ Funcionalidades

- Leitura de cartões RFID com validação
- Abertura automática da tranca por 5 segundos ao detectar cartão autorizado
- Exibição de mensagens no LCD:
  - “Aguardando cartão...”
  - “Acesso autorizado”
  - “Acesso negado”
  - “Bateria: XX%”
- Monitoramento da tensão da bateria com cálculo de porcentagem (12.6V = 100%, 11.1V = 0%)

---

## 🔌 Conexões

### 🧠 Módulo RFID RC522 (alimentado com 3.3V)

| Pino RC522 | Arduino Nano |
|------------|---------------|
| 3.3V       | 3V3           |
| GND        | GND           |
| RST        | D9            |
| MISO       | D12           |
| MOSI       | D11           |
| SCK        | D13           |
| SDA (SS)   | D10           |

### 🖥️ LCD 16x2 I2C

| Pino LCD | Arduino Nano |
|----------|---------------|
| GND      | GND           |
| VCC      | 5V            |
| SDA      | A4            |
| SCL      | A5            |

### 🔋 Sensor de Tensão

- Sinal de saída (S) → A0  
- GND → GND  
- Entrada de tensão: positivo da bateria (via divisor de tensão)

### 🔒 Módulo Relé

| Pino Relé | Arduino Nano |
|-----------|---------------|
| GND       | GND           |
| VCC       | 5V            |
| IN        | D7            |

---

## ⚠️ Importante: Divisor de Tensão

O Arduino Nano não pode ler tensões maiores que 5V diretamente.  
Use um **divisor de tensão** ou módulo de sensor de tensão para reduzir a tensão da bateria (12V) antes de conectar ao pino A0.

---

## 📷 Esquemático

> *(Inserir aqui a imagem do esquemático do projeto)*  
📷 **[INSERIR ESQUEMÁTICO AQUI]**

---

## ✨ Créditos

**Professor responsável:** André Veiga  
**Turmas:** 901 e 902  
**Escola:** Professor Joaquim de Freitas – Queimados/RJ  
**Ano:** 2025

---

Segurança inteligente na palma da mão! 🚪🔐
---

Orgulhosamente feito por alunos da rede pública com criatividade e tecnologia! 🚀
