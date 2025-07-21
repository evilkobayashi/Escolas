// CÓDIGO ATUALIZADO PARA O ARDUINO TRANSMISSOR (CAIXA D'ÁGUA 1)

#include <RCSwitch.h> // Usa a mesma biblioteca que você já tem

RCSwitch transmissor = RCSwitch();

// Pinos dos sensores, conforme seu diagrama
#define SENSOR_25_PIN  4
#define SENSOR_50_PIN  5
#define SENSOR_75_PIN  6
#define SENSOR_100_PIN 7

// Pinos dos LEDs, conforme seu diagrama
#define LED_25_PIN  8
#define LED_50_PIN  9
#define LED_75_PIN  10
#define LED_100_PIN 11

void setup() {
  // Configura os pinos dos LEDs como saída
  pinMode(LED_25_PIN, OUTPUT);
  pinMode(LED_50_PIN, OUTPUT);
  pinMode(LED_75_PIN, OUTPUT);
  pinMode(LED_100_PIN, OUTPUT);

  // Configura os pinos dos sensores como entrada com pull-up.
  // Isso significa que o pino lerá HIGH quando o sensor estiver aberto (sem água)
  // e LOW quando o sensor fechar para o GND (com água).
  pinMode(SENSOR_25_PIN, INPUT_PULLUP);
  pinMode(SENSOR_50_PIN, INPUT_PULLUP);
  pinMode(SENSOR_75_PIN, INPUT_PULLUP);
  pinMode(SENSOR_100_PIN, INPUT_PULLUP);

  // Configuração do transmissor, igual ao seu código original
  transmissor.enableTransmit(12); // Pino D12 para transmitir dados
  transmissor.setProtocol(6);
}

void loop() {
  int nivel = 0;

  // Lê os sensores. A lógica agora é: se o sensor está em LOW, o nível foi atingido.
  bool nivel_25_atingido  = (digitalRead(SENSOR_25_PIN) == LOW);
  bool nivel_50_atingido  = (digitalRead(SENSOR_50_PIN) == LOW);
  bool nivel_75_atingido  = (digitalRead(SENSOR_75_PIN) == LOW);
  bool nivel_100_atingido = (digitalRead(SENSOR_100_PIN) == LOW);

  // Determina o nível percentual com base nos sensores
  if (nivel_25_atingido)  nivel = 25;
  if (nivel_50_atingido)  nivel = 50;
  if (nivel_75_atingido)  nivel = 75;
  if (nivel_100_atingido) nivel = 100;

  // Acende os LEDs correspondentes ao nível (LOW = aceso, se o LED estiver conectado ao 5V)
  // Se os LEDs estiverem conectados ao GND, inverta a lógica (HIGH acende).
  // O seu diagrama mostra os LEDs conectados ao 5V, então LOW acende.
  digitalWrite(LED_25_PIN, !nivel_25_atingido);
  digitalWrite(LED_50_PIN, !nivel_50_atingido);
  digitalWrite(LED_75_PIN, !nivel_75_atingido);
  digitalWrite(LED_100_PIN, !nivel_100_atingido);
  
  // Para simplificar, enviaremos o próprio valor do nível (0, 25, 50, 75, 100)
  // O receptor vai procurar por esses números simples.
  transmissor.send(nivel, 24);

  delay(2000); // Pausa de 2 segundos entre as transmissões
}
