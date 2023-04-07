
document.addEventListener('DOMContentLoaded', () => {
    const image1Button = document.getElementById('image1');
    const image2Button = document.getElementById('image2');
    const image3Button = document.getElementById('image3');
    const displayImage = document.getElementById('displayImage');
  
    const imagePaths = {
      'image1': 'image1.jpg',
      'image2': 'image2.png',
    };
  
    image1Button.addEventListener('click', () => {
        console.log('Image 1 button clicked');
      displayImage.src = imagePaths['image1'];
    });
  
    image2Button.addEventListener('click', () => {
      displayImage.src = imagePaths['image2'];
    });
  
    image3Button.addEventListener('click', () => {
      displayImage.src = imagePaths['image3'];
    });
  });

  const nameForm = document.getElementById('nameForm');

  nameForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value;
  
    const response = await fetch('/saveName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
  
    if (response.ok) {
      console.log('Name saved successfully');
    } else {
      console.error('Error saving name');
    }
  });


nameForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('nameInput');
  const name = nameInput.value;
  console.log('Submitting name:', name); // Add a console log here

  const response = await fetch('/saveName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  console.log('Response status:', response.status); // Add a console log here

  if (response.ok) {
    console.log('Name saved successfully');
    // Close the modal after successful submission
    const nameModal = document.getElementById('nameModal');
    nameModal.style.display = 'none';
  } else {
    console.error('Error saving name');
  }
});

showModal();
