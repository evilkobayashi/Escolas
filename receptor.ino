// CÓDIGO ATUALIZADO PARA O ARDUINO RECEPTOR E CONTROLADOR

// --- Bibliotecas ---
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <RCSwitch.h>
#include <Wire.h>

// --- Configurações do Display OLED ---
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// --- Configuração do Rádio ---
// Usa a interrupção 0, que corresponde ao pino D2 do Arduino UNO
RCSwitch receptor = RCSwitch();

// --- Pinos dos Componentes ---
#define RELE_BOMBA_A_PIN 7      // Bomba que leva água da Caixa 1 para a Caixa 2
#define RELE_BOMBA_B_PIN 8      // Bomba que leva água da Caixa 2 para a Caixa 1
#define SENSOR_CAIXA_2_PIN 9    // Sensor de nível 25% na Caixa 2

// --- Variáveis de Controle ---
int nivelCaixa1 = -1; // Armazena o nível da Caixa 1. Inicia com -1 (desconhecido).
unsigned long ultimoSinalRecebido = 0;
const long tempoLimiteSinal = 5000; // 5 segundos para considerar falha de sinal

// --- Máquina de Estados para o Controle do Ciclo ---
enum EstadoSistema { OCIOSO, ENCHENDO_CX2, PAUSA_PARA_ENCHER_CX1, ENCHENDO_CX1, PAUSA_PARA_ENCHER_CX2, FALHA_SINAL };
EstadoSistema estadoAtual = OCIOSO;

// --- Variáveis para o Timer não-bloqueante ---
unsigned long tempoInicioPausa = 0;
const long duracaoPausa = 10000; // 10 segundos

void setup() {
  // Inicializa o display OLED
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Monitor de Caixas");
  display.println("Iniciando...");
  display.display();
  delay(1000);

  // Configura os pinos dos relés como saída
  pinMode(RELE_BOMBA_A_PIN, OUTPUT);
  pinMode(RELE_BOMBA_B_PIN, OUTPUT);
  
  // IMPORTANTE: A maioria dos módulos relé é "ativa em baixo" (LOW para LIGAR).
  // Garantimos que ambas as bombas comecem DESLIGADAS (em HIGH).
  digitalWrite(RELE_BOMBA_A_PIN, HIGH);
  digitalWrite(RELE_BOMBA_B_PIN, HIGH);

  // Configura o pino do sensor da Caixa 2 com pull-up interno
  pinMode(SENSOR_CAIXA_2_PIN, INPUT_PULLUP);

  // Ativa o receptor RF no pino D2 (interrupção 0)
  receptor.enableReceive(0);
  ultimoSinalRecebido = millis();
}

void loop() {
  // 1. Verifica se recebeu novos dados RF
  if (receptor.available()) {
    int valorRecebido = receptor.getReceivedValue();
    // Filtra apenas os valores que esperamos (0, 25, 50, 75, 100)
    if (valorRecebido == 0 || valorRecebido == 25 || valorRecebido == 50 || valorRecebido == 75 || valorRecebido == 100) {
      nivelCaixa1 = valorRecebido;
      ultimoSinalRecebido = millis(); // Atualiza o tempo do último sinal válido
      if (estadoAtual == FALHA_SINAL) { // Se estava em falha, volta ao estado ocioso
          estadoAtual = OCIOSO;
      }
    }
    receptor.resetAvailable();
  }

  // 2. Verifica falha de comunicação
  if (millis() - ultimoSinalRecebido > tempoLimiteSinal) {
    estadoAtual = FALHA_SINAL;
    desligarTodasBombas();
  }

  // 3. Executa a lógica de controle das bombas
  controlarBombas();

  // 4. Atualiza as informações no display
  atualizarDisplay();

  delay(100); // Pequena pausa para estabilidade
}

void controlarBombas() {
  // Lê o estado do sensor da Caixa 2. LOW = com água, HIGH = sem água (nível abaixo de 25%)
  bool nivelCaixa2AbaixoDe25 = (digitalRead(SENSOR_CAIXA_2_PIN) == HIGH);

  // Máquina de estados para controlar o ciclo
  switch (estadoAtual) {
    case OCIOSO:
      // CONDIÇÃO DE INÍCIO: Caixa 1 está 100% cheia.
      if (nivelCaixa1 == 100) {
        ligarBombaA();
        estadoAtual = ENCHENDO_CX2;
      }
      break;

    case ENCHENDO_CX2: // Bomba A ligada (1 -> 2)
      // CONDIÇÃO DE MUDANÇA: Caixa 1 chegou a 25%.
      if (nivelCaixa1 <= 25 && nivelCaixa1 != -1) {
        desligarTodasBombas();
        tempoInicioPausa = millis(); // Inicia o timer de 10s
        estadoAtual = PAUSA_PARA_ENCHER_CX1;
      }
      break;

    case PAUSA_PARA_ENCHER_CX1:
      // Espera 10 segundos passarem
      if (millis() - tempoInicioPausa >= duracaoPausa) {
        ligarBombaB();
        estadoAtual = ENCHENDO_CX1;
      }
      break;

    case ENCHENDO_CX1: // Bomba B ligada (2 -> 1)
      // CONDIÇÃO DE MUDANÇA: Caixa 2 ficou vazia (sensor abaixo de 25%).
      if (nivelCaixa2AbaixoDe25) {
        desligarTodasBombas();
        tempoInicioPausa = millis(); // Inicia o timer de 10s
        estadoAtual = PAUSA_PARA_ENCHER_CX2;
      }
      break;

    case PAUSA_PARA_ENCHER_CX2:
      // Espera 10 segundos passarem
      if (millis() - tempoInicioPausa >= duracaoPausa) {
        // Reinicia o ciclo
        ligarBombaA();
        estadoAtual = ENCHENDO_CX2;
      }
      break;

    case FALHA_SINAL:
      // A ação (desligar bombas) já foi tomada no loop principal.
      // Aqui não fazemos nada, apenas esperamos um novo sinal.
      break;
  }
}

void atualizarDisplay() {
  display.clearDisplay();
  display.setCursor(0, 0);
  display.setTextSize(2);

  display.print("CX1: ");
  if (nivelCaixa1 == -1 || estadoAtual == FALHA_SINAL) {
    display.print("--");
  } else {
    display.print(nivelCaixa1);
  }
  display.println("%");
  
  display.setTextSize(1);
  display.println(""); // Pula uma linha
  
  display.print("Bomba (1->2): ");
  // Se o pino estiver LOW, significa que o relé está LIGADO (ativo em baixo)
  display.println(digitalRead(RELE_BOMBA_A_PIN) == LOW ? "LIGADA" : "OFF");

  display.print("Bomba (2->1): ");
  display.println(digitalRead(RELE_BOMBA_B_PIN) == LOW ? "LIGADA" : "OFF");
  
  display.setCursor(0, 56);
  display.print("Estado: ");
  
  switch(estadoAtual) {
    case OCIOSO: display.print("Ocioso"); break;
    case ENCHENDO_CX2: display.print("Enchendo CX2"); break;
    case PAUSA_PARA_ENCHER_CX1: display.print("Pausa..."); break;
    case ENCHENDO_CX1: display.print("Enchendo CX1"); break;
    case PAUSA_PARA_ENCHER_CX2: display.print("Pausa..."); break;
    case FALHA_SINAL: display.print("FALHA DE SINAL"); break;
  }

  display.display();
}

// Funções auxiliares para ligar/desligar as bombas com segurança
void ligarBombaA() {
  digitalWrite(RELE_BOMBA_B_PIN, HIGH); // Garante que a bomba B está desligada
  digitalWrite(RELE_BOMBA_A_PIN, LOW);  // Liga a bomba A (ativo em baixo)
}

void ligarBombaB() {
  digitalWrite(RELE_BOMBA_A_PIN, HIGH); // Garante que a bomba A está desligada
  digitalWrite(RELE_BOMBA_B_PIN, LOW);  // Liga a bomba B
}

void desligarTodasBombas() {
  digitalWrite(RELE_BOMBA_A_PIN, HIGH);
  digitalWrite(RELE_BOMBA_B_PIN, HIGH);
}
