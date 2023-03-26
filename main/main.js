import debugLib from 'debug';
debugLib.enable('z4ytunes:*');

const debug = debugLib('z4ytunes:main');
const error = debugLib('z4ytunes:main:error');

import { Client, GatewayIntentBits } from 'discord.js';
import { createAudioPlayer, createAudioResource, entersState, VoiceConnectionStatus, joinVoiceChannel, generateDependencyReport } from '@discordjs/voice';
import ytdl from 'ytdl-core';


debug('Starting z4ytunes');

const client = new Client({
    intents:
        [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {

    if (message.content.startsWith('!play')) {
        // Si el usuario envía el comando "!play", verifica que esté en un canal de voz
        if (!message.member.voice.channel) {
            message.reply('¡Debes unirte a un canal de voz primero!');
            return;
        }

        // Obtiene el enlace de YouTube del mensaje
        const link = message.content.slice(6);

        // Valida el enlace de YouTube
        if (!ytdl.validateURL(link)) {
            message.reply('¡El enlace proporcionado no es un enlace de YouTube válido!');
            return;
        }

        const channel = message.member.voice.channel;

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        // Establece una conexión de voz con el canal
        // const connection = await message.member.voice.channel.join();

        // Crea un reproductor de audio
        const player = createAudioPlayer();

        // Crea una fuente de audio utilizando el enlace de YouTube
        const stream = ytdl(link, { filter: 'audioonly' });
        const resource = createAudioResource(stream);

        // Agrega la fuente de audio al reproductor
        player.play(resource);

        // Suscríbete a los eventos de estado del reproductor y la conexión
        connection.subscribe(player);
        await entersState(player, 'playing', 5_000);
        await entersState(connection, VoiceConnectionStatus.Ready, 20_000);

        // Envía un mensaje de confirmación
        message.reply('¡Reproduciendo música de YouTube!');
    }
});




client.login(process.env.DISCORD_KEY);
