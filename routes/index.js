const express = require('express');
const router = express.Router();

//remember to delete after restarting game
let userName = '';
//let userPronouns = '';

const getScreens = (userName) => ({
  initial: {
    name: 'initial', 
    image: 'images/start.jpg',
    text: `You wake up on a beach. You can't seem to remember what got you here. In the distance, there is a ruin. Behind you, there are are voices. What do you do? `,
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
      { text: 'Walk to the water', value: 'say_no_prob', nextScreen: 'water' },
      { text: 'Keep walking along the shore', value: 'ignore_2', nextScreen: 'screen3' }
    ]
  },
  water: {
    name: 'water', 
    image: 'images/water.jpg',
    text: `The water calls you. Do you go in?`,
    choices: [
      { text: 'Get in', value: 'say_no_prob', nextScreen: 'waterend' },
      { text: 'Keep walking along the shore', value: 'ignore_2', nextScreen: 'screen3' }
    ]
  },
  waterend: {
    name: 'waterend', 
    image: 'images/sea.jpg',
    text: `The Lord of the Sea, King Poseidon beckons you. "Ah, Sir Thalassius, my most loyal and valiant knight, it is a joyous occasion to behold your return from the depths, as the tides have longed for your presence within the hallowed halls of my undersea kingdom." You remember your duties and come to your senses.`,
    choices: [
      { text: 'Restart', value: 'say_no_prob', nextScreen: 'initial' },
      { text: 'Restart', value: 'ignore_2', nextScreen: 'initial' }
    ]
  },
  screen2: {
    name: 'screen2', 
    image: 'images/men.jpg',
    text: 'A group of friendly looking men are sitting on lawn chairs in front of you. They call out to you. "Hey, where`d you go?"',
    choices: [
      { text: 'Say "sorry?"', value: 'say_sorry', nextScreen: 'screen4' },
      { text: 'Turn back around', value: 'ignore_3', nextScreen: 'initial' }
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
    image: 'images/men.jpg',
    text: `We've been calling out to you for a while, ${userName}. Thought you wouldn't come back. Let's go to that hut over there, it's a bit windy.`,
    choices: [
      { text: 'Go with them', value: 'go', nextScreen: 'screen9' },
      { text: 'Say "who are you guys?"', value: 'who', nextScreen: 'screen7' }
    ]
  },
  screen5: {
    name: 'screen5', 
    image: 'images/keepwalking.jpg',
    text: 'More sand. Your worries about finding out how and why you are here disappear.',
    choices: [
      { text: 'Keep walking', value: 'gomore', nextScreen: 'screen6' },
      { text: 'Go back', value: 'blank', nextScreen: 'initial' }
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
  screen7: {
    name: 'screen7', 
    image: 'images/men.jpg',
    text: `What're you talking about, we're your friends! Cmon, let's go.`,
    choices: [
      { text: 'Believe them', value: 'blank', nextScreen: 'screen9' },
      { text: 'Turn back around', value: 'blank', nextScreen: 'initial' }
    ]
  },
  screen8: {
    name: 'screen8', 
    image: 'images/men.jpg',
    text: `What're you talking about, we're your friends! Cmon, let's go.`,
    choices: [
      { text: 'Believe them', value: 'blank', nextScreen: 'screen9' },
      { text: 'Turn back around', value: 'blank', nextScreen: 'initial' }
    ]
  },
  screen9: {
    name: 'screen9', 
    image: 'images/run.jpg',
    text: `You start following the men to the hut. You realize this might be your last chance to get away safely from them, with the beach behind your back.`,
    choices: [
      { text: 'Run to the ruin you first saw', value: 'blank', nextScreen: 'screen1' },
      { text: 'Continue following', value: 'follow', nextScreen: 'screen11' }
    ]
  },
  screen10: {
    name: 'screen10', 
    image: 'images/run.jpg',
    text: `You start following the men to the hut. You realize this might be your last chance to get away safely from them, with the beach behind your back.`,
    choices: [
      { text: 'Run', value: 'blank', nextScreen: 'screen10' },
      { text: 'Continue following', value: 'blank', nextScreen: 'screen11' }
    ]
  },
  screen11: {
    name: 'screen11', 
    image: 'images/hut.jpg',
    text: `You got to the hut. Some of your friends are going to their car to get something. One friend, is going to the hut by himself.`,
    choices: [
      { text: 'Go to the car', value: 'car', nextScreen: 'screen12' },
      { text: 'Follow the friend to the hut', value: 'hutfriend', nextScreen: 'screen13' }
    ]
  },
  screen12: {
    name: 'screen12', 
    image: 'images/come.jpg',
    text: `Did you need something, ${userName}?`,
    choices: [
      { text: 'Nope', value: 'blank', nextScreen: 'screen15' },
      { text: 'Can you take me home?', value: 'canhom', nextScreen: 'screen14' }
    ]
  },
  screen13: {
    name: 'screen13', 
    image: 'images/bite.jpg',
    text: `Take a bite of this, ...uh, dude!`,
    choices: [
      { text: 'My names not dude', value: 'namenot', nextScreen: 'screen_sim' },
      { text: 'Take a bite', value: 'bite', nextScreen: 'screendead' }
    ]
  },
  screen14: {
    name: 'screen14', 
    image: 'images/come.jpg',
    text: `Why do you want to go home?`,
    choices: [
      { text: `I don't know`, value: 'idk', nextScreen: 'screen15' },
      { text: 'I forgot I had homework', value: 'hw', nextScreen: 'screen16' }
    ]
  },
  screen15: {
    name: 'screen15', 
    image: 'images/come.jpg',
    text: `Don't be dumb. Let's go to the hut.`,
    choices: [
      { text: `Meet up with the friend already in the hut`, value: 'meetfr', nextScreen: 'screen13' },
      { text: 'Run to the ruin you first saw', value: 'runru', nextScreen: 'screen1' }
    ]
  },
  screendead: {
    name: 'screendead', 
    image: 'images/conc.jpg',
    text: `The thing you ate was laced with something. You start to lose conciousness...`,
    choices: [
      { text: 'Restart', value: 'blank', nextScreen: 'initial' },
      { text: 'Restart', value: 'blank', nextScreen: 'initial' }
    ]
  },
  screen_sim: {
    name: 'screen_sim', 
    image: 'images/bite.jpg',
    text: `Shit, gig's over! Shut it off!`,
    choices: [
      { text: 'What?', value: 'what', nextScreen: 'screen_sim_done' },
      { text: 'Run to the ruin you first saw', value: 'runu', nextScreen: 'screen1' }
    ]
  },
  screen_sim_done: {
    name: 'screen_sim_done', 
    image: 'images/chair.jpg',
    text: `You wake up in a chair full of people staring at you. From the back, someone shouts "Restart the game."`,
    choices: [
      { text: 'Restart', value: 'blank', nextScreen: 'initial' },
      { text: 'Restart', value: 'blank', nextScreen: 'initial' }
    ]
  },
  screen16: {
    name: 'screen16', 
    image: 'images/come.jpg',
    text: `Damn. Well you can't miss the homework. Get in the car.`,
    choices: [
      { text: `Get in`, value: 'getin', nextScreen: 'screen_home' },
      { text: 'Run to the first ruin you saw', value: 'runrui', nextScreen: 'screen1' }
    ]
  },
  screen_home: {
    name: 'screen_home', 
    image: 'images/home.jpg',
    text: `You're in your friends car, supposedly going home. You're unsure of where exactly that is, but you feel safe.`,
    choices: [
      { text: `Play again`, value: 'blank', nextScreen: 'initial' },
      { text: 'Play again', value: 'blank', nextScreen: 'initial' }
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