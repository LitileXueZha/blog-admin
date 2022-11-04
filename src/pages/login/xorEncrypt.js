/**
 * Simple xor encrypt
 *
 * @param {string} str a message
 * @param {string} enc encrypt key
 * @returns {string}
 */
export default function xorEncrypt(str, enc) {
    let i = 0;
    let encIdx = 0;
    const { length } = str;
    const encLength = enc.length;
    const result = [];

    while (i < length) {
        encIdx = 0;
        while (encIdx < encLength && i < length) {
            // eslint-disable-next-line no-bitwise
            result[i] = String.fromCharCode(str.charCodeAt(i) ^ enc.charCodeAt(encIdx));
            i++;
            encIdx++;
        }
    }
    return result.join('');
}
