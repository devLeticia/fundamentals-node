import http from 'node:http'
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform { 
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        console.log(transformed, encoding)
        callback(null, Buffer.from(String(transformed)))
    }
}

// req - readable strem
// res - writable stream
const server = http.createServer(async(req,res) => {
    const buffers = []

    for await (const chunk of req) { // aguarda cada pedaço da stream ser retornado  utilizanfdo o await, nada abaixo vai ser executado entquanto o await nao for copleto  
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)
    
    return res.end(fullStreamContent)
    //return req
    //.pipe(new InverseNumberStream())
    //.pipe(res)
})

server.listen(3334)