document.addEventListener('DOMContentLoaded', () => {
    const choiceButtons = document.querySelectorAll('button[data-choice]');
    choiceButtons.forEach((button) => {
      button.addEventListener('click', handleChoice);
    });
    const nameForm = document.getElementById('nameForm');
    nameForm.addEventListener('submit', handleNameFormSubmit);
  });

  function handleNameFormSubmit(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const gameText = document.getElementById('gameText');
    gameText.textContent = `The cat says hi, ${userName}!`;
    const nameFormContainer = document.getElementById('nameFormContainer');
    nameFormContainer.style.display = 'none';
    const container = document.querySelector('.container');
    container.classList.remove('hidden');
  }
  
  function handleChoice(event) {
    const choice = event.target.dataset.choice;
    const currentScreen = event.target.parentElement.dataset.currentScreen;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/choice', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        updateImage(data.imagePath);
        updateTextAndChoices(data.screen);
      }
    };
    xhr.send(`choice=${encodeURIComponent(choice)}&currentScreen=${encodeURIComponent(currentScreen)}`);
  }
  
  
  function updateImage(imagePath) {
    const gameImage = document.getElementById('gameImage');
    gameImage.src = imagePath;
  }
  
  function updateTextAndChoices(screen) {
    const gameText = document.getElementById('gameText');
    const choices = document.getElementById('choices');
  
    gameText.textContent = screen.text;
    choices.innerHTML = '';
    choices.dataset.currentScreen = screen.name; // Add this line
  
    screen.choices.forEach(choice => {
      const button = document.createElement('button');
      button.textContent = choice.text;
      button.dataset.choice = choice.value;
      button.addEventListener('click', handleChoice);
      choices.appendChild(button);
    });
  }
  
  