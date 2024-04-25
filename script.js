

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

    

    console.log("Document is ready.");

    // Fetch NBA team data
    const league = 'standard';
    const season = '2023';
    
    const teamsUrl = `https://api-nba-v1.p.rapidapi.com/standings?league=${league}&season=${season}`;
    
    const teams = {
        async: true,
        crossDomain: true,
        method: 'GET',
        url: teamsUrl,
        headers: {
            'X-RapidAPI-Key': 'f7aa79c587msh01418fd6f3f6568p1caa85jsn7673ae8e97c0',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    
    $.ajax(teams).done(function(response) {
        console.log(response);
        const eastTeams = [];
        const westTeams = [];
    
        response.response.forEach(team => {
            console.log("Team:", team.team.name, "Conference:", team.conference.name);
            if (team.conference.name === "east") {
                eastTeams.push(team);
            } else if (team.conference.name === "west") {
                westTeams.push(team);
            }
    
        });
    
        westTeams.sort((a, b) => b.win.percentage - a.win.percentage);
        eastTeams.sort((a, b) => b.win.percentage - a.win.percentage);
    
        console.log(eastTeams.length);
        console.log(westTeams.length);
    
        console.log("Eastern Teams:", eastTeams); // Log Eastern conference teams
        console.log("Western Teams:", westTeams); // Log Western conference teams
    
    
        createTable("East Teams", eastTeams, "#east-teams");
        createTable("West Teams", westTeams, "#west-teams");
    });
    
    function createTable(title, teams, containerId) {
        const table = $('<table>').addClass('teams-table');
        const thead = $('<thead>').append(
            $('<tr>').append(
                $('<th>').text('Teams'),
                $('<th>').text('Team Record'),
                $('<th>').text('Win %'),
                $('<th>').text('Home Record'),
                $('<th>').text('Away Record')
            )
        );
        const tbody = $('<tbody>');
    
        teams.forEach(function(team) {
            const teamName = team.team.name;
            const teamRecord = team.win.total + "-" + team.loss.total;
            const teamWinPercentage = team.win.percentage;
            const homeRecord = team.win.home + "-" + team.loss.home;
            const awayRecord = team.win.away + "-" + team.loss.away;
    
            // Create table row
            const row = $('<tr>');
    
            // Create anchor tag for team name
            const nameData = $('<td>').append(teamName);
    
            // Create table data for record and win percentage
            const recordData = $('<td>').text(teamRecord);
            const winPercentageData = $('<td>').text(teamWinPercentage);
            const homeRecordData = $('<td>').text(homeRecord);
            const awayRecordData = $('<td>').text(awayRecord);
    
            // Append table data to row
            row.append(nameData, recordData, winPercentageData, homeRecordData, awayRecordData);
    
            // Append row to table body
            tbody.append(row);
    
        });
    
        // Append table head and body to table
        table.append(thead, tbody);
    
        // Append table to the specified container
        $(containerId).append(table);
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        document.body.addEventListener('click', function(event) {
            if (event.target && event.target.classList.contains('team-link')) {
                event.preventDefault();
                console.log("Team link clicked!"); // Check if event listener is triggered
                const clickedTeamName = event.target.dataset.teamName;
                console.log("Clicked Team Name:", clickedTeamName); // Log clicked team name
            }
        });
    });