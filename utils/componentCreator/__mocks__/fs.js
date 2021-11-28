'use strict';

const path = require('path');

const fs = jest.createMockFromModule('fs');

const mockFiles = {};

function mkdirSync(dir) {
  mockFiles[dir] = {};
}

function writeFileSync(file, content) {
  const dir = path.dirname(file);
  const fileName = path.basename(file);
  mockFiles[dir][fileName] = content;
}

fs.mkdirSync = mkdirSync;
fs.writeFileSync = writeFileSync;
fs.__mockFiles = () => mockFiles;

module.exports = fs;
