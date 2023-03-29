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
    }
  }