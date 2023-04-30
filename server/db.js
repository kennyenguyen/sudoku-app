const path = require('path');
const dbPath = path.resolve(__dirname, 'db/database.sqlite');
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true,
});

knex.schema
    .hasTable('scores')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('scores', (table) => {
                table.increments('score_id').primary();
                table.string('username');
                table.integer('time');
                table.string('difficulty');
            })
                .then(() => {
                    console.log("Table 'Scores' created");
                })
                .catch((error) => {
                    console.error(`There was an error creating table: ${error}`);
                });
        }
    })
    .then(() => {
        console.log('Database setup successful.');
    })
    .catch((error) => {
        console.error(`There was an error setting up the database: ${error}`);
    });

knex.select('*').from('scores')
    .then(data => console.log('data: ', data))
    .catch(err => console.log(err));

module.exports = knex;
