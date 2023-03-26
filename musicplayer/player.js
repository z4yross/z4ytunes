import debugLog from 'debug';
const debug = debugLog('z4ytunes:musicplayer:player');
const error = debugLog('z4ytunes:musicplayer:player:error');

import ytdl from 'ytdl-core';

/**
 * Clase singleton para manejar la reproducción de canciones.
 * @return {Object}
 * @author z4yross
 */

class PlayerPrivateSingleton {
    constructor() {
        this.connection = null;
        this.dispatcher = null;
        this.volume = 1;
    }

}

export default class Player {
    constructor() {
        throw new Error('No se puede instanciar la clase Player. utilice el método Player.getInstance()');
    }

    static getInstance() {
        if (!Player.instance) {
            Player.instance = new PlayerPrivateSingleton();
        }
        return Player.instance;
    }
}