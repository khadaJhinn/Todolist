const fs = require('fs');
const readline = require('readline');

// Interface utilisateur en ligne de commande
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const jsonData = require('./todo.json');

// Menu d'options
function displayMenu() {
    console.log('1. Afficher la liste de tâches');
    console.log('2. Ajouter une tâche');
    console.log('3. Quitter');
    rl.question('Choisissez une option : ', async (choice) => {
        switch (choice) {
            case '1':
                console.log(jsonData)
                displayMenu();
                break;
            case '2':
                rl.question('Entrez la tâche à ajouter : ', async (task) => {
                    const todo = {
                        "id": jsonData.length+1,
                        "task": task,
                        "isDone": false
                    }
                    jsonData.push(todo)
                    console.log(jsonData)
                    displayMenu();
                    fs.writeFileSync('./todo.json', JSON.stringify(jsonData))
                });
                break;
            case '3':
                rl.close();
                break;
            default:
                console.log('Option invalide.');
                displayMenu();
                break;
        }
    });
}

// Démarrer le programme
console.log('Bienvenue dans votre Todo List !');
displayMenu();