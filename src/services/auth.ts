import { answer, specialist } from "@prisma/client"
import { SpecialistRepository } from "../entities/repository/specialist"
import { generateTokens } from "../utils/generateTokens"

export class AuthService {
    constructor(
        private specialistRepository: SpecialistRepository = new SpecialistRepository()
    ) { }

    signup = async (id: number) => {
        //const answer: answer = await this.specialistRepository.getAnswerById(id)
        return ({"not implemented?":"yet"})
    }

    specialistSignin = async (password: string, email: string) => {
        const specialist: specialist = await this.specialistRepository.getSpecialistByEmail(email)

        if(specialist.password == password){
            let [acetoken, reftoken] =  generateTokens(specialist.id, specialist.identifier, "specialist")
            return ({ "signin": true, "reftoken": reftoken, "acetoken": acetoken, "id": specialist.id, "type": "specialist"})
        }
        return ({"signing": false})
    }
}