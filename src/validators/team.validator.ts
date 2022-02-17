import { check  } from "express-validator";
import {names} from "debug";

// ['goal keeper', 'central back', 'central midfield', 'central forward', 'left wing',
//     'attacking midfield', 'central forward', 'left midfielder', 'striker', 'defending', 'right midfielder'],

enum RoleOptions {
    goalKeeper = 'goal keeper',
    centralBack = 'central back',
    centralMidfield = 'central midfield',
    centralForward = 'central forward',
    leftWing = 'left wing',
    attackingMidfield = 'attacking midfield',
    leftMidfielder = 'left midfielder',
    striker = 'striker',
    defending = 'defending',
    rightMidfielder = 'right midfielder'
}
export const addTeamValidator: Array<any> = [
    check('teamName')
        .not()
        .isEmpty()
        .withMessage('teamName is required'),
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
