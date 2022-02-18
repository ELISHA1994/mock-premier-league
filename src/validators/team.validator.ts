import { check  } from "express-validator";
import {names} from "debug";

// ['goal keeper', 'central back', 'central midfield', 'central forward', 'left wing',
//     'attacking midfield', 'central forward', 'left midfielder', 'striker', 'defending', 'right midfielder'],

enum RoleOptions {
    goalKeeper = 'Goal Keeper',
    centralBack = 'Central Back',
    centralMidfield = 'Central Midfield',
    centralForward = 'Central Forward',
    leftWing = 'Left Wing',
    attackingMidfield = 'Attacking Midfield',
    leftMidfielder = 'Left Midfielder',
    striker = 'Striker',
    defending = 'Defending',
    rightMidfielder = 'Right Midfielder'
}

enum TeamNameOptions {
    AFCBournemouth = 'AFC Bournemouth',
    Arsenal = 'Arsenal',
    AstonVilla = 'Aston Villa',
    BrightonHoveAlbion = 'Brighton & Hove Albion',
    Burnley = 'Burnley',
    Chelsea = 'Chelsea',
    Everton = 'Everton',
    LeicesterCity = 'Leicester City',
    Liverpool = 'Liverpool',
    ManchesterCity = 'Manchester City',
    ManchesterUnited = 'Manchester United',
    NewcastleUnited = 'Newcastle United',
    NorwichCity = 'Norwich City',
    SheffieldUnited = 'Sheffield United',
    Southampton = 'Southampton',
    TottenhamHotspur = 'Tottenham Hotspur',
    Watford = 'Watford',
    WestHamUnited = 'West Ham United',
    WolverhamptonWanderers = 'Wolverhampton Wanderers'

}
export const addTeamValidator: Array<any> = [
    check('teamName')
        .not()
        .isEmpty()
        .withMessage('teamName is required'),
    check('teamName')
        .notEmpty()
        .isString()
        .custom((teamName: TeamNameOptions) => {
            return Object.values(TeamNameOptions).includes(teamName)
        })
        .withMessage('Please provide a valid teamName'),
    check("teamMembers")
        .not()
        .isEmpty()
        .withMessage('teamMembers is required'),
    check('teamMembers.*.name')
        .not()
        .isEmpty()
        .withMessage('teamMembers.name is required'),
    check('teamMembers.*.role')
        .notEmpty()
        .isString()
        .custom((role: RoleOptions) => {
            return Object.values(RoleOptions).includes(role)
        })
        .withMessage('Please provide a valid name and a valid role for the teamMember')
];

export const updateTeamValidator: Array<any> = [
    check('teamName').optional()
        .if(check('teamName').exists())
        .notEmpty().isLength({ min: 3 })
        .withMessage('Please provide a valid teamName'),
    check('teamMembers').optional(),
    check('teamMembers.*.name')
        .if(check('teamName').exists())
        .not()
        .isEmpty()
        .withMessage('teamMembers.name is required'),
    check('teamMembers.*.role')
        .if(check('teamName').exists())
        .notEmpty()
        .isString()
        .custom((role: RoleOptions) => {
            return Object.values(RoleOptions).includes(role)
        })
        .withMessage('Please provide a valid name and a valid role for the teamMember')
];
