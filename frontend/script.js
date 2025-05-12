document.addEventListener('DOMContentLoaded', function() {
    const fetchDataButton = document.getElementById('fetch-data');
    const dataContainer = document.getElementById('data-container');

    fetchDataButton.addEventListener('click', fetchDataFromAPI);

    function fetchDataFromAPI() {
        fetch('/api')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                dataContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
            });
    }

    function displayData(data) {
        dataContainer.innerHTML = '';
        
        if (data && data.items && data.items.length > 0) {
            const items = data.items;
            
            items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'item';
                itemElement.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p><strong>ID:</strong> ${item.id}</p>
                `;
                dataContainer.appendChild(itemElement);
            });
        } else {
            dataContainer.innerHTML = '<p>No data available.</p>';
        }
    }
});