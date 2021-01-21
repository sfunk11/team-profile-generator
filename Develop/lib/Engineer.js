
const Employee = require("./Employee.js");

class Engineer extends Employee {
    constructor (name, id, email, github){
        super(name,id, email);
        this.name = name;
        this.id = id;
        this.email = email;
        this.github = github;
    };
    getRole(){
        return "Engineer";
    };
    getGithub(){
        return this.github;
    }
}

module.exports = Engineer;