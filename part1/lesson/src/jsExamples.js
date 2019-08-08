// VARIABLES

const x = 1
let y = 5

console.log(x, y)   // 1, 5 are printed
y += 10
console.log(x, y)   // 1, 15 are printed
y = 'sometext'
console.log(x, y)   // 1, sometext are printed
x = 4               // causes an error

// ARRAYS

const t = [1, -1, 3]
// instead of adding to the existing list, concat returns a new array
// which contains both the items from the old array but also the new one
const t2 = t.concat(5)

t.push(5)

console.log(t.length)   // 4 is printed
console.log(t[1])       // -1 is printed

console.log(t)          // [1, -1, 3, 5] is printed
console.log(t2)         // [1, -1, 3, 5] is printed

t.forEach(value => {
  console.log(value)    // numbers 1, -1, 3, 5 are printed, each to own line
})

// Map method
const t = [1, 2, 3]

// map creates a new array, for which the function given as parameter is
// used to create the items.
const m1 = t.map(value => value * 2)
console.log(m1)   // [2, 4, 6] is printed

// map can also transform the array into something completely different
const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)   // prints [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed

// Individual items of an array are easy to assign to variables with
// the help of "destructuring assignment".
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)    // 1, 2 is printed
console.log(rest)             // [3, 4, 5] is printed


// OBJECTS

// Defining objects using object literals
// The values of properties can be of any type
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD'
}

const objects2 = {
  name: 'Full Stack web application development',
  level: 'intermediate studies',
  size: 5
}

const object3 = {
  name: {
    first: 'Dan',
    last: 'Abramov'
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University'
}

// Properties of an object are referenced by using the "dot" notation,
// or by using brackets
console.log(object1.name)   // Arto Hellas is printed
const fieldName = 'age'
console.log(object1[fieldName])   // 35 is printed

// It's possible to add properties to objects on the fly by either using
// dot notation or brackets
object1.address = 'Helsinki'
object1['secret number'] = 12341


// FUNCTIONS

// Defining an arrow function
const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}

// Calling a function
const result = sum(1, 5)
console.log(result)

// With only a single parameter, parentheses can be excluded
const square = p => {
  console.log(p)
  return p * p
}

// If a function only contains a single expression then the braces are
// not needed.
const square = p => p * p

const t = [1, 2, 3]
const tSquared = t.map(p => p * p)    // tSquared is now [1, 4, 9]

// Giving a name in a function declaration
function product(a, b) {
  return a * b
}

const result = product(2, 6)    // result is now 12

// Defining the function using a function expression.
const average = function(a, b) {
  return (a + b) / 2
}

const result = average(2, 5)    // result is now 3.5