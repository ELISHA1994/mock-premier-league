interface ISignup {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean
}

interface ICreateTeam {
    teamName: string;
    teamMembers: Array<any>
}

interface ILogin {
    email: string;
    password: string;
}

const adminsignup: ISignup = {
    email: 'admin@premierleague.com',
    password: 'Elisha27',
    firstName: 'Elisha',
    lastName: 'Bello',
    isAdmin: true
};

const createTeam: ICreateTeam = {
    teamName: 'Aston Villa',
    teamMembers: [{ name: 'Wesley Moraes', role: 'Central Forward' }, { name: 'Mahmoud Hassan', role: 'Attacking Midfield' }]
};

const adminLogin: ILogin = {
    email: 'admin@premierleague.com',
    password: 'Elisha27',
};

const login: ILogin = {
    email: 'test@gmail.com',
    password: 'Elisha27'
};

export { createTeam, adminLogin, login, adminsignup };
