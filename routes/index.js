const express = require('express');
const router = express.Router();

//remember to delete after restarting game
let userName = '';
//let userPronouns = '';

const getScreens = (userName) => ({
  initial: {
    name: 'initial', 
    image: 'images/start.jpg',
    text: `$You wake up on a beach. You can't seem to remember what got you here. In the distance, there is a ruin. Behind you, there are are voices. What do you do? `,
    choices: [
      { text: 'Walk toward ruin', value: 'say_hi_back', nextScreen: 'screen1' },
      { text: 'Turn around', value: 'ignore', nextScreen: 'screen2' }
    ]
  },
  screen1: {
    name: 'screen1', 
    image: 'images/ruin.jpg',
    text: `The ruin seems to have been a mirage, ${userName}. Ahead there seems to be more sand. To the left is the ocean.`,
    choices: [
      { text: 'Walk to the water', value: 'say_no_prob', nextScreen: 'screen4' },
      { text: 'Keep walking along the shore', value: 'ignore_2', nextScreen: 'screen3' }
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
    image: 'images/keepwalking.jpg',
    text: 'More sand. You begin to enjoy the calmness of the sea.',
    choices: [
      { text: 'Keep walking', value: 'gomore', nextScreen: 'screen5' },
      { text: 'Return to where you started', value: 'blank', nextScreen: 'initial' }
    ]
  },
  screen4: {
    name: 'screen4', 
    image: 'images/image2.png',
    text: 'This is the end so far, but check back again for more!',
    choices: [
      { text: 'Restart', value: 'blank', nextScreen: 'initial' },
      { text: 'Restart', value: 'blank', nextScreen: 'initial' }
    ]
  },
  screen5: {
    name: 'screen5', 
    image: 'images/keepwalking.jpg',
    text: 'More sand. Your worries about finding out how and why you are here disappear.',
    choices: [
      { text: 'Keep walking', value: 'gomore', nextScreen: 'screen6' },
      { text: 'blank', value: 'blank', nextScreen: 'screen3' }
    ]
  },
  screen6: {
    name: 'screen6', 
    image: 'images/walkend.jpg',
    text: 'You have become one with the shore. Why you got here does not matter, and it never has. The only thing that matters is this walk. Some seagulls have appeared next to you, and you keep walking.',
    choices: [
      { text: 'Restart', value: 'blank', nextScreen: 'initial' },
      { text: 'Restart', value: 'blank', nextScreen: 'initial' }
    ]
  },
});


router.get('/', (req, res) => {
  res.render('index', { screen: getScreens(userName).initial });
});

router.post('/submit-name', (req, res)=>{
  userName = req.body.userName;
  res.status(200).json({success:true});
});

router.post('/submit-pronouns', (req, res) => {
  userPronouns = req.body.userPronouns;
  res.status(200).json({ success: true });
});

router.get('/updated-initial', (req, res) => {
  res.json({ screen: getScreens(userName).initial });
});

router.post('/choice', (req, res) => {
  const choiceValue = req.body.choice;
  const currentScreen = getScreens(userName)[req.body.currentScreen];

  const choice = currentScreen.choices.find(c => c.value === choiceValue);

  if (!choice) {
    res.status(400).json({ error: 'Invalid choice' });
    return;
  }

  const nextScreen = getScreens(userName)[choice.nextScreen];
  res.json({ imagePath: nextScreen.image, screen: nextScreen });
});


module.exports = router;