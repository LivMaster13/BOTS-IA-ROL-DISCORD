const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

function loadSlash(client) {
    client.slashCommands = new Collection();
    
    const commandsPath = path.join(__dirname, '../commands'); // Ruta absoluta para evitar problemas
    if (!fs.existsSync(commandsPath)) {
        console.error('⚠️ | La carpeta "commands" no existe. Creándola...');
        fs.mkdirSync(commandsPath); // Crea la carpeta si no existe
        return;
    }

    const slashCommandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of slashCommandFiles) {
        const command = require(`../commands/${file}`);

        if (!command || !command.data || !command.data.name) {
            console.warn(`⚠️ | El comando en ${file} no tiene "data.name". Verifícalo.`);
            continue; // Si el comando está mal definido, lo ignora
        }

        client.slashCommands.set(command.data.name, command);
        console.log(`✅ | Comando cargado: ${command.data.name}`);
    }

    console.log('» | Comandos slash cargados con éxito.');
}

module.exports = { loadSlash };
