const express = require('express');
const app = express();
const { fetchTeamData, fetchPlayerData } = require('./dataService');

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Route for playersOnTeamStats
app.get('playersOnTeamStats.html', async (req, res) => {
    try {
        const teamData = await fetchTeamData();
        const playerData = await fetchPlayerData();
        res.render('playersOnTeamStats.html', { teamData, playerData });
    } catch (error) {
        console.error('Error rendering page:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Other routes and middleware can be defined here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});