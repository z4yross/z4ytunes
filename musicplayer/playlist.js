import debugLib from 'debug';
const debug = debugLib('z4ytunes:musciplayer:playlist');
const error = debugLib('z4ytunes:musciplayer:playlist:error');

import { searchSimilar } from '../google/ytapi.js';

import Options from './options.js';
const OPTIONS = Options.getInstance();

/**
 * Clase singleton para manejar la lista de reproducción.
 * @return {Object}
 * @author z4yross
 */

class PlaylistPrivateSingleton {
    constructor() {
        this.queue = [];
        this.currentSong = null;
    }

    /**
     * Agrega una canción a la lista de reproducción.
     * @param {string} songID - id de youtube de la canción a agregar.
     * @return {void}
     * @throws {Error} - Si la canción ya existe en la lista de reproducción.
     * @throws {Error} - Si la lista de reproducción está llena.
     * @throws {Error} - Si la canción no es válida.
     * @author z4yross
     */
    async add(songID) {
        if (this.queue.includes(songID))
            throw new Error('La canción ya existe en la lista de reproducción.');
        if (this.queue.length >= OPTIONS.maxQueue)
            throw new Error('La lista de reproducción está llena.');
        if (!songID)
            throw new Error('La canción no es válida.');
        this.queue.push(songID);
    }

    /**
     * Elimina una canción de la lista de reproducción.
     * @param {string} songID - id de youtube de la canción a eliminar.
     * @return {void}
     * @throws {Error} - Si la canción no existe en la lista de reproducción.
     * @throws {Error} - Si la canción no es válida.
     * @throws {Error} - Si la lista de reproducción está vacía.
     * @author z4yross
     */
    async remove(songID) {
        if (!this.queue.includes(songID))
            throw new Error('La canción no existe en la lista de reproducción.');
        if (!songID)
            throw new Error('La canción no es válida.');
        if (this.queue.length <= 0)
            throw new Error('La lista de reproducción está vacía.');

        if (songID === this.currentSong)
            this.currentSong = null;

        this.queue = this.queue.filter(item => item !== songID);
    }

    /**
     * Retorna la siguiente canción en la lista de reproducción y la elimina de la lista.
     * Si la lista está vacía retorna null.
     * Si la opción de autoplay está activada, agrega maxSimilarSongs sugerencias de canciones a la lista de reproducción.
     * Si la opcion shuffle está activada, retorna una canción aleatoria de la lista de reproducción y la elimina.
     * Si la opcion loop está activada, retorna la primera canción de la lista de reproducción y no la elimina.
     * @return {string} - id de youtube de la siguiente canción.
     * @throws {Error} - Si la canción no es válida.
     * @author z4yross
     */
    async next() {
        if (this.queue.length <= 0)
            return null;

        if (OPTIONS.shuffle) {
            const songID = this.queue[Math.floor(Math.random() * this.queue.length)];
            this.remove(songID);
            return songID;
        }

        const songID = this.queue[0];
        this.remove(songID);

        if (OPTIONS.repeat)
            this.queue.push(songID);

        if (OPTIONS.autoPlay) {
            try {
                const similarSongs = await searchSimilar(songID, OPTIONS.maxSimilarSongs);
                similarSongs.forEach(song => this.add(song.videoId));
            } catch (err) {
                error(`Error next(): ${err}`);
            }
        }

        this.currentSong = songID;
        return songID;
    }

    /** 
     * Repite la canción actual.
     * @return {string} - id de youtube de la canción actual.
     * @throws {Error} - Si la canción no es válida.
     * @author z4yross
     */
    async repeat() {
        if (!this.currentSong)
            throw new Error('No hay canción actual.');
        this.queue.unshift(this.currentSong);
        return this.currentSong;
    }

    /**
     * Detiene la reproducción de la lista de reproducción y la vacía.
     * @return {void}
     * @author z4yross
     */
    stop() {
        this.queue = [];
        this.currentSong = null;
    }

    /** 
     * Vaación la lista de reproducción, pero elimina la canción actual.
     * @return {void}
     * @author z4yross
     */
    clear() {
        this.queue = [];
        this.currentSong = null;
    }
}

export default class Playlist {
    constructor() {
        throw new Error('No se puede instanciar la clase Playlist. utilice el método Playlist.getInstance()');
    }

    static getInstance() {
        if (!Playlist.instance) {
            Playlist.instance = new PlaylistPrivateSingleton();
        }
        return Playlist.instance;
    }
}