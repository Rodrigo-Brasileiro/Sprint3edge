#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <PubSubClient.h> // Importa a Biblioteca PubSubClient
 
//defines:
//defines de id mqtt e tópicos para publicação e subscribe denominado TEF(Telemetria e Monitoramento de Equipamentos)
#define TOPICO_SUBSCRIBE    "/TEF/Rfid008/cmd"        //tópico MQTT de escuta
#define TOPICO_PUBLISH      "/TEF/Rfid008/attrs"      //tópico MQTT de envio de informações para Broker
#define TOPICO_PUBLISH_2    "/TEF/Rfid008/attrs/i"    //tópico MQTT de envio de informações para Broker
                                                      //IMPORTANTE: recomendamos fortemente alterar os nomes
                                                      //            desses tópicos. Caso contrário, há grandes
                                                      //            chances de você controlar e monitorar o ESP32
                                                      //            de outra pessoa.
#define ID_MQTT  "fiware_Rfid_008"      //id mqtt (para identificação de sessão)
                                 //IMPORTANTE: este deve ser único no broker (ou seja, 
                                 //            se um client MQTT tentar entrar com o mesmo 
                                 //            id de outro já conectado ao broker, o broker 
                                 //            irá fechar a conexão de um deles).
                                 // o valor "n" precisa ser único!
int buzzer = 2;
const int RST_PIN = 22;  // Pino de reset do MFRC522
const int SS_PIN = 21;   // Pino de seleção do escravo do MFRC522
const int greenLedPin = 12;  // Pino do LED verde
const int yellowLedPin = 13; // Pino do LED amarelo
const int redLedPin = 14;    // Pino do LED vermelho
const int greenLedPin1 = 27;  // Pino do LED verde
const int yellowLedPin1 = 26; // Pino do LED amarelo
const int redLedPin1 = 25; // Pino do LED vermelho
const int blueLedPin = 33;
// Servos

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Crie uma instância do MFRC522   

// Servos
   // Crie uma instância do Servo_ESP32

byte predefinidoUID[] = {0x13, 0xED, 0x3D, 0x13};
byte uid[4];

// WIFI
const char* SSID = "FIAP-IBM"; // SSID / nome da rede WI-FI que deseja se conectar
const char* PASSWORD = "Challenge@23!"; // Senha da rede WI-FI que deseja se conectar
  
// MQTT
const char* BROKER_MQTT = "46.17.108.113"; //URL do broker MQTT que se deseja utilizar
int BROKER_PORT = 1883; // Porta do Broker MQTT
 
int D4 = 2;

//Variáveis e objetos globais
WiFiClient espClient; // Cria o objeto espClient
PubSubClient MQTT(espClient); // Instancia o Cliente MQTT passando o objeto espClient
char EstadoSaida = '0';  //variável que armazena o estado atual da saída
  
//Prototypes
void initSerial();
void initWiFi();
void initMQTT();
void reconectWiFi(); 
void mqtt_callback(char* topic, byte* payload, unsigned int length);
void VerificaConexoesWiFIEMQTT(void);
void InitOutput(void);



/* 
 *  Implementações das funções
 */
void setup() 
{
    Serial.begin(9600);
    // meu código
    pinMode(2, OUTPUT);
    SPI.begin();          // Inicialize o barramento SPI
    mfrc522.PCD_Init();   // Inicialize o MFRC522
    mfrc522.PCD_DumpVersionToSerial();  // Mostre detalhes do leitor de cartão MFRC522
    Serial.println(F("Aproxime um cartão RFID..."));
    pinMode(greenLedPin, OUTPUT);  // Configure o pino do LED verde como saída
    pinMode(yellowLedPin, OUTPUT);  // Configure o pino do LED verde como saída
    pinMode(redLedPin, OUTPUT);  // Configure o pino do LED verde como saída
    pinMode(greenLedPin1, OUTPUT);  // Configure o pino do LED verde como saída
    pinMode(yellowLedPin1, OUTPUT);  // Configure o pino do LED verde como saída
    pinMode(redLedPin1, OUTPUT);  // Configure o pino do LED verde como saída
    pinMode(blueLedPin, OUTPUT); // configura o pino do LED azul como saída
    digitalWrite(greenLedPin, LOW);  // Desligue o LED verde no início
    digitalWrite(yellowLedPin, LOW);  // Desligue o LED verde no início
    digitalWrite(redLedPin, LOW);    // Desligue o LED vermelho no início
    digitalWrite(greenLedPin1, LOW);  // Desligue o LED verde no início
    digitalWrite(yellowLedPin1, LOW);  // Desligue o LED verde no início
    digitalWrite(redLedPin1, LOW);    // Desligue o LED vermelho no início
    digitalWrite(blueLedPin, LOW);

 

    while (!Serial);
    
    //inicializações:
    InitOutput();
    initSerial();
    initWiFi();
    initMQTT();
    delay(5000);
    MQTT.publish(TOPICO_PUBLISH, "s|on");
}
  
//Função: inicializa comunicação serial com baudrate 115200 (para fins de monitorar no terminal serial 
//        o que está acontecendo.
//Parâmetros: nenhum
//Retorno: nenhum
void initSerial() 
{
    Serial.begin(115200);
}
 
//Função: inicializa e conecta-se na rede WI-FI desejada
//Parâmetros: nenhum
//Retorno: nenhum
void initWiFi() 
{
    delay(10);
    Serial.println("------Conexao WI-FI------");
    Serial.print("Conectando-se na rede: ");
    Serial.println(SSID);
    Serial.println("Aguarde");
     
    reconectWiFi();
}
  
//Função: inicializa parâmetros de conexão MQTT(endereço do 
//        broker, porta e seta função de callback)
//Parâmetros: nenhum
//Retorno: nenhum
void initMQTT() 
{
    MQTT.setServer(BROKER_MQTT, BROKER_PORT);   //informa qual broker e porta deve ser conectado
    MQTT.setCallback(mqtt_callback);            //atribui função de callback (função chamada quando qualquer informação de um dos tópicos subescritos chega)
}
  
//Função: função de callback 
//        esta função é chamada toda vez que uma informação de 
//        um dos tópicos subescritos chega)
//Parâmetros: nenhum
//Retorno: nenhum
void mqtt_callback(char* topic, byte* payload, unsigned int length) 
{
    String msg;
     
    //obtem a string do payload recebido
    for(int i = 0; i < length; i++) 
    {
       char c = (char)payload[i];
       msg += c;
    }
    
    Serial.print("- Mensagem recebida: ");
    Serial.println(msg);
    
    //toma ação dependendo da string recebida:
    //verifica se deve colocar nivel alto de tensão na saída D0:
    //IMPORTANTE: o Led já contido na placa é acionado com lógica invertida (ou seja,
    //enviar HIGH para o output faz o Led apagar / enviar LOW faz o Led acender)
    if (msg.equals("lamp001@on|"))
    {
        digitalWrite(D4, HIGH);
        EstadoSaida = '1';
    }
 
    //verifica se deve colocar nivel alto de tensão na saída D0:
    if (msg.equals("lamp001@off|"))
    {
        digitalWrite(D4, LOW);
        EstadoSaida = '0';
    }
     
}
  
//Função: reconecta-se ao broker MQTT (caso ainda não esteja conectado ou em caso de a conexão cair)
//        em caso de sucesso na conexão ou reconexão, o subscribe dos tópicos é refeito.
//Parâmetros: nenhum
//Retorno: nenhum
void reconnectMQTT() 
{
    while (!MQTT.connected()) 
    {
        Serial.print("* Tentando se conectar ao Broker MQTT: ");
        Serial.println(BROKER_MQTT);
        if (MQTT.connect(ID_MQTT)) 
        {
            Serial.println("Conectado com sucesso ao broker MQTT!");
            MQTT.subscribe(TOPICO_SUBSCRIBE); 
        } 
        else
        {
            Serial.println("Falha ao reconectar no broker.");
            Serial.println("Havera nova tentatica de conexao em 2s");
            delay(2000);
        }
    }
}
  
//Função: reconecta-se ao WiFi
//Parâmetros: nenhum
//Retorno: nenhum
void reconectWiFi() 
{
    //se já está conectado a rede WI-FI, nada é feito. 
    //Caso contrário, são efetuadas tentativas de conexão
    if (WiFi.status() == WL_CONNECTED)
        return;
         
    WiFi.begin(SSID, PASSWORD); // Conecta na rede WI-FI
     
    while (WiFi.status() != WL_CONNECTED) 
    {
        delay(100);
        Serial.print(".");
    }
   
    Serial.println();
    Serial.print("Conectado com sucesso na rede ");
    Serial.print(SSID);
    Serial.println("IP obtido: ");
    Serial.println(WiFi.localIP());
}
 
//Função: verifica o estado das conexões WiFI e ao broker MQTT. 
//        Em caso de desconexão (qualquer uma das duas), a conexão
//        é refeita.
//Parâmetros: nenhum
//Retorno: nenhum
void VerificaConexoesWiFIEMQTT(void)
{
    if (!MQTT.connected()) 
        reconnectMQTT(); //se não há conexão com o Broker, a conexão é refeita
     
     reconectWiFi(); //se não há conexão com o WiFI, a conexão é refeita
}
 
//Função: envia ao Broker o estado atual do output 
//Parâmetros: nenhum
//Retorno: nenhum
void EnviaEstadoOutputMQTT(void)
{
    if (EstadoSaida == '1')
    {
      MQTT.publish(TOPICO_PUBLISH, "s|on");
      Serial.println("- Led Ligado");
    }
    if (EstadoSaida == '0')
    {
      MQTT.publish(TOPICO_PUBLISH, "s|off");
      Serial.println("- Led Desligado");
    }
    Serial.println("- Estado do LED onboard enviado ao broker!");
    delay(1000);
}
 
//Função: inicializa o output em nível lógico baixo
//Parâmetros: nenhum
//Retorno: nenhum
void InitOutput(void)
{
    //IMPORTANTE: o Led já contido na placa é acionado com lógica invertida (ou seja,
    //enviar HIGH para o output faz o Led apagar / enviar LOW faz o Led acender)
    pinMode(D4, OUTPUT);
    digitalWrite(D4, HIGH);
    
    boolean toggle = false;

    for(int i = 0; i <= 10; i++)
    {
        toggle = !toggle;
        digitalWrite(D4,toggle);
        delay(200);           
    }
}
 // Programação dos semáforos
 void semafaro1(){
  
  
  digitalWrite(greenLedPin, HIGH);
  digitalWrite(yellowLedPin, LOW);
  digitalWrite(redLedPin, LOW);
  leitura();
  delay(500);
  leitura();
  delay(500);
  leitura();
  delay(500);
  leitura();
  delay(500);
  leitura();
  delay(500);
  leitura();
  
  digitalWrite(greenLedPin, LOW);
  digitalWrite(yellowLedPin, HIGH);
  digitalWrite(redLedPin, LOW);
  leitura();
  delay(500);
  leitura();
  delay(500);
  leitura();
  delay(500);
  leitura();
  delay(500);
  leitura();
  
  digitalWrite(greenLedPin, LOW);
  digitalWrite(yellowLedPin, LOW);
  digitalWrite(redLedPin, HIGH);
  semafaro2();
  delay(500);
  leitura();
  delay(500);
  leitura();
  delay(500);
  leitura();
  delay(500);
  leitura();
  delay(500);
  leitura();
  delay(500);

  
  }
void semafaro2 (){
  while(digitalRead(redLedPin) == HIGH){
  	digitalWrite(greenLedPin1, HIGH);
	  digitalWrite(yellowLedPin1, LOW);
    digitalWrite(redLedPin1, LOW);
  	delay(2000);  
    
    digitalWrite(greenLedPin1, LOW);
    digitalWrite(yellowLedPin1, HIGH);
    digitalWrite(redLedPin1, LOW);
  	delay(1000); 
    
    digitalWrite(greenLedPin1, LOW);
    digitalWrite(yellowLedPin1, LOW);
    digitalWrite(redLedPin1, HIGH);
    semafaro1();
  	delay(1500); 
  }
}

void leitura(){

  bool compareUID(byte* uid1, byte* uid2);
  char msgBuffer[12]; 
  // Verifique se há um novo cartão presente
  
  //garante funcionamento das conexões WiFi e ao broker MQTT
  VerificaConexoesWiFIEMQTT();
 
    //envia o status de todos os outputs para o Broker no protocolo esperado
  EnviaEstadoOutputMQTT();
  
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return;
  }
  
  // Selecione um dos cartões
  if (!mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  

  // Obtenha o UID do cartão lido
  for (byte i = 0; i < 4; i++) {
    uid[i] = mfrc522.uid.uidByte[i];
    Serial.println(uid[i]);
    char msgBuffer[12]; // Declare a variável msgBuffer com tamanho suficiente para a conversão
    sprintf(msgBuffer, "%02X%02X%02X%02X", uid[0], uid[1], uid[2], uid[3]);  
    MQTT.publish(TOPICO_PUBLISH_2,msgBuffer);
    Serial.print("Código passado com sucesso");
    MQTT.loop();
  }
  
  if (compareUID(uid, predefinidoUID)) {
    // Se os UIDs coincidirem, acenda o LED verde
    tone(2, 220, 5000);
    digitalWrite(greenLedPin, HIGH);
    digitalWrite(yellowLedPin, LOW);
    digitalWrite(redLedPin, LOW);
    digitalWrite(greenLedPin1, LOW);
    digitalWrite(yellowLedPin1, LOW);
    digitalWrite(redLedPin1, HIGH);
    digitalWrite(blueLedPin, HIGH);
    delay(5000);
    digitalWrite(blueLedPin, LOW);
    semafaro1();
  }else {
    // Se os UIDs não coincidirem, acenda o LED vermelho
    // digitalWrite(redLedPin, HIGH);
    // delay(1000);  // Mantenha o LED vermelho aceso por 1 segundo
    // digitalWrite(redLedPin, LOW);  // Desligue o LED vermelho
  }
  
    // Aguarde um momento antes de procurar outro cartão
    delay(1000);
    
  
}


//programa principal
void loop() 
{   

    char msgBuffer[12]; // Declare a variável msgBuffer com tamanho suficiente para a conversão

    //garante funcionamento das conexões WiFi e ao broker MQTT
    VerificaConexoesWiFIEMQTT();
 
    //envia o status de todos os outputs para o Broker no protocolo esperado
    EnviaEstadoOutputMQTT();

   
    // Verifique se há um novo cartão presente
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return;
  }
  
  // Selecione um dos cartões
  if (!mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  

  // Obtenha o UID do cartão lido
  for (byte i = 0; i < 4; i++) {
    uid[i] = mfrc522.uid.uidByte[i];
    Serial.println(uid[i]);
    char msgBuffer[12]; // Declare a variável msgBuffer com tamanho suficiente para a conversão
  }
  semafaro1();
  
  // // Compare o UID do cartão com o UID predefinido
  // if (compareUID(uid, predefinidoUID)) {
  //   // Se os UIDs coincidirem, acenda o LED verde
  //   digitalWrite(greenLedPin, HIGH);
  //   digitalWrite(yellowLedPin, LOW);
  //   digitalWrite(redLedPin, LOW);
  //   digitalWrite(greenLedPin1, LOW);
  //   digitalWrite(yellowLedPin1, LOW);
  //   digitalWrite(redLedPin1, HIGH);
  //   digitalWrite(blueLedPin, HIGH);
  //   delay(5000);
  //   digitalWrite(blueLedPin, LOW);
  //   semafaro1();
  // } else {
  //   // Se os UIDs não coincidirem, acenda o LED vermelho
  //   // digitalWrite(redLedPin, HIGH);
  //   // delay(1000);  // Mantenha o LED vermelho aceso por 1 segundo
  //   // digitalWrite(redLedPin, LOW);  // Desligue o LED vermelho
  // }
  
    
  // sprintf(msgBuffer, "%02X%02X%02X%02X", uid[0], uid[1], uid[2], uid[3]);  
  // MQTT.publish(TOPICO_PUBLISH_2,msgBuffer);
  // MQTT.loop();
  // }
}
// Função para comparar dois arrays de bytes (UIDs)
bool compareUID(byte* uid1, byte* uid2) {
  for (int i = 0; i < 4; i++) {
    if (uid1[i] != uid2[i]) {
      return false;  // Os UIDs não coincidem
    }
  }
  return true;  // Os UIDs coincidem
}
