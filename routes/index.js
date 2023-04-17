const express = require('express');
const router = express.Router();


const screens = {
  initial: {
    name: 'initial', 
    image: 'images/initial_image.jpg',
    text: 'The cat says hi.',
    choices: [
      { text: 'Say Hi Back', value: 'say_hi_back', nextScreen: 'screen1' },
      { text: 'Ignore', value: 'ignore', nextScreen: 'screen2' }
    ]
  },
  screen1: {
    name: 'screen1', 
    image: 'images/initial_image.jpg',
    text: 'The cat says thank you!.',
    choices: [
      { text: 'Say "no problem!"', value: 'say_no_prob', nextScreen: 'screen3' },
      { text: 'Ignore', value: 'ignore_2', nextScreen: 'screen3' }
    ]
  },
  screen2: {
    name: 'screen2', 
    image: 'images/initial_image.jpg',
    text: 'The cat says you should be more polite.',
    choices: [
      { text: 'Say "sorry..."', value: 'say_sorry', nextScreen: 'screen3' },
      { text: 'Ignore again', value: 'ignore_3', nextScreen: 'screen3' }
    ]
  },
  screen3: {
    name: 'screen3', 
    image: 'images/image2.png',
    text: 'This is the end so far, but check back again for more!',
    choices: [
      { text: 'blank', value: 'blank', nextScreen: 'screen3' },
      { text: 'blank', value: 'blank', nextScreen: 'screen3' }
    ]
  }
};


router.get('/', (req, res) => {
  res.render('index', { screen: screens.initial });
});

router.post('/choice', (req, res) => {
  const choiceValue = req.body.choice;
  const currentScreen = screens[req.body.currentScreen];

  const choice = currentScreen.choices.find(c => c.value === choiceValue);

  if (!choice) {
    res.status(400).json({ error: 'Invalid choice' });
    return;
  }

  const nextScreen = screens[choice.nextScreen];
  res.json({ imagePath: nextScreen.image, screen: nextScreen });
});


module.exports = router;