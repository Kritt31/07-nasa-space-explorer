// Select the necessary DOM elements
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const getImagesButton = document.querySelector('.filters button');
const gallery = document.getElementById('gallery');

// Your NASA API key
const apiKey = 'aWE0vzo9Kp6H7aYpLtp2anfO4xjItlP2Hhs5G8Kt';

// Add an event listener to the button
getImagesButton.addEventListener('click', () => {
  // Get the selected date range
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

  // Validate the date inputs
  if (!startDate || !endDate) {
    alert('Please select both start and end dates.');
    return;
  }

  // Fetch images from the NASA APOD API
  fetchImages(startDate, endDate);
});

// Function to fetch images from the NASA APOD API
const fetchImages = async (startDate, endDate) => {
  try {
    // Show a loading message in the gallery
    gallery.innerHTML = '<p>🔄 Loading space photos…</p>';

    // Construct the API URL with the date range and API key
    const apiUrl = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

    // Fetch data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if the response contains valid data
    if (data.error) {
      alert(data.error.message);
      gallery.innerHTML = ''; // Clear the loading message
      return;
    }

    // Display the images in the gallery
    displayImages(data);
  } catch (error) {
    console.error('Error fetching data from NASA API:', error);
    alert('Failed to fetch images. Please try again later.');
    gallery.innerHTML = ''; // Clear the loading message
  }
};

// Function to display images in the gallery
const displayImages = (images) => {
  // Clear the gallery
  gallery.innerHTML = '';

  // Loop through the images and create HTML for each
  images.forEach((image) => {
    // Only display images (skip videos)
    if (image.media_type === 'image') {
      const imageElement = document.createElement('div');
      imageElement.classList.add('gallery-item');
      imageElement.innerHTML = `
        <img src="${image.url}" alt="${image.title}" />
        <h3>${image.title}</h3>
        <p>${image.date}</p>
      `;

      // Add click event to open modal
      imageElement.addEventListener('click', () => {
        openModal(image);
      });

      gallery.appendChild(imageElement);
    }
  });

  // If no images were found, show a placeholder message
  if (gallery.innerHTML === '') {
    gallery.innerHTML = '<p>No images found for the selected date range.</p>';
  }
};

// Select modal elements
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalExplanation = document.getElementById('modalExplanation');
const closeButton = document.querySelector('.close-button');

// Function to open the modal
const openModal = (image) => {
  modalImage.src = image.url;
  modalTitle.textContent = image.title;
  modalDate.textContent = `Date: ${image.date}`;
  modalExplanation.textContent = image.explanation;
  modal.style.display = 'flex';
};

// Function to close the modal
const closeModal = () => {
  modal.style.display = 'none';
};

// Add event listener to close button
closeButton.addEventListener('click', closeModal);

// Add event listener to close modal when clicking outside the content
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Array of fun space facts
const spaceFacts = [
  "A day on Venus is longer than a year on Venus.",
  "There are more stars in the universe than grains of sand on Earth.",
  "Jupiter has 79 moons, the most of any planet in our solar system.",
  "The Sun accounts for 99.86% of the mass in the solar system.",
  "Neutron stars are so dense that a sugar-cube-sized amount of their material would weigh a billion tons.",
  "Saturn's rings are made mostly of ice particles, with some rock and dust.",
  "Mars has the tallest volcano in the solar system, Olympus Mons, which is about three times the height of Mount Everest."
];

// Function to display a random space fact
const displayRandomFact = () => {
  // Select the "Did You Know?" section
  const funFactElement = document.getElementById('funFact');

  // Pick a random fact from the array
  const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];

  // Insert the random fact into the section
  funFactElement.textContent = `🌌 Did You Know? ${randomFact}`;
};

// Call the function to display a random fact when the page loads
displayRandomFact();
