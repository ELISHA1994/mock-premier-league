import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const Helper = {

    /**
     * Hash Password Method
     * @param {string} password
     * @return {string} returns hashed password
     */
    hashPassword(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },

    /**
     * compare Password
     * @param {string} hashPassword
     * @param {string} password
     * @returns {Boolean} return True or False
     */
    comparePassword(hashPassword: string, password: string): boolean {
        return bcrypt.compareSync(password, hashPassword);
    }
}

export default Helper;
