async function fetchQualities() {
    try {
        const response = await fetch('data/qualities.json');
        const data = await response.json();
        displayQualities(data.qualityList);
    } catch (error) {
        console.error('Error fetching the qualities:', error);
    }
}

function getRandomColor() {
    const colors = [
        'LightCoral', 'LightSalmon', 'LightPink', 'LightGoldenRodYellow', 'LightYellow', 'LightGreen', 'LightSeaGreen', 'LightSkyBlue', 'LightSteelBlue', 'LightBlue', 'LightCyan', 'LightSlateGray', 'LightGray', 'Lavender', 'MistyRose', 'PeachPuff', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PapayaWhip'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function displayQualities(qualities) {
    const qualitiesList = document.getElementById('qualities-list');
    qualities.forEach(quality => {
        const qualityItem = document.createElement('div');
        qualityItem.classList.add('quality-item', 'col-md-6', 'col-lg-4', 'pb-4');

        const qualityWrapper = document.createElement('div');
        qualityWrapper.classList.add('quality-wrapper', 'h-100', 'p-3');
        qualityWrapper.style.backgroundColor = getRandomColor();

        const qualityName = document.createElement('h2');
        qualityName.textContent = quality.name;
        qualityName.classList.add('quality-name', 'h5');
        qualityWrapper.appendChild(qualityName);

        const qualityDescription = document.createElement('p');
        qualityDescription.textContent = quality.description;
        qualityDescription.classList.add('quality-description');
        qualityWrapper.appendChild(qualityDescription);

        qualityItem.appendChild(qualityWrapper);
        qualitiesList.appendChild(qualityItem);
    });
}

fetchQualities();