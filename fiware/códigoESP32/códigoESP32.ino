#include <WiFi.h>
#include <PubSubClient.h>
#include <MFRC522.h>
#include <SPI.h>

// Define os pins do MFRC522
#define RST_PIN 5
#define SS_PIN 21

// Define as configurações do RFID
MFRC522 mfrc522(SS_PIN, RST_PIN);

// Define as credenciais WiFi
const char* SSID = "ssid";
const char* PASSWORD = "password";

// Define as configurações MQTT
const char* BROKER_MQTT = "ip_host_fiware";
int BROKER_PORT = 1883;
const char* TOPICO_SUBSCRIBE = "/TEF/lamp001/cmd";
const char* TOPICO_PUBLISH = "/TEF/lamp001/attrs";

// Define o ID MQTT
const char* ID_MQTT = "fiware_00";

WiFiClient espClient;
PubSubClient MQTT(espClient);

int D4 = 2;

char EstadoSaida = '0';

void initSerial() {
  Serial.begin(115200);
}

void initWiFi() {
  delay(10);
  Serial.println("------Conexao WI-FI------");
  Serial.print("Conectando-se na rede: ");
  Serial.println(SSID);
  Serial.println("Aguarde");

  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Conectado com sucesso na rede ");
  Serial.print(SSID);
  Serial.println("IP obtido: ");
  Serial.println(WiFi.localIP());
}

void initMQTT() {
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);
  MQTT.setCallback(mqtt_callback);
}

void mqtt_callback(char* topic, byte* payload, unsigned int length) {
  String msg;

  for (int i = 0; i < length; i++) {
    char c = (char)payload[i];
    msg += c;
  }

  Serial.print("- Mensagem recebida: ");
  Serial.println(msg);

  if (msg.equals("lamp001@on|")) {
    digitalWrite(D4, HIGH);
    EstadoSaida = '1';
  }

  if (msg.equals("lamp001@off|")) {
    digitalWrite(D4, LOW);
    EstadoSaida = '0';
  }
}

void reconnectMQTT() {
  while (!MQTT.connected()) {
    Serial.print("* Tentando se conectar ao Broker MQTT: ");
    Serial.println(BROKER_MQTT);

    if (MQTT.connect(ID_MQTT)) {
      Serial.println("Conectado com sucesso ao broker MQTT!");
      MQTT.subscribe(TOPICO_SUBSCRIBE);
    } else {
      Serial.println("Falha ao reconectar no broker.");
      Serial.println("Havera nova tentativa de conexao em 2s");
      delay(2000);
    }
  }
}

void reconectWiFi() {
  if (WiFi.status() == WL_CONNECTED)
    return;

  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Conectado com sucesso na rede ");
  Serial.print(SSID);
  Serial.println("IP obtido: ");
  Serial.println(WiFi.localIP());
}

void VerificaConexoesWiFIEMQTT(void) {
  if (!MQTT.connected())
    reconnectMQTT();

  reconectWiFi();
}

void EnviaEstadoOutputMQTT(void) {
  if (EstadoSaida == '1') {
    MQTT.publish(TOPICO_PUBLISH, "s|on");
    Serial.println("- Semáforo azul Ligado");
  }

  if (EstadoSaida == '0') {
    MQTT.publish(TOPICO_PUBLISH, "s|off");
    Serial.println("- Semáforo azul Desligado");
  }

  Serial.println("- Estado do LED onboard enviado ao broker!");
  delay(1000);
}

void InitOutput(void) {
  pinMode(D4, OUTPUT);
  digitalWrite(D4, HIGH);

  boolean toggle = false;

  for (int i = 0; i <= 10; i++) {
    toggle = !toggle;
    digitalWrite(D4, toggle);
    delay(200);
  }
}

void setup() {
  InitOutput();
  initSerial();
  initWiFi();
  initMQTT();
  SPI.begin(); // Inicializa a interface SPI
  mfrc522.PCD_Init(); // Inicializa o MFRC522
  delay(5000);
  MQTT.publish(TOPICO_PUBLISH, "s|on");
}

void loop() {
  VerificaConexoesWiFIEMQTT();
  EnviaEstadoOutputMQTT();

  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    // Verifica se o cartão/tag é "ambulancia"
    String tagData = "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      tagData += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
      tagData += String(mfrc522.uid.uidByte[i], HEX);
    }

    if (tagData == "ambulancia") {
      // Coloque aqui o código para abrir o semáforo (defina a lógica conforme necessário)
      digitalWrite(D4, HIGH); // Exemplo: abre o semáforo quando a ambulância se aproxima
    }
    delay(1000); // Delay para evitar leituras múltiplas
  }

  MQTT.loop();
}
