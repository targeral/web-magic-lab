const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_PATH = path.resolve(ROOT, 'dist');
const ENTRY_PATH = path.resolve(ROOT, 'src');
const PUBLIC_PATH = '/assets/'

module.exports = {
    ROOT,
    OUTPUT_PATH,
    ENTRY_PATH,
    PUBLIC_PATH
};
