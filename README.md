# Sprint4edge
![logogs-removebg-preview](https://github.com/Rodrigo-Brasileiro/caseHeinz/assets/126472820/2cd126f6-513e-4762-bfc2-2e14e4d12019)

<h2>Problema:</h2>

  <p>A demora da chegada de ambulâncias até pacientes é um dos causadores da piora do quadro ou até mesmo morte da vítima. Em caso mais graves, como parada cardio-respiratória, cada segundo sem as manobras de ressucitação diminuem significamente as chances de sobrevivência, visto que segundo médico Laélcio dos Santos, para poder atender com maior eficácia, deve-se chegar ao local do acidente em até 12 minutos, sendo esse o ideal para todos os serviços pré-hospitalar no mundo.</p>
  
  <p>Em contrapartida, dados da prefeitura de São Paulo indicam que o tempo médio da demora do SAMU em ocorrências de alta gravidade(parada cardiorrespiratória) é de 24 minutos. Esse fato, ocorre em virtude da falta de preferência e trânsito da   cidade de São Paulo, enfatizado pelo coordenador de atendimento do SAMU, Samaroni Brelaz "Hoje a nossa maior dificuldade, se tratando de acidente, é o nosso tempo resposta. É o tempo que a gente vai se deslocar da nossa base até a vítima. A nossa cirene vai ligada, mas os condutores acabam não respeitando e dificultando o nosso acesso" </p>
  
  <p>Algumas medidas para ajudar já foram impostas, entretanto, não são suficientes para concientização da população, de acordo com o Código de Trânsito Brasileiro (CTB), o condutor que deixar de dar passagem aos veículos de emergência que estão em serviço comete infração gravíssima, com sete pontos na Carteira Nacional de Habilitação (CNH) e recebe multa de R$ 293 e caso alguém siga a ambulância para tentar alguma vantagem, o CTB possui multa que previne tal atitude, em conformidade com a fala de Daniel Mota, instrutor de trânsito, "Todo condutor, ao observar uma viatura, seja do Samu, dos Bombeiros, da polícia e fiscalização, que ceda passagem. O CTB é muito claro quando epedifica essa questão". Pensando nessa fala que criou-se a solução para a problemática </p>
  
  <p>Click <a href="https://www.brasildefato.com.br/2019/06/06/por-que-o-samu-demora-tanto-na-capital-paulista#:~:text=De%20acordo%20com%20dados%20fornecidos,pode%20chegar%20a%20duas%20horas](https://g1.globo.com/pa/santarem-regiao/noticia/falta-de-preferencia-dificulta-passagem-de-ambulancias-do-samu-em-santarem.ghtml)"> aqui </a> para saber mais sobre a falta de preferência de ambulâncias.</p>
  <p>Click <a href="https://www.brasildefato.com.br/2019/06/06/por-que-o-samu-demora-tanto-na-capital-paulista#:~:text=De%20acordo%20com%20dados%20fornecidos,pode%20chegar%20a%20duas%20horas">aqui</a> para obter mais informações sobre a demora do SAMU na capital paulista. </p>  
<h2>Solução:</h2>
 <p>O Objetivo da solução é conseguir identificar uma ambulância a caminho de um semáforo e, caso esteja perto, abrir o corredor de ambulância com um LED AZUL. Pensando nisso, a nossa empresa, Tech Pulse Global Network, desenvolveu um sistema baseado na utilização de uma Tag id, um dispositivo que usado para rastrear ou identificar objetos (nesse caso a ambulância), junto com um microcontrolador ESP32. Desse modo, resumidamente quando uma ambulância se aproxima, envia o sinal da sua tag com um ID(ID=ambulancia) ao ESP32, em sequência, o mesmo envia os dados da tag via processo Message Queuing Telemetry Transport(MQTT), que é um protocolo de comunicação leve e eficiente projetado para troca de mensagens em redes com largura de banda limitada ao Fiware(plataforma com aplicação que verifica o ID) que retorna um valor de saída, ou seja, decindindo se abre ou não o corredor da ambulância.</p>
  
  <h3>Componentes</h3>
    <p>Para implementar a solução você precisará dos seguintes componentes que estão distribuídos em duas etapas, são elas a etapa física e virtual. Para a etapa física, será necessário:
      <ol>Um módulo Leitor RFID-RC522, será adicionado a farol que precisa ser alterado;</ol>
      <ol>Um cartão RFID, acoplado na ambulância, ele carrega o ID para ser identificado pelo leitor;</ol>
      <ol>Um microcontrolador ESP32, responsável guardar as informações e consegui-lás transmitir via processo MQTT;</ol> 
      <ol>O LED AZUL, nesse protótipo será o led da placa do próprio ESP32;</ol>
      <ol>Dois modulos de semáforo, eles são preciso para simular um cruzamento e conseguir ver com maior eficácia o intuito da solução.</ol>
      <p>Tendo esses componentes, basta seguir a foto da montagem disponibilizda nos arquivos e utilizando Arduino IDE, pegar o código disponibilizado nesse repositório e gravar no microcontrolador ESP32.</p>
      <p> A segunda etapa é após o microcontrolador enviar os dados via MQTT, para essa etapa, utilizamos uma plataforma chamada fiware.</p>
      <p>Caso haja necessidade, há um tutorial dessa etapa, além da explicação de todo o projeto no youtube, basta clicar <a href="https://www.youtube.com/watch?v=XG2X_O7UfWo&t=3s">aqui</a></p>
   <p>Primeiramente, para a utilização desse software, é necessário alguns pré-requisitos, o primeiro é uma máquina virtual VirtualMachine(VM), a qual simulará um sistema Linux, nesse caso o Ubuntu. Dentro da máquina, realiza-se a instalação de ferramentas que facilitam criação, o gerenciamento e a execução de contêineres de aplicativos que serão usados nessa parte do projeto, por último realiza-se a instação do Fiware, agora mais profundamente, é uma plataforma aberta de código destinados a operação como back-end, com o intuito de facilitar as aplicações para smart cities(cidades inteligentes), Inthernet of Things(IoT ou internet das coisas) e sistemas baseados em dados contextuas em tempo real, tudo que condiz com o propósito da solução.Essa plataforma fornece um conjunto APIs (Interfaces de Programação de Aplicativos) e ferramentas que simplificam a criação de soluções inovadoras para melhorar a qualidade de vida nas cidades e impulsiona a transformação digital em diversos setores. </p>

  <h3>Instação da máquina virtual</h3>
    <p>A princípio, os requisitos de hardware para essa etapa são:</p>

   <ol>Núcleos de Processamento - **1vCPU**</ol>
   <ol>Memória RAM - **1GB** </ol>
   <ol>Armazenamento Secundário Mínimo - **20GB HD e/ou SSD**</ol>
     <p>Tendo essa etapa concluída, primeiro passo é entrar nesse <a href="https://www.virtualbox.org">site</a> e clicar no botão download para fazer a instação da máquina virtual, no nosso caso a VirtualBox. O próximo é instalar o programa que usaremos, nessa situação, o Ubuntu versão 22.04lts, nesse <a href="https://ubuntu.com/download/server">site</a>. O terceiro passo é criar e configurar a máquina, basta clicar no botão "novo" dentro do VirtualBox, em sequência dê o nome "ubuntu" a sua máquina, e clique em próximo até finalizar. Finalizado, marque a máquina criada e selecione a opção "configurações", nesse momento vá em armazenamento e do lado direito estará uma aba para adicionar o arquivo ubuntu que você baixou, após isso só iniciar a máquina e realizar as configuralções iniciais de usuário.</p>
  <h4>Inicialização</h4>
    <p>A primeira etapa após abrir o sistema Linux é abrir o terminal, feito isso, é preciso fazer a instalação de uma ferramenta chamada docker compose que faciliata a criação, gerenciamento e execução de contêiners de aplicativos, para isso, clique <a href="https://docs.docker.com/engine/install/ubuntu/"> aqui</a> e siga as instruções. Conluída essa etapa, seguimos para a instalação e inicialização do Fiware, faça esses comandos no terminal:</p>
      <ol> git clone https://github.com/Rodrigo-Brasileiro/Sprint3edge - para copiar todos os arquivos disponíveis nesse repositório </ol>
      <ol> cd fiware - para entrar na pasta fiware </ol>
      <ol> docker compose up -d - para abrir as portas do fiware </ol>
    <p>Nesse instante, vamos verificar se está tudo correto com as portas abertas, para isso, vamos no site <a href="https://www.postman.com">postman</a> que é site de suporte de API que usaremos como comunicador e receptor de respostas do ESP32, crie uma conta e um "my workspace", jogue os arquivos do repositório desse github, vá na pasta 1.1, crie uma variável chamada url com seu enderço de IP e clique em send, com a resposta OK, a porta está saúdavel.</p>
    <p> Agora, basta testar o programa, primeiramente precisa criar na porta 3 sua varíavel, terminado isso, basta ligar o esp32 enviando dados e solicitá-los com a portas 17. Quando finalizar o programa, para fechar as portas, basta escrever o comando: docker compose down</p>

  <h3>Componentes Complementares</h3>
   <p>A plataforma do Fiware conta com componentes complementares que vale a pena serem comentados, são eles:</p>
  <h4>Orion Context Broker </h4>
  
  <p>Orion Context Broker é responsável gestão de contextos, que envolve a coleta, armazenamento e disponibilização de informações contextuais relevantes, como dados de sensores, informações de localização e estados de dispositivos, ou seja, útil para gestão das tagid. </p>
  
  <h4>STH Comet</h4>
   <p>O STH-Comet, uma parte essencial da plataforma FIWARE, desempenha um papel fundamental na preservação em grande escala de informações contextuais passadas. Sua colaboração com o Orion Context Broker permite a captura, armazenamento e consulta eficientes de dados       históricos. Com capacidades avançadas, como o armazenamento otimizado de séries temporais e a realização de consultas agregadas e de séries temporais, o STH-Comet oferece uma interface RESTful para a interação, permitindo aos desenvolvedores acessar e analisar           dados passados de maneira ágil. Em suma, o STH-Comet simplifica o armazenamento e a recuperação de informações contextuais históricas na estrutura FIWARE.</p>
   <p>Clique <a href="https://github.com/Rodrigo-Brasileiro/Sprint3edge/blob/main/sth-comet-architecture.png">aqui </a> para compreender melhor sobre o funcionamento do sthcomet. </p>
   
  
  <h4>MongoDB</h4>
  
  <p>O MongoDB é um sistema de banco de dados NoSQL usado na plataforma FIWARE para armazenar dados contextuais provenientes do Orion Context Broker e de outros componentes. Ele suporta documentos JSON flexíveis, possui recursos avançados para consultas e escalabilidade horizontal, tornando-o adequado para lidar com grandes volumes de dados na plataforma FIWARE.</p>
  
   <h4>Eclipse-Mosquitto</h4>
   
   <p>O Eclipse Mosquitto é um broker MQTT usado na plataforma FIWARE para facilitar a troca de mensagens entre dispositivos IoT e outros componentes. Ele suporta recursos de autenticação, segurança e controle de acesso, fornecendo uma solução escalável e configurável para a comunicação MQTT na plataforma FIWARE. Os dados são armazenados no tópico TEF (Telemetria e Monitoramento de Equipamentos).</p>
   
   <h3>Arquitetura da solução:</h3>
   
  ![Arquitetura (1)](https://github.com/Rodrigo-Brasileiro/Sprint3edge/assets/126472820/9108888d-c98e-4f44-8a84-7029202559f3)

   
   <h2>Tecnologia usada e como iniciar o projeto</h2>
   
   <ol>Para esse projeto, utilizamos a IDE do arduino para programar o ESP32, desse modo, toda a linguagem é em c++. Entretanto, primeiramente é preciso instalar o pacote do ESP32 da espressif, seguindo <a herf="https://www.youtube.com/watch?v=Ozr1SXwir9g">esse</a> tutorial. Agora para a aplicação do Fiware, ela é toda configurada em python, abordada no tópico seguinde;</ol>
   <ol>Para toda a configuração do RFID, utilizamos as bibliotecas disponíveis na IDE do arduino, MFRC522 ( by github community)  e para configurar o sistema a internet e protocolo mqtt utilizamos a biblioteca PubSubClient(by nick o'lary). Terminado isso basta utilizar o códigos que disponibilizamos e gravar o código no ESP32.</ol>
   <ol>Em seguida, ligue sua máquina virtual e estebeleça os passos do Fiware e teste o programa como supracitado.</ol>
   <p>Clique <a href="https://github.com/Rodrigo-Brasileiro/Sprint3edge/blob/main/montagemRFID.jpg">aqui </a> para acessar a foto para realizar a montagem do leitor rfid </p>
   <p>Clique <a href="https://github.com/Rodrigo-Brasileiro/Sprint3edge/blob/main/codigoESP32/codigoSPRINT4.ino">aqui</a> para visualizar o código do ESP32.</p>
  <h3>Dashboard para análise:</h3>
  <p>No intuito de deixar mais fácil a compreensão das leituras dos dados, foi criado um dashboard em python, o qual tem diversas funções, como a identificação de novas ambulâncias, porcentagem de passagem(o quanto cada ambulância passou) e quantos carros de emergência passaram em seu total.</p>
  
  <p>Clique <a href="https://github.com/Rodrigo-Brasileiro/Sprint3edge/tree/main/DASHBOARD">aqui </a> para acessar o código do dashboard em python. Para utiliza-lá, basta baixar os arquivos e os executar em um ambiente apropriado, como Visual Studio Code. </

![image](https://github.com/Rodrigo-Brasileiro/Sprint3edge/assets/126472820/47ef8be8-23c3-445a-abc8-9b1044b6184e)
![image](https://github.com/Rodrigo-Brasileiro/Sprint3edge/assets/126472820/c80f31a4-bab1-4ea5-a06e-d65eba9f9510)

<h3>Aplicativo para Socorristas</h3>
<p>Ademais do dashboard em python, foi criado um site simula a interface de um aplicativo de rotas para veículos de emergências. Nele, é utilizado sistema GPS para verificação da localização do usuário até o hospital. Esse aplicativo é utilizado por socorristas para chegar até o local da ocorrência ou do hospital mais rapidamente. Além disso, é possível também enviar um diagnóstico prévio ao hospital para agilizar o atendimento do paciente, onde será informado os sintomas e procedimentos realizados na ocorrência. Para sua aplicação, basta pacotes React-router-dom, Styled Componentes, bootstrap, react-bootstrap e Sass pelo próprio VS code, por basta último executar o código.</p>

<p>Acesse esse link "ambuzone-tpgn.netlify.app" para acessar o site.</p>
<p>Clique <a href= "https://github.com/Rodrigo-Brasileiro/Sprint3edge/tree/main/ambuzone-sprint4/ambuzone">aqui</a> para acessar os arquivos para reprodução do site.</p>

 <h3>Referências</h3>
 <p>Buscando mais informações e aprimoramento, nossas referências foram:</p>
     <ol><li>Link: https://github.com/fabiocabrini/fiware</li>
         <li>Link: https://www.youtube.com/watch?v=nyWI3xl_LUA </li>
         <li>Link: https://www.youtube.com/watch?v=-djV2392b-s </li>
        <li> Link: https://www.fernandok.com/2018/02/esp32-com-rfid-controle-de-acesso.html</li>
     </ol>
