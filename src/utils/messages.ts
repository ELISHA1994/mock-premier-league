interface Messages {
    welcome: string,
    notFound: string,
    serverError: string,
    listenToServer: string
}

const messages: Messages = {
    welcome: "Welcome to Mock Premier League",
    notFound: "Wrong request. Route does not exist",
    serverError: "Internal server error",
    listenToServer: "listening to server on 127.0.0.1",
}

export default messages
