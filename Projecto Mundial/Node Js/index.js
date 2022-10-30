const express = require('express');

const sql = require("mssql");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3306;

const app = express();
const corse= require('cors');
app.use(corse())
var WorldCupId;
app.use(corse());

//app.use(bodyParser.json());


//Mysql

const config = {
    user: 'worldCupApp123',
    password: '123',
    server: 'DESKTOP-6NP2RQF',
    database: 'worldcup',
    //port: 56522,
    port: 1433,
    trustServerCertificate: true,
    multipleStatements: true
};

//Testing endpoints
app.get('/', (req, res) => {
    res.send('Welcome to our world Cup API!')
});


//Get Client
app.get('/teams', (req, res) => {
    // create Request object
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
            res.send(err);
        }
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from [worldcup].[dbo].[teams]', function (err, records) {

            if (err) console.log(err)
            // send records as a response
            //console.log(records.recordset)
            res.send(records.recordset);
        });
    });
});

//Get worldcups
app.get('/worldcups', (req, res) => {
    // create Request object
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
            res.send(err);
        }
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query('EXEC Get_WorldCups', function (err, records) {

            if (err) console.log(err)
            // send records as a response
            //console.log(records.recordset)
            res.send(records.recordset);
        });
    });
});

//Paises que participantes, recibe parametro ID de Mundial
app.get('/worldcups/countries', (req, res) => {
    // create Request object
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
            res.send(err);
        }
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        WorldCupId = req.query['countryCode'];
        request.query(`EXEC Get_Countries @WORLDCUPID = '${WorldCupId}'`, function (err, records) {

            if (err) console.log(err)
            // send records as a response
            //console.log(records.recordset)
            res.send(records.recordset);
        });
 
    });
});


app.post('/worldcups/countries', (req, res) => {
    // create Request object
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
            res.send(err);
        }
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        var text = req.query["countryCode"];
        console.log(text);
        request.query(`SELECT Distinct [team_name]
        FROM [worldcup].[dbo].[team_appearances]
        Inner join [worldcup].[dbo].[teams]
        on [worldcup].[dbo].[teams].team_id = [worldcup].[dbo].[team_appearances].team_id
        WHERE tournament_id = '${text}'`, function (err, records) {

            if (err) console.log(err)
            // send records as a response
            //console.log(records.recordset)
            res.send(records.recordset);
        });
 
    });
});

//Estadios
app.get('/worldcups/stadiums', (req, res) => {
    // create Request object
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
            res.send(err);
        }
        // create Request object
        var request = new sql.Request();
        WorldCupId = req.query["countryCode"];
        // query to the database and get the records
        request.query(`EXEC Get_Stadiums @WORLDCUPID = '${WorldCupId}'`, function (err, records) {

            if (err) console.log(err)
            // send records as a response
            //console.log(records.recordset)
            res.send(records.recordset);
        });
 
    });
});

//Ganadores de copas
app.get('/worldcups/worldcupwinners', (req, res) => {
    // create Request object
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
            res.send(err);
        }
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query(`EXEC Get_Winners`, function (err, records) {

            if (err) console.log(err)
            // send records as a response
            //console.log(records.recordset)
            res.send(records.recordset);
        });
 
    });
});


app.get('/worldcups/matchesresults', (req, res) => {
    // create Request object
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
            res.send(err);
        }
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        WorldCupId = req.query["countryCode"]
        request.query(`EXEC matchesWC @WC = '${WorldCupId}'`, function (err, records) {

            if (err) console.log(err)
            // send records as a response
            //console.log(records.recordset)
            res.send(records.recordset);
        });
 
    });
});

app.get('/worldcups/standings', (req, res) => {
    // create Request object
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
            res.send(err);
        }
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        WorldCupId = req.query["countryCode"]
        request.query(`EXEC Get_Standings @WORLDCUPID = '${WorldCupId}'`, function (err, records) {

            if (err) console.log(err)
            // send records as a response
            //console.log(records.recordset)
            res.send(records.recordset);
        });
 
    });
});

app.get('/worldcups/ranking', (req, res) => {
    // create Request object
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
            res.send(err);
        }
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query(`EXEC Get_Ranking;`, function (err, records) {

            if (err) console.log(err)
            // send records as a response
            //console.log(records.recordset)
            res.send(records.recordset);
        });

    });
});


app.get('/worldcups/matches2022', (req, res) => {
    // create Request object
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
            res.send(err);
        }
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query(`EXEC Get_QatarMatches;`, function (err, records) {

            if (err) console.log(err)
            // send records as a response
            //console.log(records.recordset)
            res.send(records.recordset);
        });

    });
});

app.get('/worldcups/matchesQatar', (req, res) => {
    // create Request object
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
            res.send(err);
        }
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        team = req.query["team"]
        request.query(`Get_QatarMatchesTeam @team = '${team}' `, function (err, records) {

            if (err) console.log(err)
            // send records as a response
            //console.log(records.recordset)
            res.send(records.recordset);
        });

    });
});
//Check connect

app.listen(PORT, () => console.log('Server running on port ' + PORT));