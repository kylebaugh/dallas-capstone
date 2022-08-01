require('dotenv').config()
const Sequelize = require('sequelize')

const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
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
        drop table if exists characters;
        drop table if exists classes;
        drop table if exists races;
        drop table if exists names;

        create table classes(
            class_id serial primary key,
            class_name varchar
        );
        create table races(
            race_id serial primary key,
            race_name varchar
        );
        create table names(
            names_id serial primary key,
            char_names varchar
        );

        create table characters(
            char_id serial primary key,
            classes varchar,
            races varchar,
            name varchar 
        );

        insert into classes(class_name)
        values ('Barbarian'),
        ('Bard'),
        ('Cleric'),
        ('Druid'),
        ('Fighter'),
        ('Monk'),
        ('Paladin'),
        ('Ranger'),
        ('Rogue'),
        ('Sorcerer'),
        ('Warlock'),
        ('Wizard');
        
        insert into races(race_name)
        values ('Dragonborn'),
        ('Dwarf'),
        ('Elf'),
        ('Gnome'),
        ('Half-Elf'),
        ('Halfling'),
        ('Half-Orc'),
        ('Human'),
        ('Teifling');
        
        insert into names(char_names)
        values ('Eduna Yeoman'),
        ('Ulfric Thimblelock'),
        ('Rose Flynn'),
        ('Lewis Tumble'),
        ('Helle Grancourt'),
        ('Dodie Rygax'),
        ('Salmon Rosewood'),
        ('ZyraDumble'),
        ('Alisander Bordeaux'),
        ('Trix Topple'),
        ('Nance Ashmere'),
        ('Sigar Stow'),
        ('Everill Goddard'),
        ('Imarus Bimble'),
        ('Venessa Bythemont'),
        ('Melodia Mercer'),
        ('Reinald Bluestone'),
        ('Kestera Silvermane'),
        ('Theobald Gelder'),
        ('Cassandre Stormbrand');
        `).then(() => {
            console.log('DB Seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('Error seeding DB', err))
    },

    getCharacters: (req, res) => {
        sequelize.query(`
        SELECT * FROM characters;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    createCharacter: async (req, res) => {
        let charObj = {name: undefined, race: undefined, class: undefined}
        let randomName = Math.floor(1 + Math.random() * (20));
        let randomRace = Math.floor(1 + Math.random() * 9);
        let randomClass = Math.floor(1 + Math.random() * 12);

        await sequelize.query(`
            SELECT * FROM names
            WHERE names_id = ${randomName}
        `).then(dbRes => {
            charObj.name = dbRes[0][0].char_names
            // console.log(dbRes[0][0].char_names)
            res.status(200)}).catch(err => console.log(err))

            console.log(charObj)

        await sequelize.query(`
            SELECT * FROM races
            WHERE race_id = ${randomRace}
        `).then(dbRes => {
            charObj.race = dbRes[0][0].race_name
            res.status(200)}).catch(err => console.log(err))
            console.log(charObj)

        await sequelize.query(`
            SELECT * FROM classes
            WHERE class_id = ${randomClass}
        `).then(dbRes => {
            charObj.class = dbRes[0][0].class_name
            res.status(200)}).catch(err => console.log(err))
            console.log(charObj)

        await sequelize.query(`
        insert into characters(classes, races, name)
        values ('${charObj.class}', '${charObj.race}', '${charObj.name}')
        returning *
        `)
        .then(dbRes => {
            console.log(dbRes)
            res.status(200).send(dbRes[0][0])})
        .catch(err => console.log(err))
    }
}