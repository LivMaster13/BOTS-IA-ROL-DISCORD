module.exports = {
    name: "ayuda", // Asegúrate de incluir esta propiedad
    description: "Muestra la lista de comandos disponibles",
    execute(message, args) {
        const ayudaMensaje = `
        📜 **Lista de Comandos**:
        \`!ping\` - Comprueba la latencia del bot.
        \`!ayuda\` - Muestra este mensaje de ayuda.
        \`!info\` - Muestra información sobre el bot.
        `;
        message.reply(ayudaMensaje);
    },
};
