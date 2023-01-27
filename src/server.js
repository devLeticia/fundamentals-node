import http from 'node:http' 

import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

// 3 formas de enviar infos do front pro back
// 1. Query parameters: parametros nomeados enviados no proprio endereço da requisição -- https://localhost:3333/users?userdId=1  cada parametro com chave e parametros, concatenados como & 
    // usado para URL stateful - evniar infos que nao sao sensiveis, pra modificar a resposta que o backend vai dar (filtros, paginação, nao sao obrigatorios) 
// 2. Route parameters: https://localhost:3333/users/1 - usado para identificação de recurso - o metodo ja diz o que o 1 significa
// 3. Request body: envio de informaçõe de formularios - quantas infos quiser

// posso ter duas rotas com a mesma URL porem com metodos diferentes

// http - get, post, put, patch, delete -> mas tem varios outros 
// get - sempre que for buscar recurso do backend 
// post - criar alguma coisa 
// put - sempre pra editar ou atualizar um recursos no backend (varios campos ao mesmo tempo)
// patch - atualizar uma informação única ou específica de um recursos no backend

// stateful - alguem tipo de info sempre guardando memória - armazenar os dados da aplicação localmente em memoria
// stateless - nao salva nada em memória - pega do bd 

// para devolver, pode ser string (JSON), buffer, ou uint8array


// cabeçalhos da requisição e da resposta sao metadados - infos para front e back saberem lidar com as respostas
// como o dado pode ser interpretado pelo frontend 
// vc pode dar o nome que quiser aos cabeçalhos (headers) mas alguns sao padroes as APIs https://flaviocopes.com/http-request-headers/
// tanto do front pro back - req.headers
// quanto do back pro front - res.setHeader


// HTTP Status Code - enviar pro front pra dizer nao so pelo texto, se a requisi~]ao deu certo ou erro, qual tipo de erro etc.
// 100 - informacoes - pra retornar alguam informação, nao dizem muito
// 200 - sucesso
// 300 - redirect - quando o front faz requisição pro back pra uma rota que nao existe mais e foi redicionado pra outra
// 400 - client error - erros por causa da requisição feita - passou info de forma errada
// 500 - server error - erro no backend - algo ta cagado no back

//streams
//buffers 


const users = []  
const server =  http.createServer( async (request, response) => {
    const {method, url} = request

    await json(request, response)

    const route = routes.find( route => {
        return route.method === method  && route.path.test(url)
    })

    if (route) {
        const routeParams = request.url.match(route.path)

        const {query, ...params} = routeParams.groups

        request.params = params
        request.query = query ? extractQueryParams(routeParams.groups.query) : {}

        return route.handler(request, response)
    }

    console.log(route)
    return response.writeHead(404).end('Not Found')
})

server.listen(3333)