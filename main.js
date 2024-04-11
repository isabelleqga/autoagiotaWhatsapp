const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const { admin, value, method, months, commands, emojis } = require('./constants');
const { getMonth, getUnpaidNames, getName, getEmoji } = require('./functions');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

let status = loadStatus();

function loadStatus() {
    try {
        const data = fs.readFileSync("status.json", "utf8");
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
}

function saveStatus(status) {
    fs.writeFileSync("status.json", JSON.stringify(status, null, 4));
}

// --------------------------------------------------------------------

function getStatusGeneral() {
    let statusMessage = "-----------------\n📅 **Faltantes por mês:**\n\n";
    for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
        const mes = months[monthNumber] || 'x';
        const unpaidNames = getUnpaidNames(status, mes);
        const numUnpaid = unpaidNames.length;
        let emoji = "";
        if (numUnpaid === 0) {
            emoji = "🍀";
        } else if (numUnpaid >= 1 && numUnpaid <= 5) {
            emoji = "🐟";
        } else if (numUnpaid >= 6 && numUnpaid <= 9) {
            emoji = "🦥";
        } else if (numUnpaid >= 10 && numUnpaid <= 12) {
            emoji = "🦧";
        } else if (numUnpaid === 13) {
            emoji = "💤";
        }
        statusMessage += `- ${emoji}  _${mes.capitalize()}_: **${numUnpaid}**\n`;
    }
    statusMessage += "\n-----------------";
    return statusMessage;
}


async function registerPayment(message, nome, mes) {
    if (status[nome.split()[0]][mes]) {
        await client.sendMessage(message.from,`👍 ${nome} ${getEmoji(nome)} já pagou em ${mes}!`);
    } else {
        status[nome.split()[0]][mes] = true;
        saveStatus(status);
        await client.sendMessage(message.from,`👏 Boa, ${nome} ${getEmoji(nome)}! Seu pagamento de **${mes}** foi registrado.\n\n`);
        await sendMissingPaymentMessage(message, mes, getUnpaidNames(status, mes));
    }
}

async function sendMissingPaymentMessage(message, mes, faltantes) {
    if (faltantes.length > 0) {
        let response = `-----------------\n**👺📅 O caloteiro de ${mes} é:**\n\n`;
        if(faltantes.length === 1){
            response += `**👺📅 O caloteiro de ${mes} é:**\n\n`;
        }else{
            response += `**👺📅 Faltantes de ${mes}:**\n\n`;
        }
        response += faltantes.map(name => `- ${name} ${getEmoji(name)}`).join('\n');
        response += `\n\n 💵 *Valor: R$ ${parseInt(value) * Object.values(status).flat().filter(payment => payment).length},00*\n📲 *Pix: ${method}*\n-----------------`;
        await client.sendMessage(message.from, response);
    } else {
        await client.sendMessage(message.from,`-----------------\n🎉 Parabéns, galera! Todos os pagamentos de **${mes}** foram feitos! \n\n💰 **Atualmente temos R$ ${parseInt(value) * Object.values(status).flat().filter(payment => payment).length},00 na Caixinha.**\n----------------- \n👋 Até a próxima!`);
    }
}

client.on('message_create', async message => {
        if (message.body==="!ping"){
            client.sendMessage(message.from,"pong");
        }
        if (Object.keys(commands).some(command => message.body.includes(command))) {
            // Check if the author is the person responsible for the registrations
            if (message.from === admin) {
                // Transform the month number into its name
                const mes = getMonth(message.body);
                if (mes !== "x") { // Check if a month was entered
                    const nome = getName(message.body);
                    if (nome) { // Check if the name is recognized
                        // Register the payment
                        await registerPayment(message, nome, mes);
                    } else {
                        client.sendMessage(message.from,"🤔 Quem?!");
                    }
                } else {
                    client.sendMessage(message.from,"📅 Lembre-se do mês do pagamento!");
                }
            } else {
                client.sendMessage(message.from,"😎 Tu não manda em mim, rapaz!");
            }
        } else if (message.body.startsWith("!status")) {
            const mes = getMonth(message.body);
            if (mes !== "x") { // Check if a month was entered
                await sendMissingPaymentMessage(message, mes, getUnpaidNames(status, mes));
            } else {
                await client.sendMessage(message.from,getStatusGeneral());
            }
        }
});

client.initialize();
