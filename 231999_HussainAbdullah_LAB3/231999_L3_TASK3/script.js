// Array of user objects to be returned by the Promise
const usersData = [
    { id: 1, name: "Hussain Abdullah", email: "hussain@example.com", company: "Tech Corp" },
    { id: 2, name: "Saifullah", email: "saifi@example.com", company: "Innovation Labs" },
    { id: 3, name: "Safi", email: "safi@example.com", company: "Digital Solutions" },
    { id: 4, name: "Hassaan ", email: "hassaan@example.com", company: "Web Services Inc" },
];

// Function to add log entries to the console display
function addLog(message, type = 'info') {
    const consoleOutput = document.getElementById('console-output');
    const time = new Date().toLocaleTimeString();
    const logClass = `log-${type}`;
    
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${logClass}`;
    logEntry.innerHTML = `<span class="log-time">[${time}]</span>${message}`;
    
    consoleOutput.appendChild(logEntry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Function to clear console logs
function clearLogs() {
    document.getElementById('console-output').innerHTML = '';
}

// Function to show/hide elements
function showElement(id) {
    document.getElementById(id).classList.remove('hidden');
}

function hideElement(id) {
    document.getElementById(id).classList.add('hidden');
}

// Function to display users in HTML
function displayUsers(users) {
    const usersContainer = document.getElementById('users-container');
    
    usersContainer.innerHTML = users.map(user => `
        <div class="user-card">
            <div class="user-avatar">${user.name.charAt(0)}</div>
            <h3>${user.name}</h3>
            <p class="email">${user.email}</p>
            <p class="company">${user.company}</p>
        </div>
    `).join('');
}

// Function to display error message
function displayError(errorMessage) {
    document.getElementById('error-text').textContent = errorMessage;
}

// Function to reset the UI
function resetUI() {
    hideElement('loading');
    hideElement('error-message');
    hideElement('results-section');
    clearLogs();
    addLog('UI reset completed', 'info');
}

// Promise-based function to fetch users
function fetchUsers(shouldFail = false) {
    return new Promise((resolve, reject) => {
        addLog('Starting data fetch...', 'info');
        addLog('Simulating 3-second server delay...', 'info');
        
        // Use setTimeout() with 3 seconds delay
        setTimeout(() => {
            if (shouldFail) {
                // Reject using a boolean flag if data fails
                const errorMessage = 'Failed to fetch users: Server error (500)';
                addLog(errorMessage, 'error');
                reject(new Error(errorMessage));
            } else {
                // Resolve with array of user objects
                addLog('Data fetch successful!', 'success');
                addLog(`Returning ${usersData.length} users`, 'success');
                resolve(usersData);
            }
        }, 3000); // 3 seconds delay
    });
}

// Event listener for fetch button
document.getElementById('fetch-btn').addEventListener('click', () => {
    // Reset UI before new fetch
    resetUI();
    
    // Show loading indicator
    showElement('loading');
    
    // Get simulation mode from dropdown
    const simulationMode = document.getElementById('simulation-mode').value;
    const shouldFail = simulationMode === 'error';
    
    addLog(`Simulation mode: ${shouldFail ? 'Error (Reject)' : 'Success (Resolve)'}`, 'info');
    
    // Use .then() and .catch() to handle Promise resolution/rejection
    fetchUsers(shouldFail)
        .then(users => {
            // This block executes when Promise is resolved
            addLog('Processing received data...', 'info');
            
            // Hide loading and show results
            hideElement('loading');
            showElement('results-section');
            
            // Display the users
            displayUsers(users);
            
            addLog(`Displayed ${users.length} user cards`, 'success');
        })
        .catch(error => {
            // This block executes when Promise is rejected
            addLog(`Error caught: ${error.message}`, 'error');
            
            // Hide loading and show error
            hideElement('loading');
            showElement('error-message');
            displayError(error.message);
        });
});

// Event listener for reset button
document.getElementById('reset-btn').addEventListener('click', resetUI);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    addLog('Application initialized', 'info');
    addLog('Ready to fetch users', 'info');
});