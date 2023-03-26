import debugLib from 'debug';
const debug = debugLib('z4ytunes:google:ytapi');
const error = debugLib('z4ytunes:google:ytapi:error');

import { google } from 'googleapis';

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YT_KEY
});

/**
 * Busca un video en YouTube y retorna el ID y el título del video y de dos resultados similares.
 * @param {string} query - Término de búsqueda.
 * @return {Promise<[{videoId: string, title: string}]>}
 * @throws {Error} - Si no se encuentra ningún resultado.
 * @throws {Error} - Si se produce un error al buscar los resultados similares.
 * @author z4yross
 * @see https://developers.google.com/youtube/v3/docs/search/list
 */
export const search = async (query) => {
    try {
        const { videoId, title }  = await searchVideo(query);
        const similar = await searchSimilar(videoId);
        return [{ videoId, title }, ...similar];
    } catch (err) {
        error(`Error search(${query}): ${err.message}`);
        throw err;
    }
}

/**
 * Busca un video en YouTube y retorna el ID y el título del video.
 * @param {string} query - Término de búsqueda.
 * @return {Promise<{videoId: string, title: string}>}
 * @throws {Error} - Si no se encuentra ningún resultado.
 * @throws {Error} - Si se produce un error al buscar los resultados similares.
 * @author z4yross
 * @see https://developers.google.com/youtube/v3/docs/search/list
 */
export const searchVideo = async (query) => {
    try {
        const response = await youtube.search.list({
            part: 'id,snippet',
            q: query,
            type: 'video',
            maxResults: 1
        });
        const { data } = response;
        const { items } = data;

        if (!items.length) throw new Error('No se encontró ningún resultado');

        const { id: { videoId }, snippet: { title } } = items[0];
        return { videoId, title };
    } catch (err) {
        error(`Error searchVideo(${query}): ${err.message}`);
        throw err;
    }
}

/**
 * Busca dos videos similares a un video en YouTube y retorna el ID y el título de los videos.
 * @param {string} id - ID del video.
 * @param {number} maxResults - Máximo de resultados a buscar.
 * @return {Promise<[{videoId: string, title: string}]>}
 * @throws {Error} - Si no se encuentra ningún resultado.
 * @throws {Error} - Si se produce un error al buscar los resultados similares.
 * @author z4yross
 * @see https://developers.google.com/youtube/v3/docs/search/list
 */
export const searchSimilar = async (id, maxResults = 2) => {
    try {
        const response = await youtube.search.list({
            part: 'id,snippet',
            relatedToVideoId: id,
            type: 'video',
            maxResults: maxResults
        });
        const { data } = response;
        const { items } = data;

        if (!items.length) throw new Error('No se encontró ningún resultado');

        const similar = items.map(({ id: { videoId }, snippet: { title } }) => ({ videoId, title }));
        return similar;
    } catch (err) {
        error(`Error searchSimilar(${id}): ${err.message}`);
        throw err;
    }
}