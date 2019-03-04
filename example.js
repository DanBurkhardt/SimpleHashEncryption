// Destrcutured modules
const { encrypt, decrypt } = require('./index')

// Timer to keep track of execution times
var start = new Date()
var hrstart = process.hrtime()
function timer(){
    // execution time simulated with setTimeout function
    var end = new Date() - start,
    hrend = process.hrtime(hrstart)

    console.info('Execution time: %dms', end)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
}


// Go ahead and give it a test
let input = "This is a Test"
let resultHash
 encrypt(input).then(function(result){
    console.log(`\n\ninput string: "${input}"`)
    resultHash = result
    timer()
    console.log(`encrypted result: ${result}\n\n`)


    decrypt(resultHash).then(function(result){
        console.log(`decrypting string ${resultHash}`)
        timer()
        console.log(`decrypted result: "${result}"\n\n`)
        console.log(result)
    })
})