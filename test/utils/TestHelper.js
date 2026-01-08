/**
 * Helper para utilitários de teste
 * Boas práticas: funções reutilizáveis e validações
 */

const CONSTANTS = require('../config/constants');
const DataHelper = require('./DataHelper');

class TestHelper {
    /**
     * Gera timestamp único para dados de teste
     * @returns {string}
     */
    static generateTimestamp() {
        return Date.now().toString();
    }

    /**
     * Gera username único para testes
     * @param {string} prefix - Prefixo opcional
     * @returns {string}
     */
    static generateUsername(prefix = 'testuser') {
        return `${prefix}${this.generateTimestamp()}`;
    }

    /**
     * Gera email único para testes
     * @param {string} prefix - Prefixo opcional
     * @returns {string}
     */
    static generateEmail(prefix = 'test') {
        return `${prefix}${this.generateTimestamp()}@example.com`;
    }

    /**
     * Gera senha segura para testes
     * @param {number} length - Tamanho da senha
     * @returns {string}
     */
    static generatePassword(length = 12) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    /**
     * Aguarda condição ser verdadeira
     * @param {Function} condition - Função que retorna boolean
     * @param {number} timeout - Timeout em ms
     * @param {number} interval - Intervalo de verificação em ms
     * @returns {Promise<boolean>}
     */
    static async waitForCondition(condition, timeout = CONSTANTS.TIMEOUTS.MEDIUM, interval = 500) {
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            if (await condition()) {
                return true;
            }
            await new Promise(resolve => setTimeout(resolve, interval));
        }
        return false;
    }

    /**
     * Valida estrutura de dados de teste
     * @param {Object} data - Dados a validar
     * @param {string[]} requiredFields - Campos obrigatórios
     * @returns {boolean}
     */
    static validateTestData(data, requiredFields) {
        if (!data || typeof data !== 'object') {
            return false;
        }
        return requiredFields.every(field => data.hasOwnProperty(field) && data[field] !== undefined);
    }

    /**
     * Limpa string para usar como nome de arquivo
     * @param {string} str - String a limpar
     * @returns {string}
     */
    static sanitizeFileName(str) {
        return str.replace(/[^a-zA-Z0-9_]/g, '_').replace(/_+/g, '_');
    }

    /**
     * Formata duração em milissegundos para string legível
     * @param {number} ms - Milissegundos
     * @returns {string}
     */
    static formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        }
        return `${seconds}s`;
    }

    /**
     * Retry de função com tratamento de erro
     * @param {Function} fn - Função a executar
     * @param {number} retries - Número de tentativas
     * @param {number} delay - Delay entre tentativas em ms
     * @returns {Promise<any>}
     */
    static async retry(fn, retries = CONSTANTS.TEST_CONFIG.RETRY_COUNT, delay = 1000) {
        try {
            return await fn();
        } catch (error) {
            if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
                return this.retry(fn, retries - 1, delay);
            }
            throw error;
        }
    }
}

module.exports = TestHelper;

