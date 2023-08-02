function generateRandomNumbersWithoutRepeats(min, max, count) {
  if (count > max - min + 1) {
    throw new Error("Can't generate random numbers without repeats");
  }

  let numbers = [];
  while (numbers.length < count) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  return numbers;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class GameService {
  generateLotoCard() {
    const numbersPerRow = 27;
    const minNumber = 1;
    const maxNumber = 90;
    const totalNumbers = 15;

    let lotoCard = [];

    let rowNumbers = generateRandomNumbersWithoutRepeats(
      minNumber,
      maxNumber,
      totalNumbers
    );
    lotoCard.push(rowNumbers);

    for (let i = lotoCard[0].length; i < numbersPerRow; i++) {
      lotoCard[0].push(" ");
    }

    return shuffleArray(lotoCard[0]);
  }
}

module.exports = new GameService();
