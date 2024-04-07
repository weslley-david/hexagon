import { item } from "@prisma/client"
import { ItemRepository } from "../entities/repository/item"

export class ItemService {
    constructor(
        private itemRepository: ItemRepository = new ItemRepository()
    ) { }
    
    deleteItem = async (id: number): Promise<void> => {
        await this.itemRepository.deleteItem(id);
    }

    detailItem = async (id: number) => {
        const item: item = await this.itemRepository.getItemById(id)
        return (item)
    }
    updateItem = async (id: number, content: string, number: number, score: number, question: number): Promise<item> => {
        return await this.itemRepository.updateItem(id, content, number, score, question );
    }

    list = async (skip: number, take: number) => {
        const item: item[] = await this.itemRepository.listItem(skip, take)
        return (item)
    }

    createItem = async ( content: string, number: number, score: number, question: number) => {
        const item: item = await this.itemRepository.createItem(content, number, score, question)
        return (item)
    }


}