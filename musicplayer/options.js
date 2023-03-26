import debug from 'debug';
const debug = debug('z4ytunes:musicplayer:options');
const error = debug('z4ytunes:musicplayer:options:error');

/**
 * Clase singleton para manejar las opciones de configuración del bot.
 * @return {Object}
 * @author z4yross
 */

class OptionsPrivateSingleton {
    constructor() {
        this.autoPlay = true;
        this.maxQueue = 10;
        this.shuffle = false;
        this.maxSimilarSongs = 5;
        this.repeat = false;
    }
}

export default class Options {
    constructor() {
        throw new Error('No se puede instanciar la clase Options. utilice el método Options.getInstance()');
    }

    static getInstance() {
        if (!Options.instance) {
            Options.instance = new OptionsPrivateSingleton();
        }
        return Options.instance;
    }
}
