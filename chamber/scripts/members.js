async function loadMembers() {
    try {
        const response = await fetch('./data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error loading members:', error);
    }
}

function displayMembers(members) {
    const container = document.getElementById('member-list');
    container.innerHTML = ''; // Clear existing content

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';

        const img = document.createElement('img');
        img.src = `images/logos/${member.icon}`;
        img.alt = member.name;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'member-info';

        const name = document.createElement('h2');
        name.textContent = member.name;

        const address = document.createElement('p');
        address.innerHTML = `<strong>Address:</strong> ${member.address}`;

        const phone = document.createElement('p');
        phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;


        const website = document.createElement('p');
        const link = document.createElement('a');
        link.href = member.website;
        link.target = '_blank';
        link.textContent = member.website;
        website.innerHTML = `<strong>Website:</strong> `;
        website.appendChild(link);


        const membership = document.createElement('p');
        membership.innerHTML = `<strong>Membership:</strong> ${getMembershipLabel(member.membershipLevel)}`;


        const description = document.createElement('p');
        description.textContent = member.description;


        infoDiv.appendChild(name);
        infoDiv.appendChild(address);
        infoDiv.appendChild(phone);
        infoDiv.appendChild(website);
        infoDiv.appendChild(membership);
        infoDiv.appendChild(description);


        memberCard.appendChild(img);
        memberCard.appendChild(infoDiv);

        container.appendChild(memberCard);
    });
}

function getMembershipLabel(level) {
    switch (level) {
        case 1:
            return 'Member';
        case 2:
            return 'Silver Member';
        case 3:
            return 'Gold Member';
        default:
            return 'Unknown';
    }
}

// Toggle View Logic
document.getElementById('gridBtn').addEventListener('click', () => {
    const container = document.getElementById('member-list');
    container.classList.remove('list-view');
    container.classList.add('grid-view');
});

document.getElementById('listBtn').addEventListener('click', () => {
    const container = document.getElementById('member-list');
    container.classList.remove('grid-view');
    container.classList.add('list-view');
});

loadMembers();