const axios = require('axios');
const Sentiment = require('sentiment');
const pos = require('pos');
const pluralize = require('pluralize');
require('dotenv').config();


const commentSearch = async () => {
  const period = process.env.period;
  const apiKey = process.env.apiKey;
  const url = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/' + period +'.json?api-key=' + apiKey;
  const req =  await axios.get(url);
  return req.data.results;
};

const getKeyword = async () => {
  const data = await commentSearch();
  let keyword = [];

  for (const article of data) {
    if (article['des_facet'].includes('Coronavirus (2019-nCoV)')) {
      keyword.push([...POSTagging(article.title), ...POSTagging(article.abstract)]);
    }
  }
  const finalResult = sentAnalysis(keyword);
  console.log(finalResult);
  return finalResult;
};

const POSTagging = (sentence) => {
  const items = ['JJ', 'JJR', 'JJS', 'NN', 'NNP', 'NNPS', 'NNS', 'POS', 'RB', 'RBR',
    'RBS', 'VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ'];
  const words = new pos.Lexer().lex(sentence);
  const tagger = new pos.Tagger();
  const taggedWords = tagger.tag(words);
  const result = [];
  for (const word of taggedWords) {
    if (items.includes(word[1])) result.push(pluralize.singular(word[0]));
  }
  return result;
};


const sentAnalysis = (arr) => {
  const sentiment = new Sentiment();
  const scores = [];

  for (const words of arr) {
    let score = 0.0;
    for (const word of words) {
      const result = sentiment.analyze(word);
      console.log(result);
      score += result.score;
    }
    scores.push(score);
  }

  return {
    score: scores,
  };
};


(async ()=>{
  return await getKeyword();
})();