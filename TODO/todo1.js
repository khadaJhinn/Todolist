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
    console.log('3. Modifier le nom d\'une tâche');
    console.log('4. Supprimer une tâche');
    console.log('5. Passer une tâche en accomplie ');
    console.log('6. Quitter');
    rl.question('Choisissez une option : ', async (choice) => {
        switch (choice) {
            case '1':
                console.log(jsonData)
                displayMenu();
                break;
            case '2':
                rl.question('Entrez la tâche à ajouter : ', async (task) => {
                    const ids = jsonData.map(task => task.id)
                    const todo = {
                        "id": Math.max(0, ...ids)+1,
                        "task": task,
                        "isDone": false
                    }
                    jsonData.push(todo)
                    console.log(jsonData)
                    displayMenu();
                    fs.writeFileSync('./todo.json', JSON.stringify(jsonData))
                });
                break;
            case '3' : 
                rl.question('ID de la tâche à modifier : ', async (idt) => {
                    const taskToModify = jsonData.find(task => task.id == idt);
                    if (!taskToModify) {
                        console.log('Cette tâche n\'existe pas');
                        displayMenu();
                    } else {
                    rl.question('Entrez la nouvelle description de la tâche : ', async (newDescription) => {
                            taskToModify.task = newDescription;
                            fs.writeFileSync("todo.json", JSON.stringify(jsonData));
                            console.log('La tâche a été modifiée avec succès');
                            console.log(jsonData);
                            displayMenu();
                    });
                }
            });
            break;

                
            case '4':
            rl.question('ID de la tâche à supprimer : ', async (idt) => {
                const taskToDelete = jsonData.find(task => task.id == idt);
                if (!taskToDelete) {
                    console.log('Cette tâche n\'existe pas');
                    displayMenu();
                } else {
                    const indexToDelete = jsonData.indexOf(taskToDelete);
                    jsonData.splice(indexToDelete, 1);
                    fs.writeFileSync("todo.json", JSON.stringify(jsonData));
                    console.log(jsonData);
                    console.log('La tâche a été supprimée avec succès');
                    displayMenu();
               }
            });
            break;
            
            case '5': 
            rl.question('ID de la tâche accomplie : ', async (idt) => {
                const taskToacc = jsonData.findIndex(task => task.id == idt);
                if (taskToacc === -1) {
                    console.log('Cette tâche n\'existe pas');
                    displayMenu();
                } else {
                    jsonData[taskToacc].isDone = true ;
                    fs.writeFileSync("todo.json", JSON.stringify(jsonData));
                    console.log(jsonData);
                    console.log('La tâche a été accomplie avec succès');
                    displayMenu();
               }
            });
                break;



            case '6':
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