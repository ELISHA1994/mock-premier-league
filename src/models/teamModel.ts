import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface ITeamMember {
    name: string;
    role: string;
}
interface ITeamMembers extends Array<ITeamMember>{}

interface ITeam {
    _id: string;
    teamName: string;
    teamMembers: ITeamMembers;
    description: string;

}
const TeamSchema = new mongoose.Schema<ITeam>(
    {
        _id: mongoose.Schema.Types.ObjectId,
        teamName: {
            type: String,
            unique: true,
            enum: [
                'AFC Bournemouth', 'Arsenal', 'Aston Villa',
                'Brighton & Hove Albion', 'Burnley',
                'Chelsea', 'Crystal Palace',
                'Everton',
                'Leicester City', 'Liverpool',
                'Manchester City', 'Manchester United',
                'Newcastle United', 'Norwich City',
                'Sheffield United', 'Southampton',
                'Tottenham Hotspur',
                'Watford', 'West Ham United', 'Wolverhampton Wanderers'
            ]
        },
        teamMembers : [
            {
                name: {
                    type: String, lowercase: true, required: true
                },
                role: {
                    type: String,
                    enum: [
                        'Goal Keeper', 'Central Back', 'Central Midfield',
                        'Central Forward', 'Left Wing', 'Attacking Midfield',
                        'Defending', 'Left Midfielder', 'Striker',
                        'Right Midfielder'
                    ],
                    required: true
                },
            }
        ],
        description: String
    },
    { timestamps: true }
)

TeamSchema.plugin(uniqueValidator);

export default mongoose.model<ITeam>('Team', TeamSchema)
