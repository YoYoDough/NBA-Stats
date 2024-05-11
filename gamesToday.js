const dateDropdown = document.getElementById('date-dropdown');
const gameResultsDiv = document.getElementById('game-results');

// Function to animate the NBA logo sliding into view
function slideInLogo() {
    anime({
        targets: '.nba-logo',
        left: '10px', // Adjust the final position as needed
        duration: 4000, // Animation duration in milliseconds
        easing: 'easeInOutQuad' // Easing function for smooth animation
    });
}

// Function to fetch game data for the selected date
async function fetchGameData(selectedDate) {
    try {
        const response = await fetch(`https://api.balldontlie.io/v1/games?dates[]=${selectedDate}`, {
            headers: {
                'Authorization': '03201607-47e8-4163-b8c1-7fc113495a7e'
            }
        });
        const data = await response.json();
        console.log(data);
        displayGameResults(data);
    } catch (error) {
        console.error('Error fetching game data:', error);
        gameResultsDiv.innerHTML = 'Error fetching game data. Please try again.';
    }
}

// Function to display game results
function displayGameResults(gameData) {
    if (gameData.data.length === 0) {
        gameResultsDiv.innerHTML = 'No games found for the selected date.';
        return;
    }

    let html = '<h2>Game Results</h2>';
    gameData.data.forEach(game => {
        html += `<p>${game.home_team.full_name} vs ${game.visitor_team.full_name}: ${game.home_team_score} - ${game.visitor_team_score}</p>`;
    });
    gameResultsDiv.innerHTML = html;
}

// Populate the dropdown with dates
populateDateDropdown();

// Function to populate the dropdown with dates
function populateDateDropdown() {
    const today = new Date();
    const options = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = formatDate(date);
        options.push(`<option value="${formattedDate}">${formattedDate}</option>`);
    }
    dateDropdown.innerHTML = options.join('');
}

// Function to format date as YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Event listener for dropdown change
dateDropdown.addEventListener('change', function() {
    fetchGameData(this.value); // Fetch game data for the selected date
});

// Fetch today's game data when the page loads
fetchGameData(formatDate(new Date()));

// Get the player image elements
const leftPlayerImage = document.getElementById('left-player-image');
const rightPlayerImage = document.getElementById('right-player-image');


// Define the animation properties
const animationLeft = anime({
    targets: leftPlayerImage,
    scale: [1, 1.1], // Scale from 1 to 1.1
    duration: 700, // Duration of the animation (in milliseconds)
    easing: 'easeInOutQuad', // Easing function
    direction: 'alternate', // Alternate direction
    loop: false, // Don't loop the animation by default
    autoplay: false, // Don't autoplay the animation
});

const animationRight = anime({
    targets: rightPlayerImage,
    scale: [1, 1.1], // Scale from 1 to 1.1
    duration: 700, // Duration of the animation (in milliseconds)
    easing: 'easeInOutQuad', // Easing function
    direction: 'alternate', // Alternate direction
    loop: false, // Don't loop the animation by default
    autoplay: false, // Don't autoplay the animation
});

// Add event listener for mouseenter
leftPlayerImage.addEventListener('mouseenter', function() {
    // Play the animation on mouseenter
    animationLeft.play();
});

// Add event listener for mouseleave
leftPlayerImage.addEventListener('mouseleave', function() {
    // Reverse the animation on mouseleave
    animationLeft.reverse();
});

// Add event listener for mouseenter
rightPlayerImage.addEventListener('mouseenter', function() {
    // Play the animation on mouseenter
    animationRight.play();
});

// Add event listener for mouseleave
rightPlayerImage.addEventListener('mouseleave', function() {
    // Reverse the animation on mouseleave
    animationRight.reverse();
});

document.addEventListener('DOMContentLoaded', function() {
    slideInLogo();
});