import { guardian } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class GuardianRepository {
    getGuardianByEmail = async (email: string): Promise<guardian> => {
        const guardian = await prisma.guardian.findUnique({ where: { email: email } })
        if (!guardian) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return guardian
    }

    listGuardian = async (skip: number, take: number): Promise<guardian[]> => {
        const guardian = await prisma.guardian.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!guardian) {
            throw new DatabaseError("Coud'not recover data");
        }

        return guardian
    }

    getGuardianById = async (id: number): Promise<guardian> => {
        const guardian = await prisma.guardian.findUnique({ where: { id: id } })
        if (!guardian) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return guardian
    }

    createGuardian = async (
        identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date
    ): Promise<guardian> => {        
        const guardian_result = await prisma.guardian.create({
            data: {
                identifier: identifier,
                name: name,
                bio: bio,
                email: email,
                password: password,
                imageurl: imageurl,
                birthdate: birthdate
            }
        })

        return guardian_result
    }


    updateGuardian = async (id: number, identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date): Promise<guardian> => {
        
        const updateguardian = await prisma.guardian.update({
            where: {
                id: id,
            },
            data: {
                    identifier: identifier,
                    name: name,
                    bio: bio,
                    email: email,
                    password: password,
                    imageurl: imageurl,
                    birthdate: birthdate
            }
        })

        return updateguardian
    }

    deleteGuardian = async (id: number) => {
        const deletedGuardian = await prisma.guardian.deleteMany({
            where: {
                id: id
            },
        });
        return deletedGuardian
    }
}