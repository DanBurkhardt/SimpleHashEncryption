# SimpleHashEncryption
SimpleHashEncryption provides a customizable and easy way to do encryption and decryption of strings in native node.js.

## Install
`npm install simplehashencryption`

## Features
- Customizable number of times the hashing function will run
- Customizable private key that will be used to in combination with the string you are encrypting
- Ability to turn on/off encryption process debugging
- Fully promisifyed and written Javascript ES6

## Usage
Two environment variables are required to run this module. A third is optional, but if you enable it you can watch the encryption process print to the logs.

### Your private encryption key
The key that you own that will be used to encrypt your provided string

`export privateEncryptionKey={KEY}`

Your private encryption key, 

### Encryption algorithm multiplier
The number of times you want the hash to execute. 

`export encryptMultiplier={int}`

### Optional: Debugging env var
This enables the encryption process to print to the logs so you can watch it work
`export debugEncryption=true`

### Usage Notes
- Your private key needs to be longer than the raw hashed value of any string you want to encode due to the interpolation of the hashed strings.
- I reccomend choosing a string of your choice and running it through the algorithm with a 10-20 multiplier if you are going to 
- You're going to want to find a way to keep track of how many times you run the hashing function in the event you want to modify it in the future. The hashing/dehashing algorithm must be the same when run through both encryption and decryption.
- Don't commit or save your env vars to a file in your project dir or anything connected to cloud storage.

## Example
Here is the main example code in `example.js`

````javascript
// Destrcutured modules
const { encrypt, decrypt } = require('simplehashencryption')

// Go ahead and give it a test
let input = "This is a Test"
let resultHash
encrypt(input).then(function(result){
    console.log(`\n\ninput string: ${input}`)
    resultHash = result
    timer()
    console.log(`encrypted result: ${result}\n\n`)

    // Immediately decrypt
    decrypt(resultHash).then(function(result){
        console.log(`decrypting string ${resultHash}`)
        timer()
        console.log(`decrypted result: ${result}\n\n`)
    })
})
````

