interface Messages {
    welcome: string,
    notFound: string,
    serverError: string,
    listenToServer: string,
    failedToConnect: string,
    connectedToDatabase: string,
    duplicate: string,
    error: string,
    tokenExpired: string,
    unAuthorized: string,
    tokenError: string
}

const messages: Messages = {
    welcome: "Welcome to Mock Premier League",
    notFound: "Wrong request. Route does not exist",
    serverError: "Internal server error",
    listenToServer: "listening to server on 127.0.0.1",
    failedToConnect: 'failed to connect to database',
    connectedToDatabase: 'Database Connected',
    duplicate: 'User already exist',
    error: 'An error occur',
    unAuthorized: 'You have to login',
    tokenError: 'Invalid token provided',
    tokenExpired: 'Expired token',
}

export default messages
