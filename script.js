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
        "#FFFAFA", "#F8F8FF", "#D6FFFF", "#F3FFFB", "#FFFFF4", "#FFE8D8", 
        "#E6FFFF", "#F2FFF4", "#F7F7F7", "#F9F9D9", "#FFDCE1", "#E1F8F8", 
        "#F9FAFA", "#F5F0EB", "#FFF8D1", "#E3E6F8", "#FFE8ED", "#F1E3B3", 
        "#F8FFF1", "#F2F7FF", "#B0F8F2", "#FAF5F4", "#F8F2E2", "#D9FFD8", 
        "#D2B0F0", "#B0E4FB", "#F0FAFA", "#F0F8F4", "#F3F0D7", "#F8F0E0", 
        "#FFEBE2", "#E0FAF5", "#E0D8F7", "#F3E6FB", "#B0F0D7", "#F8F5F0", 
        "#E1FAFF", "#F2E4EA", "#D1F9FF", "#D9DFF9"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function displayQualities(qualities) {
    const qualitiesList = document.getElementById('qualities-list');
    qualities.forEach(quality => {
        const qualityItem = document.createElement('div');
        qualityItem.classList.add('col-md-6', 'col-lg-4', 'mb-4');

        const qualityCard = document.createElement('div');
        qualityCard.classList.add('card', 'h-100');
        qualityCard.style.backgroundColor = getRandomColor();

        const qualityBody = document.createElement('div');
        qualityBody.classList.add('card-body');

        const qualityName = document.createElement('h3');
        qualityName.classList.add('card-title', 'h5');
        qualityName.textContent = quality.name;
        qualityBody.appendChild(qualityName);

        const qualityDescription = document.createElement('p');
        qualityDescription.classList.add('card-text');
        qualityDescription.textContent = quality.description;
        qualityBody.appendChild(qualityDescription);

        const qualityDate = document.createElement('small');
        qualityDate.classList.add('text-muted');
        const dateToTransform = new Date(quality.date + 'T12:00:00');        const formattedDate = dateToTransform.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        qualityDate.textContent = 'Added on ' + formattedDate;
        qualityBody.appendChild(qualityDate);

        qualityCard.appendChild(qualityBody);

        if (quality.endorsedBy && Array.isArray(quality.endorsedBy) && quality.endorsedBy.length > 0) {
            const qualityFooter = document.createElement('div');
            qualityFooter.classList.add('card-footer');

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
            
            const qualityEndorsed = document.createElement('small');
            qualityEndorsed.innerHTML = 'Endorsed by ' + qualityEndorsedNames;
            qualityDate.classList.add('text-body-secondary');
            
            qualityFooter.appendChild(qualityEndorsed);

            qualityCard.appendChild(qualityFooter);
        }

        qualityItem.appendChild(qualityCard);
        qualitiesList.appendChild(qualityItem);
    });
}

fetchQualities();