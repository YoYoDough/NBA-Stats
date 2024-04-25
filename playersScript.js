document.addEventListener("DOMContentLoaded", function() {
    const teamIDs = [
        { id: 1, name: "Atlanta Hawks" },
        { id: 2, name: "Boston Celtics" },
        { id: 4, name: "Brooklyn Nets" },
        { id: 5, name: "Charlotte Hornets" },
        { id: 6, name: "Chicago Bulls" },
        { id: 7, name: "Cleveland Cavaliers" },
        { id: 8, name: "Dallas Mavericks" },
        { id: 9, name: "Denver Nuggets" },
        { id: 10, name: "Detroit Pistons" },
        { id: 11, name: "Golden State Warriors" },
        { id: 14, name: "Houston Rockets" },
        { id: 15, name: "Indiana Pacers" },
        { id: 16, name: "LA Clippers" },
        { id: 17, name: "Los Angeles Lakers" },
        { id: 19, name: "Memphis Grizzlies" },
        { id: 20, name: "Miami Heat" },
        { id: 21, name: "Milwaukee Bucks" },
        { id: 22, name: "Minnesota Timberwolves" },
        { id: 23, name: "New Orleans Pelicans" },
        { id: 24, name: "New York Knicks" },
        { id: 25, name: "Oklahoma City Thunder" },
        { id: 26, name: "Orlando Magic" },
        { id: 27, name: "Philadelphia 76ers" },
        { id: 28, name: "Phoenix Suns" },
        { id: 29, name: "Portland Trail Blazers" },
        { id: 30, name: "Sacramento Kings" },
        { id: 31, name: "San Antonio Spurs" },
        { id: 38, name: "Toronto Raptors" },
        { id: 40, name: "Utah Jazz" },
        { id: 41, name: "Washington Wizards" }
    ];
    const teamSelector = document.getElementById("team-selector");
    const playerDataDiv = document.getElementById("player-data");

    // Populate team selector dropdown
    teamIDs.forEach(team => {
        const option = document.createElement("option");
        option.value = team.id;
        option.textContent = team.name;
        teamSelector.appendChild(option);
    });

    teamSelector.addEventListener("change", async function() {
        const teamId = teamSelector.value;
        const url = `https://api-nba-v1.p.rapidapi.com/players?team=${teamId}&season=2023`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f7aa79c587msh01418fd6f3f6568p1caa85jsn7673ae8e97c0',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data); // Log the fetched data
            return data;
        } catch (error) {
            console.error(error);
            return null; // Return null or handle the error accordingly
        }
    });

    fetchPlayerData(teamId, season);

    // Function to create a table for a player
    function createPlayerTable(players, containerId) {
        const table = $('<table>').addClass('players-table');
        const thead = $('<thead>').append(
            $('<tr>').append(
                $('<th>').text('Name'),
                $('<th>').text('College'),
                $('<th>').text('Weight'),
                $('<th>').text('Height'),
                $('<th>').text('Country')
                // Add more headers as needed
            )
        );
        const tbody = $('<tbody>');
    
        players.forEach(function(player) {
            const name = player.firstname + " " + player.lastname;
            const college = player.college;
            const weight = player.weight_pounds; // Assuming weight is in pounds
            const height = player.height_feet + "'" + player.height_inches; // Assuming height is in feet
            const country = player.country;
            // Add more player details as needed
    
            // Create table row
            const row = $('<tr>');
    
            // Create table data for player details
            const nameData = $('<td>').text(name);
            const collegeData = $('<td>').text(college);
            const weightData = $('<td>').text(weight);
            const heightData = $('<td>').text(height);
            const countryData = $('<td>').text(country);
            // Add more data cells as needed
    
            // Append table data to row
            row.append(firstNameData, lastNameData, collegeData, weightData, heightData, countryData);
            // Append row to table body
            tbody.append(row);
        });
    
        // Append table head and body to table
        table.append(thead, tbody);
    
        // Append table to container
        $(containerId).empty().append(table);
    }
});