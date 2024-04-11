<div align="center">
  <img src="https://plusdin.com.br/box/uploads/2023/04/emprestimo-agiota.png" width="autro" height="100px"/>
  <img src="https://clipart.info/images/ccovers/1499955335whatsapp-icon-logo-png.png" width="auto" height="100px"/>
  <img src="https://plusdin.com.br/box/uploads/2023/04/emprestimo-agiota.png" width="autro" height="100px"/>
  <img src="https://clipart.info/images/ccovers/1499955335whatsapp-icon-logo-png.png" width="auto" height="100px"/>
  <img src="https://plusdin.com.br/box/uploads/2023/04/emprestimo-agiota.png" width="autro" height="100px"/>
  <h1>
    [WIP] Autoagiota
  </h1> 
  WhatsApp Bot (<a href="https://github.com/isabelleqga/autoagiotaDiscord">Versão para Discord</a>)
</div>

## :tropical_fish: Descrição
- O autoagiota é um bot para WhatsApp para gerenciar pagamentos mensais de um grupo de pessoas;
- Ele permite que o usuário admin registre os pagamentos feitos e fornece informações sobre os pagamentos em falta;
- Gera relatórios para que todos os membros do server vejam e acompanhem os pagamentos;
- Aplica pressão social para que os caloteiros se sintam envergonhados e paguem logo as parcelas.

## :penguin: Instalação
- <a href="https://www.youtube.com/watch?v=chjkFqyqIS4">Tutorial básico de como usar a biblioteca whatsapp-web.js</a>;
- Bibliotecas usadas:
  -  <a href="https://github.com/pedroslopez/whatsapp-web.js">whatsapp-web.js</a>
  -  <a href="https://github.com/gtanner/qrcode-terminal">qrcode-terminal</a>
  -  <a href="https://www.npmjs.com/package/fs-js">fs</a>

## :sloth: Configuração
- constants.js
  - admin = <NUMERO do usuário que poderá acessar os comandos de registrar pagamentos>
    - O formato é 'xxyyzzzzzzzz@c.us', onde xx = DDD do Brasil, yy = DDD do estado, zzzzzzzz = número sem o 9 extra
    - Exemplo: +55 80 99854-5201 => 558098545201@c.us  
  - value = <valor das cobranças, o bot trabalha com um valor igual para todas as parcelas>
  - method = <código pix que vai ser usado para receber os pagamentos>
  - commands = {<dicionário que relaciona os comandos ao nome de alguém, o nome deve ser igual a chave do JSON>}
  - (Opcional) emojis = {<dicionário de emoji para cada nome, opcional, serve apenas para deixar as mensagens mais personalizadas>}
- status.json
  - Cada nome inserido em commands deve ter um bloco no JSON referente a ele, com a chave sendo igual ao que foi inserido no dicionário. Template do bloco:
-       "Nome": {
          "janeiro": false,
          "fevereiro": false,
          "março": false,
          "abril": false,
          "maio": false,
          "junho": false,
          "julho": false,
          "agosto": false,
          "setembro": false,
          "outubro": false,
          "novembro": false,
          "dezembro": false
      }

## :star: Funcionalidades
- Comandos:
  - !{nome}{numero_mes}: Registra pagamento da pessoa em um mês específico e retorna lista de faltantes do mês. Caso o pagamento já tenho sido registrado, retorna mensagem de acordo.
    - 👏 Boa, {nome}! Seu pagamento de **{mes}** foi registrado.
    - 👍 {nome} já pagou em {mes}!
  - !status{numero_mes}: Retorna lista de faltantes do mês
    - 👺📅 Faltantes de {mes}: 💵 Valor: R$ {value},00 📲 Pix: {method} 💰 Temos R$ {sum} na Caixinha.
    - 🎉 Parabéns, galera! Todos os pagamentos de {mes} foram feitos! 💰 Atualmente temos R$ {sum} na Caixinha.
  - !status: Retorna contagem de faltas em cada um dos meses
    - 📅 Faltantes por mês: 🍀  Janeiro: 0 <...> 💤  Maio: 13  
- Controle:
  - Bot obedece comandos apenas do usuário registrado como admin;
  - Retorna valor total arrecado até o momento.

## :leafy_green: Limitações
- Adição de pagantes deve ser feita manualmente;
- Pagamentos mensais são podem ser parciais, só é registrado o valor inteiro;
- Pagamentos mensais devem ser do mesmo valor para que o cálculo do total fique correto;
- Suporta apenas 12 meses sequenciais.

