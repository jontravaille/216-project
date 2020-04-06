const Sentiment = require('sentiment');
const pos = require('pos');
const pluralize = require('pluralize');

(() => {
  let sentence = 'they are bitch fears!!';
  const items = ['JJ', 'JJR', 'JJS', 'NN', 'NNP', 'NNPS', 'NNS', 'POS', 'RB', 'RBR',
    'RBS', 'VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ'];
  const sentiment = new Sentiment();
  const words = new pos.Lexer().lex(sentence);
  const tagger = new pos.Tagger();
  const taggedWords = tagger.tag(words);
  console.log(taggedWords);
  for (const word of taggedWords) {
    if (items.includes(word[1])) console.log('hello', word[0]);
    console.log(pluralize.singular(word[0]));
    console.log(sentiment.analyze(word[0]));
  }
  // [JJ, JJR, JJS, NN, NNP, NNPS, NNS, POS, RB, RBR, RBS, VB, VBD, VBG, VBN, VBP, VBZ]

  // let test = 'cats are bitch!';
  // let keyword = ['cats are bitch'];
  // for (const key of taggedWords) {
  //   console.log(sentiment.analyze(key));
  // }
  // console.log(sentiment.analyze(test));
})();