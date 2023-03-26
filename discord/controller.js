import debugLib from 'debug';
const debug = debugLib('z4ytunes:discord:controller');
const error = debugLib('z4ytunes:discord:controller:error');

import { Bot } from './bot.js';

import discord from 'discord.js';


/**
 * Controller.
 * @return {Object}
 * @author z4yross
 * @version 1.0.0
 */

export default class Controller {
    constructor() {
        this.client = new discord.Client({
            intents:
                [
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.GuildVoiceStates,
                    GatewayIntentBits.GuildMessages,
                    GatewayIntentBits.MessageContent
                ]
        });

        this.bots = {};
    }

    /**
     * Inicia el cliente.
     * @return {void}
     * @throws {Error} - Si no se ha especificado la clave de la API de Discord.
     * @throws {Error} - Si la clave de la API de Discord no es válida.
     * @author z4yross
     */
    async init() {
        this.client.on('ready', () => {
            debug('Cliente iniciado.');
        });

        this.client.login(process.env.DISCORD_KEY);
    }

    /**
     * Maneja los mensajes.
     * @param {Object} message - Mensaje.
     * @return {void}
     * @throws {Error} - Si el mensaje no es válido.
     * @throws {Error} - Si el mensaje no es de un servidor.
     * @throws {Error} - Si el usuario no esta en un canal de voz.
     * @author z4yross
     */
    async handleCommand(message) {
    }

    /**
     * Crea un bot y lo añade a la lista de bots {guildID: bot}.
     * @param {string} guildID - id del servidor.
     * @return {void}
     * @throws {Error} - Si el servidor no es válido.
     * @throws {Error} - Si el bot ya existe.
     * @throws {Error} - Si el bot no se ha podido crear.
     * @throws {Error} - Si el bot no se ha podido conectar al canal de voz.
     * @author z4yross
     */
    async connectToChannel(channelID) {
    }
}