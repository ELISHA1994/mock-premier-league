interface Messages {
    welcome: string;
    notFound: string;
    serverError: string;
    listenToServer: string;
    failedToConnect: string;
    connectedToDatabase: string;
    duplicate: string;
    error: string;
    tokenExpired: string;
    unAuthorized: string;
    tokenError: string;
    IncorrectLoginDetails: string;
    userAuthorized: string;
    userNotFound: string;
    unAuthorizedRoute: string;
    userDeleteMessage: string;
    castError: string;
    duplicateName: string;
    deleteMessage: string;
}

const messages: Messages = {
    welcome: "Welcome to Mock Premier League",
    notFound: "Wrong request. Route does not exist",
    userNotFound: "User does not exist",
    serverError: "Internal server error",
    listenToServer: "listening to server on 127.0.0.1",
    failedToConnect: 'failed to connect to database',
    connectedToDatabase: 'Database Connected',
    duplicate: 'User already exist',
    error: 'An error occur',
    unAuthorized: 'You have to login',
    tokenError: 'Invalid token provided',
    tokenExpired: 'Expired token',
    IncorrectLoginDetails: 'Email or Password is incorrect',
    userAuthorized: 'You are now logged in',
    unAuthorizedRoute: 'You do not have permission to this route',
    userDeleteMessage: 'Successfully deleted',
    castError: 'Invalid ID',
    duplicateName: 'team already exist',
    deleteMessage: 'Sucessfully deleted',
}

export default messages
