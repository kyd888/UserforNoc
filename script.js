document.getElementById('search-btn').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '';

    if (!username) {
        alert('Please enter an Instagram username.');
        return;
    }

    const response = await fetch('/api/engaged_users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });

    if (response.ok) {
        const engagedUsers = await response.json();
        engagedUsers.forEach(([user, count]) => {
            const li = document.createElement('li');
            li.textContent = `${user}: ${count} engagements`;
            usersList.appendChild(li);
        });
    } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
    }
});
