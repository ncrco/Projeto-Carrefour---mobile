/**
 * Helper para gerenciamento de dados de teste
 * Boas práticas: validação, tratamento de erros e cache
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const CONSTANTS = require('../config/constants');

class DataHelper {
    // Cache para evitar múltiplas leituras do mesmo arquivo
    static _cache = {};

    /**
     * Carrega dados JSON com validação e cache
     * @param {string} filePath - Caminho do arquivo
     * @returns {Array|Object} Dados carregados
     * @throws {Error} Se o arquivo não existir ou for inválido
     */
    static loadJSONData(filePath) {
        // Verifica cache
        if (this._cache[filePath]) {
            return this._cache[filePath];
        }

        const fullPath = path.join(__dirname, '../data', filePath);
        
        // Valida se arquivo existe
        if (!fs.existsSync(fullPath)) {
            throw new Error(`Arquivo de dados não encontrado: ${fullPath}`);
        }

        try {
            const data = fs.readFileSync(fullPath, 'utf8');
            const parsed = JSON.parse(data);
            
            // Valida se é array ou objeto
            if (!Array.isArray(parsed) && typeof parsed !== 'object') {
                throw new Error(`Formato de dados inválido em ${filePath}`);
            }

            // Armazena no cache
            this._cache[filePath] = parsed;
            return parsed;
        } catch (error) {
            if (error instanceof SyntaxError) {
                throw new Error(`Erro ao parsear JSON em ${filePath}: ${error.message}`);
            }
            throw error;
        }
    }

    /**
     * Carrega dados CSV com validação
     * @param {string} filePath - Caminho do arquivo
     * @returns {Array} Array de objetos
     * @throws {Error} Se o arquivo não existir ou for inválido
     */
    static loadCSVData(filePath) {
        // Verifica cache
        if (this._cache[filePath]) {
            return this._cache[filePath];
        }

        const fullPath = path.join(__dirname, '../data', filePath);
        
        // Valida se arquivo existe
        if (!fs.existsSync(fullPath)) {
            throw new Error(`Arquivo CSV não encontrado: ${fullPath}`);
        }

        try {
            const fileContent = fs.readFileSync(fullPath, 'utf8');
            const records = parse(fileContent, {
                columns: true,
                skip_empty_lines: true,
                trim: true
            });

            // Valida se há dados
            if (!Array.isArray(records) || records.length === 0) {
                throw new Error(`Arquivo CSV vazio ou inválido: ${filePath}`);
            }

            // Armazena no cache
            this._cache[filePath] = records;
            return records;
        } catch (error) {
            throw new Error(`Erro ao processar CSV ${filePath}: ${error.message}`);
        }
    }

    /**
     * Obtém usuário aleatório
     * @returns {Object} Usuário aleatório
     */
    static getRandomUser() {
        const users = this.loadJSONData(CONSTANTS.DATA_CONFIG.USERS_FILE);
        if (!Array.isArray(users) || users.length === 0) {
            throw new Error('Nenhum usuário disponível no arquivo de dados');
        }
        return users[Math.floor(Math.random() * users.length)];
    }

    /**
     * Obtém todos os usuários inválidos
     * @returns {Array} Array de usuários inválidos
     */
    static getInvalidUsers() {
        return this.loadJSONData(CONSTANTS.DATA_CONFIG.INVALID_USERS_FILE);
    }

    /**
     * Obtém dados de formulário
     * @returns {Array} Array de dados de formulário
     */
    static getFormData() {
        return this.loadJSONData(CONSTANTS.DATA_CONFIG.FORM_DATA_FILE);
    }

    /**
     * Obtém dados de teste do CSV
     * @returns {Array} Array de dados de teste
     */
    static getCSVTestData() {
        return this.loadCSVData(CONSTANTS.DATA_CONFIG.CSV_DATA_FILE);
    }

    /**
     * Limpa o cache (útil para testes)
     */
    static clearCache() {
        this._cache = {};
    }

    /**
     * Gera dados de teste dinâmicos
     * @param {string} prefix - Prefixo para os dados
     * @returns {Object} Objeto com dados gerados
     */
    static generateTestData(prefix = 'test') {
        const timestamp = Date.now();
        return {
            username: `${prefix}user${timestamp}`,
            password: `Pass${timestamp}123!`,
            email: `${prefix}${timestamp}@example.com`
        };
    }

    /**
     * Valida estrutura de dados de usuário
     * @param {Object} user - Objeto de usuário
     * @returns {boolean} True se válido
     */
    static validateUserData(user) {
        return user && 
               typeof user.username === 'string' && 
               typeof user.password === 'string' &&
               user.username.trim() !== '' &&
               user.password.trim() !== '';
    }
}

module.exports = DataHelper;

