async function fetchQualities() {
    try {
        const response = await fetch('data/qualities.json');
        const data = await response.json();
        const sortedQualities = sortQualities(data.qualityList, 'random');
        displayQualities(sortedQualities);
    
        // Set the background color of the header
        document.getElementById("header").style.background = "linear-gradient(to right, " + getRandomColor() + ", " + getRandomColor() + ")";
    } catch (error) {
        console.error('Error fetching the qualities:', error);
    }
}

function sortQualities(qualities, sortBy) {
    switch (sortBy) {
        case 'alphabetical':
            return qualities.sort((a, b) => a.name.localeCompare(b.name));
        case 'newest':
            return qualities.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'oldest':
            return qualities.sort((a, b) => new Date(a.date) - new Date(b.date));
        case 'random':
            return qualities.sort(() => Math.random() - 0.5);
        default:
            return qualities;
    }
}

function getRandomColor() {
    const colors = [
        '#B22222', '#8B4513', '#2F4F4F', '#6A5ACD', '#556B2F', '#8A2BE2', '#A52A2A', '#D2691E', '#808000', '#483D8B', '#9B30FF', '#CD5C5C', '#4682B4', '#9C7A7D', '#5F9EA0', '#C71585', '#D2B48C', '#B8860B', '#8B008B', '#4B0082', '#800080', '#DAA520', '#9E2A2F', '#9932CC', '#8B0000', '#228B22', '#5C4033', '#800000', '#6B8E23', '#2E8B57', '#B0C4DE', '#6B8E23', '#556B2F', '#800080', '#D8BFD8', '#C71585', '#BC8F8F', '#CD853F', '#FF6347', '#F08080', '#FF4500', '#DA70D6', '#8A2BE2', '#FFD700', '#FF1493', '#9ACD32', '#8FBC8F', '#32CD32', '#FF8C00'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function displayQualities(qualities) {
    const qualitiesList = document.getElementById('qualities-list');
    qualitiesList.innerHTML = ''; // Clear existing qualities
    
    qualities.forEach(quality => {
        // Generate random color
        const randomColor = getRandomColor();

        // Starting item
        const qualityItem = document.createElement('div');
        qualityItem.classList.add('col-md-6', 'col-lg-4', 'col-xl-3', 'mb-4');

        // Starting card
        const qualityCard = document.createElement('div');
        qualityCard.classList.add('card', 'h-100');
        qualityCard.style.borderColor = randomColor;

        // Starting body
        const qualityBody = document.createElement('div');
        qualityBody.classList.add('card-body');

        // Name
        const qualityName = document.createElement('h3');
        qualityName.classList.add('card-title', 'h4');
        qualityName.textContent = quality.name;
        qualityName.style.color = randomColor;
        qualityBody.appendChild(qualityName);

        // Endorsements
        if (quality.endorsedBy && Array.isArray(quality.endorsedBy) && quality.endorsedBy.length > 0) {
            const qualityEndorsed = document.createElement('h4');
            qualityEndorsed.classList.add('card-subtitle', 'h6', 'mb-3');

            let qualityEndorsedNames = "";

            quality.endorsedBy.forEach((endorsement, index) => {
                if (index === quality.endorsedBy.length - 2) {
                    qualityEndorsedNames += endorsement.firstName + ' and ';
                } else if (index === quality.endorsedBy.length - 1) {
                    qualityEndorsedNames += endorsement.firstName;
                } else {
                    qualityEndorsedNames += endorsement.firstName + ', ';
                }
            });
            
            qualityEndorsed.innerHTML = 'Endorsed by ' + qualityEndorsedNames;

            qualityBody.appendChild(qualityEndorsed);
        }

        // Description
        const qualityDescription = document.createElement('p');
        qualityDescription.classList.add('card-text');
        qualityDescription.textContent = quality.description;
        qualityBody.appendChild(qualityDescription);

        // Date
        const qualityDate = document.createElement('small');
        // qualityDate.classList.add('text-muted');
        const dateToTransform = new Date(quality.date + 'T12:00:00');        const formattedDate = dateToTransform.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        qualityDate.textContent = 'Added on ' + formattedDate;
        qualityBody.appendChild(qualityDate);

        // Label - Check if the date is within the last 30 days
        const currentDate = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(currentDate.getDate() - 30);

        if (dateToTransform >= thirtyDaysAgo && dateToTransform <= currentDate) {
            console.log('The date is within the last 30 days.');
            const newLabel = document.createElement('span');
            newLabel.classList.add('new-label');
            newLabel.textContent = 'New';
            newLabel.style.backgroundColor = randomColor;
            qualityCard.appendChild(newLabel);
        }

        // Bringing pieces together
        qualityCard.appendChild(qualityBody);
        qualityItem.appendChild(qualityCard);
        qualitiesList.appendChild(qualityItem);
    });
}

document.getElementById('sort-options').addEventListener('change', (event) => {
    const sortBy = event.target.value;
    fetch('data/qualities.json')
        .then(response => response.json())
        .then(data => {
            const sortedQualities = sortQualities(data.qualityList, sortBy);
            displayQualities(sortedQualities);
        })
        .catch(error => console.error('Error fetching the qualities:', error));
});

fetchQualities();