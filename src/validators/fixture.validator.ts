import {body, check, oneOf} from "express-validator";
import * as validator from "validator";

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
enum StadiumOptions {
    VitalityStadium = 'Vitality Stadium',
    TheAmex = 'The Amex',
    TurfMoor = 'Turf Moor',
    CardiffCityStadium = 'Cardiff City Stadium',
    JohnSmithStadium = 'John Smith\'s Stadium',
    KingPowerStadium = 'King Power Stadium',
    GoodisonPark = 'Goodison Park',
    Anfield = 'Anfield',
    EmiratesStadium = 'Emirates Stadium',
    StamfordBridge = 'Stamford Bridge',
    SelhurstPark = 'Selhurst Park',
    CravenCottage = 'Craven Cottage',
    WembleyStadium = 'Wembley Stadium',
    LondonStadium = 'London Stadium',
    EtihadStadium = 'Etihad Stadium',
    OldTrafford = 'Old Trafford',
    StJamesPark = 'St James Park',
    StMaryStadium = 'St Mary\'s Stadium',
    VicarageRoad = 'Vicarage Road',
    MolineuxStadium = 'Molineux Stadium'
}
enum StatusOptions {
    completed = 'completed',
    ongoing = 'ongoing',
    pending = 'pending',
}
export const addFixtureValidator: Array<any> = [
    check('teamA')
        .not()
        .isEmpty()
        .withMessage('teamA is required'),
    check('teamA.*.name')
        .not()
        .isEmpty()
        .withMessage('teamA.name is required'),
    check('teamA.*.name')
        .notEmpty()
        .isString()
        .custom((team: TeamNameOptions) => {
            return Object.values(TeamNameOptions).includes(team)
        })
        .withMessage('Please provide a valid teamName'),
    check('teamA.*.score')
        .optional()
        .if(check('teamA.*.score').exists())
        .isInt({ min: 0 })
        .withMessage('score is required'),

    check('teamB')
        .not()
        .isEmpty()
        .withMessage('teamB is required'),
    check('teamB.*.name')
        .not()
        .isEmpty()
        .withMessage('teamB.name is required'),
    check('teamB.*.name')
        .notEmpty()
        .isString()
        .custom((team: TeamNameOptions) => {
            return Object.values(TeamNameOptions).includes(team)
        })
        .withMessage('Please provide a valid teamName'),
    check('teamB.*.score')
        .optional()
        .if(check('teamB.*.score').exists())
        .isInt({ min: 0 })
        .withMessage('score is required'),

    check('matchInfo')
        .not()
        .isEmpty()
        .withMessage('matchInfo is required'),
    check('matchInfo.*.date')
        .if(check('matchInfo.*.date').exists())
        .notEmpty()
        .isString()
        .isDate()
        .withMessage('Enter a valid Date'),
    check('matchInfo.*.stadium')
        .notEmpty()
        .isString()
        .custom((stadium: StadiumOptions) => {
            return Object.values(StadiumOptions).includes(stadium)
        })
        .withMessage('Please provide a valid stadium'),
    check('status').optional()
        .if(check('status').exists())
        .notEmpty()
        .isString()
        .custom((status: StatusOptions) => {
            return Object.values(StatusOptions).includes(status)
        })
        .withMessage('Please provide a valid status of either \'completed\' \'ongoing\' \'pending\'')
];

export const updateFixtureValidator: Array<any> = [
    oneOf([
        check('teamA')
            .exists()
            .isArray()
            .withMessage('At least one field must be provided'),
        check('teamB')
            .exists()
            .isArray()
            .withMessage('At least one field must be provided'),
        check('matchInfo')
            .exists()
            .isArray()
            .withMessage('At least one field must be provided')
    ]),
    check('teamA').optional(),
    check('teamA.*.name')
        .if(check('teamA').exists())
        .not()
        .isEmpty()
        .withMessage('teamA.name is required'),
    check('teamA.*.name')
        .if(check('teamA').exists())
        .notEmpty()
        .isString()
        .custom((team: TeamNameOptions) => {
            return Object.values(TeamNameOptions).includes(team)
        })
        .withMessage('Please provide a valid teamName'),

    check('teamA.*.score').optional()
        .if(check('teamA').exists())
        .if(check('teamA.*.score').exists())
        .isInt({ min: 0 })
        .withMessage('score is required'),

    check('teamB').optional(),
    check('teamB.*.name')
        .if(check('teamB').exists())
        .not()
        .isEmpty()
        .withMessage('teamB.name is required'),
    check('teamB.*.name')
        .if(check('teamB').exists())
        .notEmpty()
        .isString()
        .custom((team: TeamNameOptions) => {
            return Object.values(TeamNameOptions).includes(team)
        })
        .withMessage('Please provide a valid teamName'),

    check('teamB.*.score').optional()
        .if(check('teamB').exists())
        .if(check('teamB.*.score').exists())
        .isInt({ min: 0 })
        .withMessage('score is required'),

    //
    check('matchInfo').optional(),
    check('matchInfo.*.date')
        .if(check('matchInfo').exists())
        .notEmpty()
        .isString()
        .isDate()
        .withMessage('Enter a valid Date'),
    check('matchInfo.*.stadium')
        .if(check('matchInfo').exists())
        .notEmpty()
        .isString()
        .custom((stadium: StadiumOptions) => {
            return Object.values(StadiumOptions).includes(stadium)
        })
        .withMessage('Please provide a valid stadium'),
    check('status').optional()
        .if(check('status').exists())
        .notEmpty()
        .isString()
        .custom((status: StatusOptions) => {
            return Object.values(StatusOptions).includes(status)
        })
        .withMessage('Please provide a valid status of either \'completed\' \'ongoing\' \'pending\'')

]
