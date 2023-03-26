import debugLib from 'debug';
const debug = debugLib('z4ytunes:bot');
const error = debugLib('z4ytunes:bot:error');

import { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus } from '@discordjs/voice';
import Discord from 'discord.js';

/**
 * Clase Bot.
 * @return {Object}
 * @author z4yross
 * @version 1.0.0
 */

export default class Bot {
    constructor(client) {
        this.connection = null;
        this.client = client;
        this.player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });

        player.on("stateChange", (oldState, newState) => {
            this.status = newState.status;
        });
    }

    /**
     * Se conecta a un canal de voz.
     * @param {string} channelID - id del canal de voz.
     * @return {void}
     * @throws {Error} - Si el bot ya está conectado a un canal de voz.
     * @throws {Error} - Si el canal de voz no es válido.
     * @throws {Error} - Si el bot no tiene permisos para conectarse al canal de voz.
     * @author z4yross
     */
    async connectToChannel(channelID) {
        if (this.connection)
            throw new Error('El bot ya está conectado a un canal de voz.');
        if (!channelID)
            throw new Error('El canal de voz no es válido.');

        const channel = this.client.channels.find(channel => channel.id === channelID);

        if (!channel)
            throw new Error('El canal de voz no es válido.');
        if (!channel.isVoiceBased())
            throw new Error('El canal de voz no es válido.');

        try {
            this.connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            this.connection.subscribe(player);

            return this.connection;
        } catch (err) {
            throw new Error('El bot no tiene permisos para conectarse al canal de voz.');
        }

    }

    /**
     * Se desconecta del canal de voz.
     * @return {void}
     * @throws {Error} - Si el bot no está conectado a un canal de voz.
     * @author z4yross
     */
    async disconnectFromChannel() {
        if (!this.connection)
            throw new Error('El bot no está conectado a un canal de voz.');

        this.connection.destroy();
        this.connection = null;
    }

    /**
     * Reproduce un audio.
     * si this.player esta ocupado, agrega un stateChange listener para reproducir el audio cuando este disponible.
     * @param {Stream} stream - stream de audio.
     * @return {void}
     * @throws {Error} - Si el bot no está conectado a un canal de voz.
     * @throws {Error} - Si el stream no es válido.
     * @author z4yross
     */
    async play(stream) {
        if (!this.connection)
            throw new Error('El bot no está conectado a un canal de voz.');
        if (!stream)
            throw new Error('El stream no es válido.');

        const resource = createAudioResource(stream);

        if (this.status === AudioPlayerStatus.Idle)
            player.play(resource);

        else{
            player.on(AudioPlayerStatus.Idle, (oldState, newState) => {
                player.play(resource);
            });
        }
    }

    /**
     * Pausa la reproducción.
     * @return {void}
     * @throws {Error} - Si el bot no está conectado a un canal de voz.
     * @author z4yross
     */
    async pause() {
        if (!this.connection)
            throw new Error('El bot no está conectado a un canal de voz.');

        player.pause();
    }
}
