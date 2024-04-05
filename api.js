document.addEventListener('DOMContentLoaded', async function () {
  const app = document.getElementById('root');
  const container = document.createElement('div');
  container.classList.add('container'); // Use classList.add for adding classes
  app.appendChild(container);

  try {
    const response = await fetch('https://ghibli.rest/films');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Create cards and append them to the container
    const fragment = document.createDocumentFragment(); // Use document fragments for DOM manipulation
    for (const movie of data) {
      const card = document.createElement('div');
      card.classList.add('card'); // Use classList.add for adding classes

      const h4 = document.createElement('h4');
      h4.textContent = movie.title;

      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      p.textContent = `${movie.description}...`;

      const locationResponse = await fetch(`https://ghibli.rest/locations?id=${movie.id}`);
      if (locationResponse.ok) {
        const locationData = await locationResponse.json();
        const locations = locationData.map(location => location.name).join(', ');
        const locationParagraph = document.createElement('p');
        locationParagraph.textContent = `Locations: ${locations}`;
        card.appendChild(locationParagraph);
      }

      card.appendChild(h4);
      card.appendChild(p);
      fragment.appendChild(card); // Append card to fragment
    }
    container.appendChild(fragment); // Append fragment to container

  } catch (error) {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working! ${error.message}`;
    app.appendChild(errorMessage);
  }

  const searchbar = document.getElementById('searchbar');
  const resultsContainer = document.getElementById('option-2-enhanced-results');

  if (searchbar && resultsContainer) { // Ensure searchbar and resultsContainer exist
    searchbar.addEventListener('input', searchMovies);
  }

  function searchMovies() {
    const searchTerm = searchbar.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      const title = card.querySelector('h4').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();

      card.style.display = (title.includes(searchTerm) || description.includes(searchTerm)) ? 'block' : 'none'; // Use ternary operator
    });
  }
});
