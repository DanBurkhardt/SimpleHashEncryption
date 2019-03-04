
const encrypt = require('./encrypt')
const decrypt = require('./decrypt')

// Enforce env vars for hashing functions
if(!process.env.privateEncryptionKey || !process.env.encryptMultiplier){
    console.log('\n\nERROR: invalid env vars for encryption algorithm!\nYou need to run\n"export privateEncryptionKey="KEYSTRING HERE"\nand\n"export encryptMultiplier={int}"\nto set your keys.\nyou may also use \nexport debugEncryption=true \nif you would like to see a stack trace of the process.\nto turn off debugging run: "unset debugEncryption" from the terminal\n\n')
    process.exit()
}

// Public accessors
module.exports = {encrypt, decrypt}