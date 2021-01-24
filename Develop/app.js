const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

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
                    type: "list",
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

