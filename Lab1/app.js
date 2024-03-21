const user = require("./user")
const yargs = require('yargs/yargs');


yargs(process.argv.slice(2))
    .command({
        command: 'list',
        desc: 'Get the list of languages',
        handler: () => {
            user.list();
        }
    })
    .command({
        command: "read",
        describe: "View the details of a particular language",
        builder: {
            title: {
                describe: "Language title",
                demandOption: true,
                type: "string",
            },
        },
        handler: (argv) => {
            user.read(argv.title)
        }
    })
    .command({
        command: "remove",
        describe: "remove new language",
        builder: {
            title: {
                describe: "Language title",
                demandOption: true,
                type: "string",
            },
        },
        handler: (argv) => {
            user.remove(argv.title)
        }
    })
    .command({
        command: 'addUser',
        describe: 'Add a new user',
        builder: {
            firstName: {
                describe: 'User first name',
                demandOption: true,
                type: 'string',
            },
            lastName: {
                describe: 'User last name',
                demandOption: true,
                type: 'string',
            },
        },
        handler: (argv) => {
            user.addUser(argv.firstName, argv.lastName);
        },
    })
    .command({
        command: 'addLanguage',
        describe: 'Add a new language to a user',
        builder: {
            userId: {
                describe: 'User ID',
                demandOption: true,
                type: 'string',
            },
            title: {
                describe: 'Language title',
                demandOption: true,
                type: 'string',
            },
            level: {
                describe: 'Level of knowledge',
                demandOption: true,
                type: 'string',
            },
        },
        handler: (argv) => {
            user.add(argv.userId, { title: argv.title, level: argv.level });
        },
    })
    .command({
        command: 'listUsers',
        describe: 'List all users and their languages',
        handler: () => {
            user.listUsers();
        },
    })
    .parse();
