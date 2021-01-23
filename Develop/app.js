const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function getEmployeeType(){
inquirer.prompt([
    {
        type: "list",
        name: "employeeType",
        message: "Please select the type of employee you would like to add.",
        choices: ["Manager", "Engineer", "Intern"],
    }
]).then((data) => {
    switch (data.employeeType) {
       case "Manager":
           console.log( "ok...a manager.");
           const manager = createManager();
           return manager;
       case "Engineer":
           return createEngineer();
       case "Intern":
           return createIntern();
    }
})
}

async function requestName(){
    return await inquirer.prompt([ 
        {
            type: "input",
            name: "employeeName",
            message: "What is their name?", 
        }
    ]).then((data) =>  {
        return data.employeeName})
    .catch((err) => console.log(err));
}

async function requestId(){
    return await inquirer.prompt([ 
        {
            type: "input",
            name: "employeeId",
            message: "What is their id number?", 
        }
    ]).then((data) =>  {
        return data.employeeId})
    .catch((err) => console.log(err));
}

async function requestEmail(){
    return await inquirer.prompt([ 
        {
            type: "input",
            name: "employeeEmail",
            message: "What is their email address?", 
        }
    ]).then((data) =>  {
        return data.employeeEmail})
    .catch((err) => console.log(err));
}

async function requestOffice(){
    return await inquirer.prompt([ 
        {
            type: "input",
            name: "employeeOffice",
            message: "What is their office number?", 
        }
    ]).then((data) =>  {
        return data.employeeOffice})
    .catch((err) => console.log(err));
}

async function requestGitHub(){
    return await inquirer.prompt([ 
        {
            type: "input",
            name: "employeeGitHub",
            message: "What is their GitHub username?", 
        }
    ]).then((data) =>  {
        return data.employeeGitHub})
    .catch((err) => console.log(err));
}

async function createManager(){
    manager = new Manager();
    manager.name = await requestName();
    manager.id = await requestId();
    manager.email = await requestEmail();
    manager.officeNumber = await requestOffice();
    console.log(manager);
    return await manager;
};

async function createEngineer(){
    engineer = new Engineer();
    engineer.name = await requestName();
    engineer.id = await requestId();
    engineer.email = await requestEmail();
    engineer.github = await requestGitHub();
    console.log(engineer);
}

getEmployeeType()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
