const fs = require('fs');
const path = require('path');

function loadJsonFile(fileName) {

  const filePath = path.join(__dirname, 'data', fileName);
  const rawText = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(rawText);
}

const dataService = {
  getAllMovies: function() {
    return loadJsonFile('movies.json');
  },

  getAllTimes: function() {
    return loadJsonFile('times.json');
  },

  getAllShowings: function() {
    return loadJsonFile('showings.json');
  }
};

module.exports = dataService;
