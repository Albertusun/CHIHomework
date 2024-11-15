console.log("1. Higher-order functions and closures:");

function addParamsToRequest(params) {
    let count = 0;

    return function (data) {

        count++;

        return {
            'access-token': params['access-token'],
            data: data,
            count: count,
        };
    };
}

const sendData = addParamsToRequest({'access-token': 'qwerty'});

console.log(sendData({name: 'John'}));
console.log(sendData({name: 'Doe'}));

console.log("--------------------------------------------------");
console.log("2. Contexts and this:");

const obj = {
    getData: function () {
        console.log(`Person name is: ${this.name} and age ${this.age}`);
    }
};

const person = {
    name: 'Alice',
    age: 30
};

obj.getData.call(person);

const getDataForPerson = obj.getData.bind(person);

getDataForPerson();
getDataForPerson();

console.log("--------------------------------------------------");
console.log("3. Recursion:");

const root = {
    name: 'name',
    type: 'folder',
    children: [
        {
            name: 'folder 1',
            type: 'folder',
            children: [
                {
                    name: 'folder 2',
                    type: 'folder',
                    children: [
                        {
                            name: 'file 3',
                            type: 'file',
                            size: 30
                        }
                    ]
                }
            ]
        },
        {
            name: 'file 1',
            type: 'file',
            size: 10
        },
        {
            name: 'file 2',
            type: 'file',
            size: 20
        }
    ]
};

function getFileNames(obj) {

    let fileNames = [];

    if (obj.type === 'file') {

        fileNames.push(obj.name);

    } else if (obj.children) {

        obj.children.forEach(child => {

            fileNames = fileNames.concat(getFileNames(child));
        });
    }

    return fileNames;
}

console.log(getFileNames(root));

console.log("--------------------------------------------------");
console.log("4. Classes (Inheritance in ES5 and ES6):");
console.log("ES6 Style:");

class Person {

    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }

    introduce() {
        console.log(`Hi, my name is ${this.name}, my phone number is ${this.phone}.`);
    }
}

class Student extends Person {

    constructor(name, phone, course) {
        super(name, phone);
        this.course = course;
    }

    study() {
        console.log(`I study on the ${this.course} course.`);
    }
}

class Teacher extends Person {

    constructor(name, phone, subject) {
        super(name, phone);
        this.subject = subject;
    }

    teach() {
        console.log(`I teach ${this.subject}.`);
    }
}

const student = new Student('John', '+380730000001', 3);
const teacher = new Teacher('Jane', '+380730000002', 'Math');

student.introduce();
student.study();

teacher.introduce();
teacher.teach();

console.log("ES5 Style:");

function PersonES5(name, phone) {
    this.name = name;
    this.phone = phone;
}

PersonES5.prototype.introduce = function () {
    console.log(`Hi, my name is ${this.name}, my phone number is ${this.phone}.`);
};

function StudentES5(name, phone, course) {
    PersonES5.call(this, name, phone);
    this.course = course;
}

StudentES5.prototype = Object.create(PersonES5.prototype);
StudentES5.prototype.study = function () {
    console.log(`I study on the ${this.course} course.`);
};

function TeacherES5(name, phone, subject) {
    PersonES5.call(this, name, phone);
    this.subject = subject;
}

TeacherES5.prototype = Object.create(PersonES5.prototype);
TeacherES5.prototype.teach = function () {
    console.log(`I teach ${this.subject}.`);
};

const studentES5 = new StudentES5('John', '+380730000001', 3);
const teacherES5 = new TeacherES5('Jane', '+380730000002', 'Math');

studentES5.introduce();
studentES5.study();

teacherES5.introduce();
teacherES5.teach();
