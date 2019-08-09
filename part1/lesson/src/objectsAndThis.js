// Assign methods to an object by defining properties that are functions
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is', this.name)
  },
  doAddition: function(a, b) {
    console.log(a + b)
  }
}

// preserving "this" by using the bind method
setTimeout(arto.greet.bind(arto), 1000)

arto.greet()    // hello, my name is Arto Hellas gets printed

const referenceToGreet = arto.greet
referenceToGreet()    // error message is printed to console
// it doesn't work because the method has lost knowledge of what was the original "this".

// Assigning a method to an object after object creation
arto.growOlder = function() {
  this.age += 1
}

console.log(arto.age)   // 35 is printed
arto.growOlder()
console.log(arto.age)   // 36 is printed

arto.doAddition(1, 4)   // 5 is printed

const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)   // 25 is printed