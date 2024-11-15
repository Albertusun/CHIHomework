console.log("Print numbers from 1 to 10 via 'for' loop:");
for (let i = 1; i < 11; i++) {
    console.log(i);
}

console.log("--------------------------------------------------");
console.log("Print numbers from 1 to 10 via 'while' loop:");

let index = 1;
while (index < 11) {
    console.log(index);
    index++;
}

console.log("--------------------------------------------------");
console.log("Print array with different types via 'foreach':");

let differentTypesArray = [1, 'one', 2.02, 'three', [1, 'one', 'two'], {
    'first': 1,
    'second': 2
}, false, true, 223, 'last'];

differentTypesArray.forEach((el) => {
    console.log(el);
});

console.log("--------------------------------------------------");
console.log("Print array with different types via 'for' loop:");

let length = differentTypesArray.length;

for (let i = 1; i < length; i++) {
    console.log(differentTypesArray[i]);
}

console.log("--------------------------------------------------");
console.log("Print array with different types via 'while' loop:");

let arrayIndex = 0;
while (arrayIndex < length) {
    console.log(differentTypesArray[arrayIndex]);
    arrayIndex++;
}

console.log("--------------------------------------------------");
console.log("Filter people over 20 years old");

const people = [
    {
        name: 'Max',
        age: 23,
        pets: ["cat", "dog"]
    },
    {
        name: 'John',
        age: 18,
        pets: ["dog"]
    },
    {
        name: 'Anton',
        age: 19,
        pets: ["cat", "parrot"]
    },
    {
        name: 'Alice',
        age: 25,
        pets: ["rabbit"]
    },
    {
        name: 'Bob',
        age: 30,
        pets: ["fish"]
    },
    {
        name: 'Eve',
        age: 22,
        pets: ["hamster", "cat"]
    },
    {
        name: 'Charlie',
        age: 17,
        pets: ["turtle"]
    },
    {
        name: 'Diana',
        age: 20,
        pets: ["dog", "parrot"]
    },
    {
        name: 'Leo',
        age: 24,
        pets: ["cat", "rabbit"]
    },
    {
        name: 'Sophia',
        age: 27,
        pets: ["fish", "bird"]
    },
    {
        name: 'Mike',
        age: 20,
        pets: ["lizard"]
    },
    {
        name: 'Olivia',
        age: 26,
        pets: ["dog", "hamster"]
    }
]

const filteredPeople = people.filter((person) => person.age > 20);

console.log("Over 20 years old:");
filteredPeople.forEach((person) => {
    console.log(person);
})

console.log("--------------------------------------------------");
console.log("Add a horse to each person:");

const peopleWithTestPet = people.map((person) => {
    person.pets.push('horse')
    return person;
});

console.log(peopleWithTestPet);

console.log("--------------------------------------------------");
console.log("Only 42:");

const filledArray = new Array(10).fill(42);
console.log(filledArray);

console.log("--------------------------------------------------");
console.log("With 'answer':");

filledArray.splice(4, 0, 'answer')
console.log(filledArray);

console.log("--------------------------------------------------");
console.log("Only 'answer':");
let foundAnswer = filledArray.find(element => element === "answer");
console.log(foundAnswer);

console.log("--------------------------------------------------");
console.log("keys, hasOwn, values commands with an object:");

const plane = {
    manufacturer: 'Lockheed Martin',
    model: 'F-22',
    year: 2011
};

const keys = Object.keys(plane);
console.log('Keys:', keys);

const hasModel = Object.hasOwn(plane, 'model');
console.log('Has model:', hasModel);

const values = Object.values(plane);
console.log('Values:', values);
