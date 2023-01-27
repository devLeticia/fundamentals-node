// o diferencial do node!! :D 
// stream - Netflix - Spotify etc.. 
// quando colocamos pra tocar, vemos desde o início mesmo que nao esteja carregado por completo - esse é o conceito do node
// ex: importar clientes via csv (excel)
// 1gb - 1.000.000 - no normal - usuario vai subir o CSV, eviado pro backend por rota post
// vai ler arquivo por completo, e depois que ler o arquivo, 
// vai percorrer o arquivo e fazendo a operação no banco de dados
// vai ter qeu esperar pra entao ler o arquivo e começar a fazer as inserções no banco 


// stream - ler os dados que vem da req aos poucos e processando enquanto o arquivo ainda é feito o upload
// ja consegue processar os dados 

// READABLE STREAM  - lendo os arquivos aos poucos (exemplo da leitura do csv e salvamento no banco)
// WRITEBLE STREAM - enviando ao poucos a info (netflix)

// TODA PORTA DE ENTRADA E SAIDA NO NODE É UMA STREAM - uma req e uma res sao streams 
//outro exemplo é o processo do node STDIn (lendo) e STDOut (escrevendo)
// comum no node conectar as streams --> 

// tudo que recebo como entrada, eu encaminho (pipe) para uma saída

//process.stdin
//    .pipe(process.stdout)



import {Readable, Writable, Transform} from 'node:stream'

class OneToHundreadStrem extends Readable {
    index = 1 
    _read() {
        //retorna quais sao os dados da stream
        //enviar dados, fornecer informações
        const i = this.index++
        if (i > 100) {
            this.push(null) // o push aqui serve pra enviar notificação pra quem ta consumindo essa stram readable
        } else {
            const buf = Buffer.from(String(i)) // tem que converter pra buffer - modelo pra transixionar infos entre streams, pra nao precisar enviar strings inteiras
            this.push(buf)
        }
    }
}
class InverseNumberStream extends Transform { // le dados de algum lugar e escreve dados para outro lugar, sempre usada no intermeio de duas streams
    _transform(chunck, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))// pode enviar um erro quando nao recebe um numero, por exemplo
    }
}

new OneToHundreadStrem()
    .pipe(process.stdout)

    // stream de escrita ->  vai receber dado da stream de leitura e vai fdazer alguma coisa com esses dados 

class MultiplyByTenStream extends Writable {
    // chuck - o pedaço que leu da stream de leitura- o que enviamos pelo push de leitura  
    // enconding - como a info ta codificada
    // callback - a função que a stram chama quando terminar de fazer o que precisava 
    // a stream nao retorna nada, apenas processa o dado, nunca vai transformar o dado em algo, apenas processar
   _write(chunck, encoding, callback) {
    console.log(Number(chunck.toString()) * 10)
    callback()
   }
}

new OneToHundreadStrem()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream())