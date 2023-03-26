import debugLib from "debug";
const debug = debugLib("z4ytunes:musicplayer:core");
const error = debugLib("z4ytunes:musicplayer:core:error");

import { search as searchYoutube } from "../google/ytapi.js";

import { removePrefix } from "../utils/stringutils.js";

import Options from "./options.js";

const OPTIONS = Options.getInstance();

/**
* Reproduce una canción en la lista de reproducción.
* @param {Message} message - Objeto mensaje de Discord.
* @return {Promise<void>}
*/
export const play = async (message) => {
}

/**
* Detiene la reproducción actual.
* @param {Message} message - Objeto mensaje de Discord.
* @return {Promise<void>}
*/
export const stop = async (message) => {
}

/**
* Salta a la siguiente canción en la lista de reproducción.
* @param {Message} message - Objeto mensaje de Discord.
* @return {Promise<void>}
*/
export const skip = async (message) => {
}

/**
* Muestra la lista de reproducción actual.
* @param {Message} message - Objeto mensaje de Discord.
* @return {Promise<void>}
*/
export const queue = async (message) => {
}

/**
* Limpia la lista de reproducción actual.
* @param {Message} message - Objeto mensaje de Discord.
* @return {Promise<void>}
*/
export const clear = async (message) => {
}
/**
* Pausa la reproducción actual.
* @param {Message} message - Objeto mensaje de Discord.
* @return {Promise<void>}
*/
export const pause = async (message) => {
}

/**
* Reanuda la reproducción pausada.
* @param {Message} message - Objeto mensaje de Discord.
* @return {Promise<void>}
*/
export const resume = async (message) => {
}

/**
* Activa o desactiva el modo de repetición de la lista de reproducción.
* @param {Message} message - Objeto mensaje de Discord.
* @return {Promise<void>}
*/
export const loop = async (message) => {
}

/**
* Mezcla aleatoriamente la lista de reproducción actual.
* @param {Message} message - Objeto mensaje de Discord.
* @return {Promise<void>}
*/
export const shuffle = async (message) => {
}

/**
* Cambia el volumen de la reproducción actual.
* @param {Message} message - Objeto mensaje de Discord.
* @return {Promise<void>}
*/
export const volume = async (message) => {
}

/**
* Muestra la canción actual que se está reproduciendo.
* @param {Message} message - Objeto mensaje de Discord.
* @return {Promise<void>}
*/
export const nowplaying = async (message) => {
}