# Sprint3edge
![logogs-removebg-preview](https://github.com/Rodrigo-Brasileiro/caseHeinz/assets/126472820/2cd126f6-513e-4762-bfc2-2e14e4d12019)

<h2>Problema:</h2>

  <p>A demora da chegada de ambulâncias até pacientes é um dos causadores da piora do quadro ou até mesmo morte da vítima. Em caso mais graves, como parada cardio-respiratória, cada segundo sem as manobras de ressucitação diminuem significamente as chances de sobrevivência, visto que segundo médico Laélcio dos Santos, para poder atender com maior eficácia, deve-se chegar ao local do acidente em até 12 minutos, sendo esse o ideal para todos os serviços pré-hospitalar no mundo.</p>
  
  <p>Em contrapartida, dados da prefeitura de São Paulo indicam que o tempo médio da demora do SAMU em ocorrências de alta gravidade(parada cardiorrespiratória) é de 24 minutos. Esse fato, ocorre em virtude da falta de preferência e trânsito da   cidade de São Paulo, enfatizado pelo coordenador de atendimento do SAMU, Samaroni Brelaz "Hoje a nossa maior dificuldade, se tratando de acidente, é o nosso tempo resposta. É o tempo que a gente vai se deslocar da nossa base até a vítima. A nossa cirene vai ligada, mas os condutores acabam não respeitando e dificultando o nosso acesso" </p>
  
  <p>Algumas medidas para ajudar já foram impostas, entretanto, não são suficientes para concientização da população, de acordo com o Código de Trânsito Brasileiro (CTB), o condutor que deixar de dar passagem aos veículos de emergência que estão em serviço comete infração gravíssima, com sete pontos na Carteira Nacional de Habilitação (CNH) e recebe multa de R$ 293 e caso alguém siga a ambulância para tentar alguma vantagem, o CTB possui multa que previne tal atitude, em conformidade com a fala de Daniel Mota, instrutor de trânsito, "Todo condutor, ao observar uma viatura, seja do Samu, dos Bombeiros, da polícia e fiscalização, que ceda passagem. O CTB é muito claro quando epedifica essa questão". Pensando nessa fala que criou-se a solução para a problemática </p>
  
<h2>Solução:</h2>
 <p>O Objetivo da solução é conseguir identificar uma ambulância a caminho de um semáforo e, caso esteja perto, abrir o corredor de ambulância com um LED AZUL. Pensando nisso, a nossa empresa, Tech Pulse Global Network, desenvolveu um sistema baseado na utilização de uma Tag id, um dispositivo que usado para rastrear ou identificar objetos (nesse caso a ambulância), junto com um microcontrolador ESP32. Desse modo, resumidamente quando uma ambulância se aproxima, envia o sinal da sua tag com um ID(ID=ambulancia) ao ESP32, em sequência, o mesmo envia os dados da tag via processo Message Queuing Telemetry Transport(MQTT), que é um protocolo de comunicação leve e eficiente projetado para troca de mensagens em redes com largura de banda limitada ao Fiware(plataforma com aplicação que verifica o ID) que retorna um valor de saída, ou seja, decindindo se abre ou não o corredor da ambulância.</p>
  
  <h3>Componentes</h3>
  <p>Para implementar a solução você precisará dos seguintes componentes que estão distribuídos em duas etapas, são elas a etapa física e virtual. Para a etapa física, será necessário:
      <ol>Um módulo Leitor RFID-RC522, será adicionado a farol que precisa ser alterado;</ol>
      <ol>Um cartão RFID, acoplado na ambulância, ele carrega o ID para ser identificado pelo leitor;</ol>
      <ol>Um microcontrolador ESP32, responsável guardar as informações e consegui-lás transmitir via processo MQTT.</ol> 
   <p> A segunda etapa é após o microcontrolador enviar os dados via MQTT, para essa etapa, utilizamos uma plataforma chamada fiware.</p>
  
  <p>Primeiramente, para a utilização desse software, é necessário alguns pré-requisitos, o primeiro é uma VirtualMachine(VM), a qual simulará Linux, nesse caso o Ubuntu. Dentro da máquina, realiza-se a instalação de ferramentas que facilitam criação, o gerenciamento e a execução de contêineres de aplicativos que serão usados nessa parte do projeto, por último realiza-se a instação do Fiware, agora mais profundamente, é uma plataforma aberta de código destinados a operação como back-end, com o intuito de facilitar as aplicações para smart cities(cidades inteligentes), Inthernet of Things(IoT ou internet das coisas) e sistemas baseados em dados contextuas em tempo real, tudo que condiz com o propósito da solução.Essa plataforma fornece um conjunto APIs (Interfaces de Programação de Aplicativos) e ferramentas que simplificam a criação de soluções inovadoras para melhorar a qualidade de vida nas cidades e impulsiona a transformação digital em diversos setores. </p>
  
  <p>A plataforma consta com uns componentes complementares, são eles:</p>
  
  <h4>Orion Context Broker </h4>
  
  <p>Orion Context Broker é responsável gestão de contextos, que envolve a coleta, armazenamento e disponibilização de informações contextuais relevantes, como dados de sensores, informações de localização e estados de dispositivos, ou seja, útil para gestão das tagid. </p>
  
  <h4>MongoDB</h4>
  
  <p>O MongoDB é um sistema de banco de dados NoSQL usado na plataforma FIWARE para armazenar dados contextuais provenientes do Orion Context Broker e de outros componentes. Ele suporta documentos JSON flexíveis, possui recursos avançados para consultas e escalabilidade horizontal, tornando-o adequado para lidar com grandes volumes de dados na plataforma FIWARE.</p>
  
   <h4>Eclipse-Mosquitto</h4>
   
   <p>O Eclipse Mosquitto é um broker MQTT usado na plataforma FIWARE para facilitar a troca de mensagens entre dispositivos IoT e outros componentes. Ele suporta recursos de autenticação, segurança e controle de acesso, fornecendo uma solução escalável e configurável para a comunicação MQTT na plataforma FIWARE. Os dados são armazenados no tópico TEF (Telemetria e Monitoramento de Equipamentos).</p>

   
   <p>Para a instalação e configuração do Fiware, sugerimos o documento no link 1 das referências.</p>
   
   <p>Para a instalação e configuração de VM e Ubuntu, sugerimos os links 2 e 3 das referências</p>  
   
   <h3>Arquitetura da solução:</h3>
   
  ![Arquitetura (1)](https://github.com/Rodrigo-Brasileiro/Sprint3edge/assets/126472820/9108888d-c98e-4f44-8a84-7029202559f3)

   
   <h2>Tecnologia usada e como iniciar o projeto</h2>
   <ol>Para esse projeto, utilizamos a IDE do arduino para programar o ESP32, desse modo, toda a linguagem é em c++. já para a aplicação do Fiware, ela é toda configurada em python;</ol>
   <ol>Para toda a configuração do RFID, utilizamos a biblioteca disponível na IDE do arduino MFRC522, após a instalação da biblioteca, basta utilizar o códigos que disponibilizamos e gravar o código no ESP.</ol>
   <ol>Em seguida, ligue sua máquina virtual e estebeleça os passos do Fiware e teste o programa.</ol>


 <h3>Referências</h3>
 <p>As nossas referências foram</p>
     <ol><li>Link: https://github.com/fabiocabrini/fiware</li>
         <li>Link: https://www.youtube.com/watch?v=nyWI3xl_LUA </li>
         <li>Link: https://www.youtube.com/watch?v=-djV2392b-s </li>
         <li>Link: https://www.brasildefato.com.br/2019/06/06/por-que-o-samu-demora-tanto-na-capital-paulista#:~:text=De%20acordo%20com%20dados%20fornecidos,pode%20chegar%20a%20duas%20horas </li>
         <li>Link: https://g1.globo.com/pa/santarem-regiao/noticia/falta-de-preferencia-dificulta-passagem-de-ambulancias-do-samu-em-santarem.ghtml</li>
     </ol>
