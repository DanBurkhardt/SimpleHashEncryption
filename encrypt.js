// Enforce env vars for hashing functions
if(!process.env.privateEncryptionKey || !process.env.encryptMultiplier){
    //onsole.log('invalid env vars for encryption algorithm')
    return new Promise(function(resolve,reject){
        reject('invalid env vars for encryption algorithm\nUse export privateEncryptionKey={KEY} and export encryptMultiplier={int} to set your keys.')
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
async function hash(inputString){
    return new Promise(function(resolve,reject){
        let hash = Buffer.from(inputString).toString('base64')
        debug(`new hash: ${hash}`)
        resolve(hash)
    })
}

// Interpolates one string inside of another
// More secure would be to choose to skip a preset # of chars instead of every other, whatever you want
async function charDist(inputHash){
    var newCharDist = ""
    return new Promise(function(resolve,reject){
        for(var i=0; i < inputHash.length; i++){
            //debug(newCharDist)
            if(i < inputHash.length - 1){
                newCharDist += inputHash[i]
                newCharDist += privateKey[i]
            }else{
                debug(`leftover: ${privateKey.substring(i,privateKey.length-1)}`)
                newCharDist += privateKey.substring(i,privateKey.length-1)
                resolve(newCharDist)
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
            await hash(newHash).then(function(result){
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
async function encrypt(inputString){
    // Verify input is of type string
    if(typeof inputString != "string"){
        return new Promise(function(resolve,reject){
            reject(`invalid input type`)
        })
    }

    // The input string must be smaller than the private key
    if(inputString.length < privateKey.length){
        let inputHash
        return new Promise(async function(resolve,reject){
            await hash(inputString).then(function(result){
                inputHash = result
                debug(`hash done ${inputHash}`)
            })
    
            let charDistVar
            await charDist(inputHash).then(function(result){
                charDistVar = result
                debug(`charDistVar done ${charDistVar}`)
            })
    
            let resultingHash
            await iterateHash(charDistVar).then(function(result){
                resultingHash = result
                debug(`iterateHash done ${resultingHash}`)
                resolve(resultingHash)
            })
        })

    }else{
        return new Promise(function(resolve,reject){
            reject(`invalid length, string must be less than ${privateKey.length} characters`)
        })
    }

}

module.exports = encrypt