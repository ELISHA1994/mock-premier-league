
export default async function compareTwoTeams (x: Array<any>, y: Array<any>): Promise<boolean> {
    let arrayAreSame = false;
    for (let i = 0, len = x.length; i < len; i += 1) {
        for (let j = 0, len2 = y.length; j < len2; j += 1) {
            if (x[i].name === y[j].name) {
                arrayAreSame = true;
                break;
            }
        }
        return arrayAreSame;
    }
}
