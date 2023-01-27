import { Readable } from 'node:stream';

class OneToHundreadStrem extends Readable {
    index = 1 

    _read() {
        const i = this.index++

        if (i > 100) {
            this.push(null)
        } else {
            const buf = Buffer.from(String(i))
            this.push(buf)
        }
    }
}

//fetch api - api completa pra fazer as requisições de uma aplicação pra outra seja do front pro back, ou de back pra back, no broswer e no node

fetch('http://localhost:3334', { // simular que estou enviando informações aos poucos para outro back
    method: 'POST',
    body: new OneToHundreadStrem()
}).then(response => {
    return response.text()
}).then(data => {
    console.log(data)
})