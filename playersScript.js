// Function to animate the NBA logo sliding into view
function slideInLogo() {
    anime({
        targets: '.nba-logo',
        left: '10px', // Adjust the final position as needed
        duration: 4000, // Animation duration in milliseconds
        easing: 'easeInOutQuad' // Easing function for smooth animation
    });
}

const fetchPlayerId = async (firstName, lastName) => {
    try {
        const response = await fetch(`https://api.balldontlie.io/v1/players?first_name=${firstName}&last_name=${lastName}`, {
            headers: {
                'Authorization': '03201607-47e8-4163-b8c1-7fc113495a7e'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.data.length === 0) {
            throw new Error('Player not found');
        }
        console.log(data.data[0]);
        return data.data[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const fetchPlayerStats = async (playerId) => {
    try {
        const response = await fetch(`https://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${playerId}`, {
            headers: {
                'Authorization': '03201607-47e8-4163-b8c1-7fc113495a7e'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        // Display the player's stats
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const displayPlayerStats = (playerData, playerStats) => {
    const playerInfo = playerData;
    const seasonAverages = playerStats.data[0];
    
    document.getElementById("player-data").innerHTML = `
        <h3>${playerInfo.first_name} ${playerInfo.last_name}</h3>
        <p>Position: ${playerInfo.position}</p>
        <p>Height: ${playerInfo.height}</p>
        <p>Weight: ${playerInfo.weight} lbs</p>
        <p>Team: ${playerInfo.team.full_name}</p>
        <p>Games Played: ${seasonAverages.games_played}</p>
        <p>Games Played: ${seasonAverages.min}</p>
        <p>Points per game: ${seasonAverages.pts}</p>
        <p>Assists per game: ${seasonAverages.ast}</p>
        <p>Rebounds per game: ${seasonAverages.reb}</p>
        <!-- Add more stats as needed -->
    `;
};

async function searchPlayer() {
    try {
        // Get the input value
        var playerName = document.getElementById("player-search").value;
        var names = playerName.split(" ");
        var firstName = names[0];
        var lastName = names.slice(1).join(" ");
        // Make sure the input is not empty
        if (playerName.trim() !== "") {
            // Fetch player data using the provided function
            const playerData = await fetchPlayerId(firstName, lastName);

            // Fetch player stats using the player's ID
            const playerStats = await fetchPlayerStats(playerData.id);

            // Display the player's data
            displayPlayerStats(playerData, playerStats);
        } else {
            // Input is empty
            document.getElementById("player-data").innerHTML = "Please enter a player name.";
        }
    } catch (error) {
        // Handle errors
        console.error('Error fetching player data:', error);
        document.getElementById("player-data").innerHTML = "Error fetching player data. Please try again.";
    }
}

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