const fs = require('fs');

function userData() {
    try {
        const userJSON = fs.readFileSync('user.json', 'utf-8');
        return JSON.parse(userJSON);
    } catch (err) {
        return { users: [] };
    }
}

function add(userId, language) {
    const user = userData();

    // Find the user by userId
    const userIndex = user.users.findIndex(u => u.userId === userId);
    if (userIndex === -1) {
        console.error(`Error: User with id ${userId} not found.`);
        return;
    }

    // Add the language to the user's languages array
    user.users[userIndex].languages.push(language);

    fs.writeFileSync('user.json', JSON.stringify(user));
    console.log(`Added new language ${language.title} to user ${userId}`);
}

function list() {
    const user = userData();

    console.log("User programming languages list:");
    console.log(user.languages);
}

function read(searchedLanguage) {
    const user = userData();

    const languageObj = user.languages.find(lang => lang.title === searchedLanguage);

    if (!languageObj) {
        console.error(`Error: Language ${searchedLanguage.title} not found in languages list.`);
        return;
    }

    console.log(`Searched language: ${languageObj.title} | Level: ${languageObj.level}`);
}

function addUser(firstName, lastName) {
    const user = userData();

    const newUser = {
        userId: `${Date.now()}`, // Generate a unique userId based on the current timestamp
        firstName,
        lastName,
        languages: [],
    };

    user.users = user.users || [];
    user.users.push(newUser);

    fs.writeFileSync('user.json', JSON.stringify(user));
    console.log(`Added new user: ${firstName} ${lastName} with userId ${newUser.userId}`);
}

function remove(searchedLanguage) {
    const user = userData();

    const languageObj = user.languages.find(lang => lang.title === searchedLanguage);
    const indexToRemove = user.languages.indexOf(languageObj);

    if (indexToRemove > -1) {
        user.languages.splice(indexToRemove, 1);
        fs.writeFileSync("user.json", JSON.stringify(user));
        console.log(`Removed ${searchedLanguage} from languages list.`);
    } else {
        console.error(`Error: Language ${searchedLanguage} not found in languages list.`);
    }
}

function listUsers() {
    const user = userData();

    if (user.users.length === 0) {
        console.log('No users found.');
        return;
    }

    console.log('Users and their languages:');

    user.users.forEach((u, index) => {
        console.log(`\n${index + 1}. ${u.firstName} ${u.lastName} (userId: ${u.userId})`);

        if (u.languages.length === 0) {
            console.log('   No languages added yet.');
        } else {
            console.log('   Languages:');
            u.languages.forEach(lang => {
                console.log(`     - ${lang.title} (Level: ${lang.level})`);
            });
        }
    });
}

module.exports = { add, remove, list, read, addUser, listUsers };