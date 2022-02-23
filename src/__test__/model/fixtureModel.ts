interface ICreateFixture {
    teamA: Array<any>
    teamB: Array<any>
    matchInfo: Array<any>
}

interface ILogin {
    email: string;
    password: string;
}

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

interface ISearchFixtures {
    name: string;
    status: string;
    stadium: string;
    date: string;
}

const adminsignup: ISignup = {
    email: 'admin@premierleague.com',
    password: 'Elisha27',
    firstName: 'Elisha',
    lastName: 'Bello',
    isAdmin: true
};

const createFixture: ICreateFixture = {
    teamA: [{ name: 'Arsenal', score: 0 }],
    teamB: [{ name: 'Aston Villa', score: 0 }],
    matchInfo: [{ date: '2019-11-26', stadium: 'Craven Cottage' }]
};

const sameTeam: ICreateFixture = {
    teamA: [{ name: 'Arsenal', score: 0 }],
    teamB: [{ name: 'Arsenal', score: 0 }],
    matchInfo: [{ date: '2019-11-26', stadium: 'Craven Cottage' }]
};

const createTeamA: ICreateTeam = {
    teamName: 'Arsenal',
    teamMembers: [{ name: 'Wesley Moraes', role: 'Central Forward' }, { name: 'Mahmoud Hassan', role: 'Attacking Midfield' }]
};
const createTeamB: ICreateTeam = {
    teamName: 'Aston Villa',
    teamMembers: [{ name: 'Wesley Moraes', role: 'Central Forward' }, { name: 'Mahmoud Hassan', role: 'Attacking Midfield' }]
};
const validFixture: ICreateFixture = {
    teamA: [{ name: 'Arsenal', score: 0 }],
    teamB: [{ name: 'Aston Villa', score: 0 }],
    matchInfo: [{ date: '2019-11-26', stadium: 'Craven Cottage' }]
};

const adminLogin: ILogin = {
    email: 'admin@premierleague.com',
    password: 'Elisha27',
};

const login = {
    email: 'test@gmail.com',
    password: 'Elisha27'
};

const signup: ISignup = {
    email: 'test@gmail.com',
    password: 'Elisha27',
    firstName: 'Elisha',
    lastName: 'Bello',
    isAdmin: false
};

const searchFixtures: ISearchFixtures = {
    name: "Arsenal",
    status: "",
    stadium: "",
    date: ""
}

export {
    createFixture,
    adminLogin,
    login,
    sameTeam,
    validFixture,
    signup,
    adminsignup,
    createTeamA,
    createTeamB,
    searchFixtures
};
