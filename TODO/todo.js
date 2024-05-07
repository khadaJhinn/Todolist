const fs = require('fs');
const readline = require('readline');

const todoFile = 'afaire.txt';

// Fonction pour lire la liste de tâches depuis le fichier
function readTodoList() {
    return new Promise((resolve, reject) => {
        fs.readFile(todoFile, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // Si le fichier n'existe pas encore ou est vide, retourne une liste vide
                    resolve([]);
                } else {
                    reject(err);
                }
            } else {
                // Parse le contenu du fichier en tant que lignes de tâches
                const tasks = data.trim().split('\n');
                resolve(tasks);
            }
        });
    });
}

// Fonction pour écrire la liste de tâches dans le fichier
function writeTodoList(todoList) {
    return new Promise((resolve, reject) => {
        const tasksText = todoList.join('\n');
        fs.writeFile(todoFile, tasksText, 'utf8', err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Fonction pour afficher la liste de tâches
async function displayTodoList() {
    try {
        const todoList = await readTodoList();
        console.log('--- Todo List ---');
        todoList.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });
        console.log('-----------------');
    } catch (err) {
        console.error('Erreur lors de la lecture de la liste de tâches :', err);
    }
}

// Fonction pour ajouter une tâche à la liste
async function addTask(task) {
    try {
        const todoList = await readTodoList();
        todoList.push(task);
        await writeTodoList(todoList);
        console.log(`La tâche "${task}" a été ajoutée à la liste.`);
    } catch (err) {
        console.error('Erreur lors de l\'ajout de la tâche :', err);
    }
}

// Interface utilisateur en ligne de commande
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Menu d'options
function displayMenu() {
    console.log('1. Afficher la liste de tâches');
    console.log('2. Ajouter une tâche');
    console.log('3. Quitter');
    rl.question('Choisissez une option : ', async (choice) => {
        switch (choice) {
            case '1':
                await displayTodoList();
                displayMenu();
                break;
            case '2':
                rl.question('Entrez la tâche à ajouter : ', async (task) => {
                    await addTask(task);
                    displayMenu();
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
