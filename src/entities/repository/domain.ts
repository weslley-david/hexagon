import { domain } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class DomainRepository {

    listDomain = async (skip: number, take: number): Promise<domain[]> => {
        const domain = await prisma.domain.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!domain) {
            throw new DatabaseError("Coud'not recover data");
        }

        return domain
    }

    getDomainById = async (id: number): Promise<domain> => {
        const domain = await prisma.domain.findUnique({ where: { id: id } })
        if (!domain) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return domain
    }

    createDomain = async (
        name: string,
        description: string
    ): Promise<domain> => {        
        const domain_result = await prisma.domain.create({
            data: {
                name: name,
                description: description
            }
        })

        return domain_result
    }


    updateDomain = async (id: number, name: string, description: string): Promise<domain> => {
        
        const updatedDomain = await prisma.domain.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                description: description
            }
        })

        return updatedDomain
    }

    deleteDomain = async (id: number) => {
        const deletedDomain = await prisma.domain.deleteMany({
            where: {
                id: id
            },
        });
        return deletedDomain
    }
}