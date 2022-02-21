interface ISignup {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean
}

interface ILogin {
    email: string;
    password: string;
}
const signup: ISignup = {
    email: 'test@gmail.com',
    password: 'Elisha27',
    firstName: 'Elisha',
    lastName: 'Bello',
    isAdmin: false
};
const adminsignup: ISignup = {
    email: 'admin@premierleague.com',
    password: 'Elisha27',
    firstName: 'Elisha',
    lastName: 'Bello',
    isAdmin: true
};

const login: ILogin = {
    email: 'test@gmail.com',
    password: 'Elisha27'
};

const adminLogin: ILogin = {
    email: 'admin@premierleague.com',
    password: 'Elisha27',
};

const invalidlogin: ILogin = {
    email: 'test@gmail.com',
    password: 'Elisha25'
};

const wrongEmail: ILogin = {
    email: 'testt@gmail.com',
    password: 'Elisha27'
};

export {
    signup, login, invalidlogin, wrongEmail, adminLogin, adminsignup
};
