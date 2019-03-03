// Enforce env vars for hashing functions
if(!process.env.privateEncryptionKey || !process.env.encryptMultiplier){
    //onsole.log('invalid env vars for encryption algorithm')
    return new Promise(function(resolve,reject){
        reject('invalid env vars for encryption algorithm\nUse export privateEncryptionKey={KEY} and export encryptMultiplier={int} to set your vars.')
    })
}

function debug(message){
    if (process.env.debugEncryption){
        console.log(message)
    }
}

// Assign variable values from env vars
const privateKey = Buffer.from(process.env.privateKey).toString('base64')
const multiplier = process.env.multiplier

// Generalized hashing function used throughout the class
async function deHash(inputHash){
    return new Promise(function(resolve,reject){
        let hash = Buffer.from(inputHash, 'base64').toString('ascii')
        debug(`new hash: ${hash}`)
        resolve(hash)
    })
}

// Interpolates one string inside of another
// More secure would be to choose to skip a preset # of chars instead of every other, whatever you want
async function charDist(inputHash){
    var newCharDist = ""
    return new Promise(function(resolve,reject){
        for(var i=0; i < inputHash.length-1; i++){
            // in reverse, only working with it on evenly divisible indicies or 0
            if (i%2 == 0 || i == 0){
                newCharDist += inputHash[i]
                let leftover = inputHash.substring(i,inputHash.length-1)
                if (privateKey.includes(leftover)){
                    resolve(newCharDist)
                }
            }
        }
    })
}

// Iterates as per multiplier, re-hashing the hashed data to further encrypt
async function iterateHash(inputHash){
    debug(`input hash ${inputHash}`)
    var newHash = inputHash

    return new Promise(async function(resolve,reject){
        for (var i=0; i < multiplier; i++){
            await deHash(newHash).then(function(result){
                //debug(`dehash attempt ${result}`)
                newHash = result
            })
    
            if(i == multiplier-1){
                //debug("returning")
                resolve(newHash)
            }
        }
    })
}

// Main function for encryption
async function decrypt(inputHash){
    // Verify input is of type string
    if(typeof inputHash != "string"){
        return new Promise(function(resolve,reject){
            reject(`invalid input type`)
        })
    }

    // The input string must be smaller than the private key
    if(inputHash.length > privateKey.length){
        
        return new Promise(async function(resolve,reject){
            
            let resultingHash
            await iterateHash(inputHash).then(function(result){
                resultingHash = result
                debug(`iterateHash done ${resultingHash}`)
            })
    
            let charDistVar
            await charDist(resultingHash).then(function(result){
                charDistVar = result
                debug(`charDistVar done ${charDistVar}`)
            })

            let outputString
            await deHash(charDistVar).then(function(result){
                outputString = result
                debug(`dehashing done ${outputString}`)
                resolve(outputString)
            })
        })
    }else{
        return new Promise(function(resolve,reject){
            reject(`invalid length, string must be more than ${privateKey.length} characters`)
        })
    }

}

module.exports = decrypt