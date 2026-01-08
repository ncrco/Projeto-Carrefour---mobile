const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

class DataHelper {
    static loadJSONData(filePath) {
        const fullPath = path.join(__dirname, '../data', filePath);
        const data = fs.readFileSync(fullPath, 'utf8');
        return JSON.parse(data);
    }

    static loadCSVData(filePath) {
        const fullPath = path.join(__dirname, '../data', filePath);
        const fileContent = fs.readFileSync(fullPath, 'utf8');
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true
        });
        return records;
    }

    static getRandomUser() {
        const users = this.loadJSONData('users.json');
        return users[Math.floor(Math.random() * users.length)];
    }

    static getInvalidUsers() {
        return this.loadJSONData('invalid_users.json');
    }

    static getFormData() {
        return this.loadJSONData('form_data.json');
    }

    static getCSVTestData() {
        return this.loadCSVData('test_data.csv');
    }
}

module.exports = DataHelper;

