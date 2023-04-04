require('dotenv').config()

const {CONNECTION_URL} = process.env
Sequelize = require('sequelize')

sequelize = new Sequelize(CONNECTION_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })

  module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            DROP TABLE IF EXISTS teams;
            CREATE TABLE teams (
                team_id SERIAL PRIMARY KEY,
                team_name VARCHAR,
                Player_1 VARCHAR NOT NULL,
                Player_2 VARCHAR,
                Player_3 VARCHAR,
                Player_4 VARCHAR,
                Player_5 VARCHAR
            )
        `).then(() => {
            console.log('DB seeded')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB,', err))
    },
    saveTeam1: (req, res) => {
        const {teamName, player1, player2, player3, player4, player5} = req.body
        sequelize.query(`
            INSERT INTO teams (team_name, player_1, player_2, player_3, player_4, player_5)
            VALUES ('${teamName}', '${player1}', '${player2}', '${player3}', '${player4}', '${player5}');
        `).then((dbRes) => {
            res.status(200).send(dbRes[0])
        }).catch(err => console.log(err))
    },
    saveTeam2: (req, res) => {
        const {teamName, player1, player2, player3, player4, player5} = req.body
        sequelize.query(`
            INSERT INTO teams (team_name, player_1, player_2, player_3, player_4, player_5)
            VALUES ('${teamName}', '${player1}', '${player2}', '${player3}', '${player4}', '${player5}');
        `).then((dbRes) => {
            res.status(200).send(dbRes[0])
        }).catch(err => console.log(err))
    },
    useSaved1:(req, res) => {
        const {teamName} = req.params
        sequelize.query(`
            SELECT * FROM teams
            WHERE team_name = '${teamName}';
        `).then(dbres => {
            res.status(200).send(dbres[0])
        }).catch(err => console.log(err))
    },
    useSaved2: (req, res) => {
        const {teamName} = req.params
        sequelize.query(`
            SELECT * FROM teams
            WHERE team_name = '${teamName}';
        `).then(dbres => {
            res.status(200).send(dbres[0])
        }).catch(err => console.log(err))
    },
    getSaved: (req, res) => {
        sequelize.query(`
            SELECT * FROM teams
        `).then(dbres => {
            res.status(200).send(dbres[0])
        }).catch(err => console.log(err))
    },
    updateTeam: (req, res) => {
        const {teamName, name0, name1, name2, name3, name4} = req.body
        sequelize.query(`
            UPDATE teams
            SET player_1 = '${name0}',
            player_2 = '${name1}',
            player_3 = '${name2}',
            player_4 = '${name3}',
            player_5 = '${name4}'
            WHERE team_name = '${teamName}'
        `).then(dbres => {
            res.status(200).send(dbres[0])
        }).catch(err => console.log(err))
    },
    deleteTeam: (req, res) => {
        const {teamName} = req.params
        sequelize.query(`
            DELETE FROM teams
            WHERE team_name = '${teamName}';
        `)
    }
  }