
# 💧 Monitor e Controlador de Nível de Caixa d'Água com Ciclo de Transferência Sem Fio

## 📌 Descrição do Projeto

Este projeto consiste em um sistema de monitoramento e controle automático de nível de água entre duas caixas d’água, utilizando comunicação sem fio via RF 433MHz.

---

## 🧭 Diagrama Geral do Sistema

O sistema é dividido em dois módulos:

- **Transmissor**: Monitora os níveis da **Caixa d’Água 1** e envia as informações via rádio.
- **Receptor (Central de Controle)**: Recebe os dados, exibe o status no display OLED e aciona as bombas conforme o ciclo programado.

```
(CAIXA D'ÁGUA 1)                                   (CENTRAL DE CONTROLE)
+---------------------------------+                  +-----------------------------------+
|        TRANSMISSOR              |                  |           RECEPTOR                |
|                                 |   Sinal RF 433MHz  |                                   |
|   [Sensor 100%] ----->|         |       )))        |         |-----> [Display OLED]      |
|   [Sensor 75%]  ----->|         |       )))        |         |                           |
|   [Sensor 50%]  ----->| Arduino |----------------->| Arduino |-----> [Relé Bomba A (1->2)]|
|   [Sensor 25%]  ----->|   UNO   |       )))        |   UNO   |                           |
|   [LEDs Status] <-----|         |                  |         |-----> [Relé Bomba B (2->1)]|
|                                 |                  | [Sensor Caixa 2] ---------------->|
+---------------------------------+                  +-----------------------------------+
```

---

## ⚙️ Funcionalidades

- **📡 Monitoramento Sem Fio**  
  Os níveis da Caixa 1 (0%, 25%, 50%, 75%, 100%) são lidos e transmitidos via RF para a central.

- **🖥️ Display OLED**  
  A central exibe os níveis da caixa e o estado das bombas em um display OLED 0.96" I2C.

- **🔄 Ciclo de Transferência Automatizado**
  1. A **Bomba A** é ligada, transferindo água da **Caixa 1 para a Caixa 2**.
  2. Após atingir o nível máximo, a **Bomba A** desliga.
  3. Após 10 segundos, a **Bomba B** liga e transfere água de volta da **Caixa 2 para a Caixa 1**.
  4. A **Bomba B** desliga.
  5. Após nova pausa de 10 segundos, o ciclo recomeça.

- **🛑 Segurança**  
  Caso a comunicação sem fio seja perdida por mais de 5 segundos, **ambas as bombas são desligadas automaticamente**.

- **⚡ Código Não-Bloqueante**  
  Uso da função `millis()` permite controle de tempo sem travar o Arduino, mantendo leituras e atualizações em tempo real.

---

## 🔩 Hardware Necessário

### 📦 Módulo Transmissor (Caixa d'Água 1)
- 1x Arduino Uno R3  
- 1x Módulo Transmissor RF 433MHz  
- 4x Sensores de Nível (Chave Boia)  
- 4x LEDs  
- 4x Resistores de 2kΩ  
- 1x Fonte de Alimentação 9V  

### 🧠 Módulo Receptor (Central de Controle)
- 1x Arduino Uno R3  
- 1x Módulo Receptor RF 433MHz  
- 1x Display OLED 128x64 0.96" I2C  
- 1x Módulo de Relé (2 canais ou mais)  
- 1x Sensor de Nível (Chave Boia)  
- 1x Fonte de Alimentação 9V  

---

## 🔧 Diagramas de Montagem

### 🛠️ Transmissor (Caixa 1)  
> *(Substitua a linha abaixo pela sua imagem do diagrama do transmissor)*  
📷 **[INSERIR IMAGEM DO ESQUEMÁTICO DO TRANSMISSOR AQUI]**

### 🛠️ Receptor (Controlador Central)  
> *(Substitua a linha abaixo pela sua imagem do diagrama do receptor)*  
📷 **[INSERIR IMAGEM DO ESQUEMÁTICO DO RECEPTOR AQUI]**

---

## ⚠️ AVISO DE SEGURANÇA – FIAÇÃO DAS BOMBAS

⚡ **CUIDADO!** A conexão das bombas ao módulo relé envolve **ALTA TENSÃO (110V ou 220V)**.  
Isso representa **RISCO DE CHOQUE ELÉTRICO GRAVE**.

- Faça por sua conta e risco.
- Se não tiver experiência com circuitos de alta tensão, peça ajuda a um **eletricista ou técnico qualificado**.
- Garanta o **isolamento completo** entre os circuitos de **baixa tensão (Arduino, 5V)** e **alta tensão (bombas)**.

> *(Substitua a linha abaixo pela sua imagem do esquema de ligação das bombas)*  
📷 **[INSERIR IMAGEM DO ESQUEMÁTICO DAS BOMBAS AQUI]**
