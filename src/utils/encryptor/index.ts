import * as CryptoJS from 'crypto-js';

function encryptPassword(password: string): string {
  // Cria um objeto do tipo 'CryptoJS.SHA256' e retorna a versão em hexadecimal da senha
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}