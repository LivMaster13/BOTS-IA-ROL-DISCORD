require("dotenv").config();
console.log("TOKEN:", process.env.TOKEN);

const { Client, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: 536084479 });

const { loadSlash } = require("./handlers/slashHandler");
const { loadEvents } = require("./handlers/eventHandler");

client.slashCommands = new Collection();
client.commands = new Collection();

const userId = "733813287761739850"; // Tu ID de usuario
const prefix = "!";

// Cargar comandos
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (!command.name) {
        console.warn(`⚠️ | El comando en ${file} no tiene "name". Verifícalo.`);
        continue;
    }
    client.commands.set(command.name, command);
    console.log(`✅ | Comando cargado: ${command.name}`);
}

client.on("messageCreate", async (message) => {
    if (message.author.bot) return; 

    // Si el mensaje empieza con el prefijo, procesar comandos
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        if (!commandName) return;

        const command = client.commands.get(commandName);
        if (command) {
            try {
                await command.execute(message, client, args);
            } catch (err) {
                console.error(`Error al ejecutar el comando ${commandName}:`, err);
            }
        }

        // Si el usuario eres tú, el bot responde agresivo al comando
        if (message.author.id === userId) {
            return message.reply("Tch, delante de pendejos no.");
        }

        return; 
    }

    // Si alguien dice "hola", responde "Inútil", excepto al usuario
    if (message.content.toLowerCase().includes("hola") && message.author.id !== userId) {
        return message.reply("Inútil.");
    }

 // Si alguien dice "que", responde "so", excepto al usuario
 if (message.content.toLowerCase().includes("que") && message.author.id !== userId) {
    return message.reply("so.");
}

// Si alguien dice "rra", responde "eres", excepto al usuario
if (message.content.toLowerCase().includes("rra") && message.author.id !== userId) {
    return message.reply("eres.");
}


// Si alguien dice "Sabado", responde "Its Akechi Saturday", excepto al usuario
if (message.content.toLowerCase().includes("Sabado") && message.author.id !== userId) {
    return message.reply("Its Akechi Saturday.");
}

// Si alguien dice "Lunes", responde "Lunes de homofobia", excepto al usuario
if (message.content.toLowerCase().includes("Lunes") && message.author.id !== userId) {
    return message.reply("Lunes de homofobia.");
}

// Si alguien dice "Liv", responde "¿Porque le estás hablando a mi vieja?", excepto al usuario
if (message.content.toLowerCase().includes("Liv") && message.author.id !== userId) {
    return message.reply("¿Porque le estás hablando a mi vieja?");
}

// Si alguien dice "Fornite", responde "Ya van empezar ", excepto al usuario
if (message.content.toLowerCase().includes("Fornite") && message.author.id !== userId) {
    return message.reply("Ya van empezar?");
}

    // Si el bot ya respondió a la mención, no responde otra vez
    if (message.mentions.has(client.user, { ignoreEveryone: true })) {
        if (message.author.id === userId) {
            // Respuestas cariñosas para ti
            const respuestasCariñosas = [
                "Ah... *se sonroja* ¿Qué quieres..? ¡Idiota!",
                "Hmph *tsundere noises*",
                "Tch... te quiero pero ya aléjate, Liv.",
                "*Suspira* Siempre fastidiándome, pero no me molesta tanto... supongo.",
                "No Liv no te voy a dejar tomarte 3 litros de pepsi de golpe.",
                "No me tortures con 10 horas de Luis Miguel otra vez",

            ];
            return message.reply(respuestasCariñosas[Math.floor(Math.random() * respuestasCariñosas.length)]);
        } else {

            // Respuestas groseras para los demás
            const respuestasGrosas = [
                "¿Eres peruano verdad?", 
                "¿A qué hora comienza tu función? Payaso",
                "Cierra la boca antes de que lo haga yo.", 
                "Dichosos los tiempos en los que mis ojos no leyeron tu estupidez",
                "No me hables, escoria.", 
                "Vete a la mierda",
                "Me das asco.", 
                "Púdrete.", 
                "No recuerdo haberte preguntado",
                "Tu que hablas si le debes a coppel",

            ];
            return message.reply(respuestasGrosas[Math.floor(Math.random() * respuestasGrosas.length)]);
        }
    }
});

// Función autoejecutable para cargar eventos y conectar el bot
(async () => {
    try {
        await loadEvents(client);
        await loadSlash(client);
        await client.login(process.env.TOKEN);
        console.log("✅ | Bot conectado con éxito.");
    } catch (err) {
        console.error(`❌ | Error al iniciar el bot => ${err}`);
    }
})();
