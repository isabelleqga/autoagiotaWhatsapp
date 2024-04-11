// functions.js
const { months, emojis, commands } = require('./constants');

function getMonth(msg) {
    let monthNumber = '';
    for (let i = msg.length - 1; i >= 0; i--) {
        const char = msg.charAt(i);
        if (!isNaN(char)) {
            monthNumber = char + monthNumber;
        } else {
            break;
        }
    }
    const month = months[monthNumber] || 'x';
    return month;
}

function getUnpaidNames(status, month) {
    const unpaidNames = [];
    for (let name in status) {
        if (!status[name][month]) {
            unpaidNames.push(name);
        }
    }
    return unpaidNames;
}

function getName(msg) {
    for (let command in commands) {
        if (msg.startsWith(command)) {
            return commands[command];
        }
    }
}

function getEmoji(name) {
    return emojis[name] || "🚩";
}

module.exports = {
    getMonth,
    getUnpaidNames,
    getName,
    getEmoji
};
