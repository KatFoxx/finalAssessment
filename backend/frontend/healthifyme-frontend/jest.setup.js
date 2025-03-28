import '@testing-library/jest-dom';
require('dotenv').config();
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

console.log('Jest setup file loaded');