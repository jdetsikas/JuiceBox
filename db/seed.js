const { 
    chalk,
    client,
    getAllUsers,
    createUser
} = require('./index');

async function createInitialUsers() {
    try {
        console.log(chalk.grey("Starting to create users..."));

        const albert = await createUser({ username: 'albert', password: 'bertie99' });
        const sandra = await createUser({ username: 'sandra', password: '2sandy4me' });
        const glamgal = await createUser({ username: 'glamgal', password: 'soglam' });

        console.log(chalk.grey("Finished creating users!"));
    } catch (error) {
        console.error(chalk.red("Error creating users!"));
        throw error;
    };
};

async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
    } catch (error) {
        throw error;
    };
};

async function dropTables() {
    try {
        console.log(chalk.cyan("Starting to drop tables..."));

        await client.query(`
            DROP TABLE IF EXISTS users;
        `);

        console.log(chalk.cyan("Finished dropping tables!"));
    } catch (error) {
        console.error(chalk.red("Error dropping tables!"));
        throw error;
    };
};

async function createTables() {
    try {
        console.log(chalk.magenta("Starting to build tables..."))

        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username varchar(255) UNIQUE NOT NULL,
                password varchar(255) NOT NULL
            );
        `);

        console.log(chalk.magenta("Finished building tables!"));
    } catch (error) {
        console.error(chalk.red("Error building tables!"));
        throw error;
    };
};

async function testDB() {
    try {
      console.log(chalk.yellow("Starting to test database..."));
  
      const users = await getAllUsers();
      console.log("getAllUsers:", users);
  
      console.log(chalk.yellow("Finished database tests!"));
    } catch (error) {
      console.error(chalk.red("Error testing database!"));
      throw error;
    };
};

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally( () => client.end() );