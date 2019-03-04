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
- Two environment variables are required to run this module. 
- A third is optional, but if you enable it you can watch the encryption process print to the logs.

### Environment Variables
#### Your private encryption key
##### Any key that you own and provide will be used to encrypt your provided string 
`export privateEncryptionKey={KEY}`


#### Encryption algorithm multiplier
##### The number of times you want the hash to execute. 
`export encryptMultiplier={int}`


### Optional: Debugging env var
##### This enables the encryption process to print to the logs so you can watch it work
`export debugEncryption=true`

##### Disable debugging to prevent exposure to the logs
`unset debugEncryption`

### Usage Notes
- Your private key needs to be longer than the raw hashed value of any string you want to encrypt. This is due to the interpolation algorithm that combines the hased raw string with the private key.
- I reccomend choosing a string of your choice and running it through the algorithm with a `10` multiplier to generate your private key, which will ensure it is long enough for your needs.
- The hashing/dehashing algorithm must be run the same number of times in both encryption and decryption processes.
- Make sure you find a way to keep track of your multiplier env variable, you can't decrypt a string without knowing the number of passes it originally had through the encryption process.
- Don't commit or save your env vars to a file in your project dir or anything connected to cloud storage, just general advice
- This framework is experimental, it may meet your needs, or it may not. I would advise caution using this in production environments because I am not a security expert and I am not aware or any vulnerabilities.
- @me on Twitter if you want to discuss [@SwiftHacks](https://twitter.com/swifthacks_)


## Example

You can see an express server implementation example [here](https://github.com/DanBurkhardt/SimpleHashEncryptionTestServer)

Here is the main example code in `example.js`

````javascript
// Destructured modules
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

