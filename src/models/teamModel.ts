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
        teamName: { type: String, unique: true },
        teamMembers : [
            {
                name: {
                    type: String, lowercase: true, required: true
                },
                role: {
                    type: String,
                    enum: ['goal keeper', 'central back', 'central midfield', 'central forward', 'left wing',
                        'attacking midfield', 'central forward', 'left midfielder', 'striker', 'defending', 'right midfielder'],
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
