async function fetchQualities() {
    try {
        const response = await fetch('data/qualities.json');
        const data = await response.json();
        displayQualities(data.qualityList);
    } catch (error) {
        console.error('Error fetching the qualities:', error);
    }
}

function displayQualities(qualities) {
    const qualitiesList = document.getElementById('qualities-list');
    qualities.forEach(quality => {
        const qualityItem = document.createElement('div');
        qualityItem.classList.add('quality-item', 'col-6', 'm-3');

        const qualityName = document.createElement('h2');
        qualityName.textContent = quality.name;
        qualityName.classList.add('quality-name', 'h4');
        qualityItem.appendChild(qualityName);

        const qualityDescription = document.createElement('p');
        qualityDescription.textContent = quality.description;
        qualityDescription.classList.add('quality-description');
        qualityItem.appendChild(qualityDescription);

        qualitiesList.appendChild(qualityItem);
    });
}

fetchQualities();