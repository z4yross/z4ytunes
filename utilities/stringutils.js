import debugLib from 'debug';
const debug = debugLib('z4ytunes:utils:stringutils');
const error = debugLib('z4ytunes:utils:stringutils:error');

/**
 * Retorna la cadena de texto sin el prefijo.
 * @param {string} prefix - Prefijo.
 * @param {string} text - Cadena de texto.
 * @return {string}
 * @author z4yross
*/
export const removePrefix = (prefix, text) => {
    if (!text.startsWith(prefix))
        throw new Error('La cadena de texto no comienza con el prefijo.');
    if (text.length === prefix.length) 
        throw new Error('La cadena de texto es igual al prefijo.');

    return text.slice(prefix.length);
}
