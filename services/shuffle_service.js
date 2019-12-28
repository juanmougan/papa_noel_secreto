// Awfully copy-pasted from https://github.com/juanmougan/shuffler/blob/master/src/App.js#L108
function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pair(arr) {
  const shuffled = shuffleArray(arr);

  console.log(`Shuffled: ${shuffled}`);
  let circular = shuffled.concat([shuffled[0]]);
  console.log(`Circled: ${circular}`);
  let result = [];
  const pairs = new Map();
  console.log(`circular.length is: ${circular.length}`);

  while (circular.length > 1) {
    console.log(`0th is: ${circular[0]}`);
    console.log(`1th is: ${circular[1]}`);
    pairs.set(circular[0], circular[1]);
    console.log('- - - - - - - - - - - - ');
    circular.shift();
  }

  for (let p of pairs) {
    console.log(`pair: ${p}`);
  }
}

function validateNotRepeated(roster) {
  const rosterSet = new Set(roster);
  return roster.length === rosterSet.size;
}

function shuffleRoster(roster) {
  validateNotRepeated(roster);
  // Shuffle input
  const shuffledRoster = shuffleArray(roster);
  let circular = shuffledRoster.concat([shuffledRoster[0]]);
  const pairs = new Map();
  while (circular.length > 1) {
    console.log(`Will make pair of: ${circular[0]}, ${circular[1]}`);
    pairs.set(circular[0], circular[1]);
    circular.shift();
  }
  return pairs;
}

module.exports = {
  shuffleRoster
};
