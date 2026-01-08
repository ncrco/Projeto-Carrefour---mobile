/**
 * Funções auxiliares para os testes
 */

/**
 * Aguarda um tempo específico
 * @param {number} ms - Milissegundos para aguardar
 */
async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Gera um timestamp único
 * @returns {string} Timestamp em formato string
 */
function generateTimestamp() {
    return Date.now().toString();
}

/**
 * Gera um email único para testes
 * @returns {string} Email gerado
 */
function generateTestEmail() {
    return `test${generateTimestamp()}@example.com`;
}

/**
 * Gera um username único para testes
 * @returns {string} Username gerado
 */
function generateTestUsername() {
    return `testuser${generateTimestamp()}`;
}

/**
 * Tira screenshot com nome personalizado
 * @param {string} name - Nome do screenshot
 */
async function takeScreenshot(name) {
    const timestamp = generateTimestamp();
    const filename = `./screenshots/${name}_${timestamp}.png`;
    await driver.saveScreenshot(filename);
    return filename;
}

module.exports = {
    wait,
    generateTimestamp,
    generateTestEmail,
    generateTestUsername,
    takeScreenshot
};

