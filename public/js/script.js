document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const closeBtn = document.querySelector('.close');
    modal.style.display = 'block';

    closeBtn.onclick = function () {
      modal.style.display = 'none';
    };
    const choiceButtons = document.querySelectorAll('button[data-choice]');
    choiceButtons.forEach((button) => {
      button.addEventListener('click', handleChoice);
    });
    const nameForm = document.getElementById('nameForm');
    nameForm.addEventListener('submit', handleNameFormSubmit);
  });

  const pronounForm = document.getElementById('pronounForm');
  pronounForm.addEventListener('submit', handlePronounFormSubmit);

  function handleNameFormSubmit(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/submit-name', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const nameFormContainer = document.getElementById('nameFormContainer');
        modal.style.display = 'none';
        const container = document.querySelector('.container');
        container.classList.remove('hidden');
  
        const refreshXhr = new XMLHttpRequest();
        refreshXhr.open('GET', '/updated-initial', true);
        refreshXhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        refreshXhr.onreadystatechange = () => {
          if (refreshXhr.readyState === 4 && refreshXhr.status === 200) {
            const data = JSON.parse(refreshXhr.responseText);
            updateImage(data.screen.image);
            updateTextAndChoices(data.screen);
          }
        };
        refreshXhr.send();
      }
    };
    xhr.send(`userName=${encodeURIComponent(userName)}`);
  }
  
  

  function handlePronounFormSubmit(event) {
    event.preventDefault();
    const userPronouns = document.getElementById('userPronouns').value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/submit-pronouns', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(refreshXhr.responseText);
        updateImage(data.screen.image);
        updateTextAndChoices(data.screen);      }
    };
    xhr.send(`userPronouns=${encodeURIComponent(userPronouns)}`);
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
    choices.dataset.currentScreen = screen.name;
  
    screen.choices.forEach(choice => {
      const button = document.createElement('button');
      button.textContent = choice.text;
      button.dataset.choice = choice.value;
      button.addEventListener('click', handleChoice);
      choices.appendChild(button);
    });
  }
  
