// /users/:id

// regex expressao regular - forma de encontrar texto qeu segue um formato de texto específico dentro de um texto mairo
export function buildRoutePath(path) {
    //encontrar no path tudo que começa com dois pontos, e tem pelo menos uma ou mais letras que pode ser de a a z maiocuslo ou minu 
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex
}