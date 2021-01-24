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

const teamProfile = [];

function createEmployee() {
    inquirer.prompt([{
            type: "list",
            name: "employeeType",
            message: "Please select the type of employee you would like to add.",
            choices: ["Manager", "Engineer", "Intern"],
        },
        {
            type: "input",
            name: "employeeName",
            message: "What is their name?",
        },
        {
            type: "input",
            name: "employeeId",
            message: "What is their id number?",
        },
        {
            type: "input",
            name: "employeeEmail",
            message: "What is their email address?",
        }
    ]).then(({employeeType, employeeName, employeeId, employeeEmail}) => {
            let special = "";
            if (employeeType === "Manager") {
                special = "office number";
            } else if (employeeType === "Engineer") {
                special = "gitHub username";
            } else {
                special = "school name";
            };
            return inquirer.prompt([{
                    type: "input",
                    name: "roleSpecific",
                    message: `What is their ${special}?`,
                },
                {
                    type: "List",
                    name: "anotherEmployee",
                    message: "Do you want to add another team member?",
                    choices: ["Yes", "No"]
                }
            ]).then(({
                roleSpecific,
                anotherEmployee
            }) => {
                if (employeeType === "Engineer") {
                    let employee = new Engineer(employeeName, employeeId, employeeEmail, roleSpecific);
                    teamProfile.push(employee);
                    console.table(teamProfile);
                } else if (employeeType === "Intern") {
                    let employee = new Intern(employeeName, employeeId, employeeEmail, roleSpecific);
                    teamProfile.push(employee);
                    console.table(teamProfile);
                } else {
                    let employee = new Manager(employeeName, employeeId, employeeEmail, roleSpecific)
                    teamProfile.push(employee);
                    console.table(teamProfile);
                }
                if (anotherEmployee === "Yes") {
                    createEmployee();
                } else {
                    htmlFile = render(teamProfile);
                    fs.writeFile(outputPath, htmlFile, function (err) {
                        if (err) return console.log(err);
                        console.log('Profile page has been generated.');
                    })
                }
            })
        }
    )};

createEmployee()

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