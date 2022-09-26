import { MongoClient } from "mongodb";

export async function getConfig(client: MongoClient): Promise<dbConfig> {
    const configResult: any = await client
        .db("gold-price")
        .collection("config")
        .findOne({ name: "config" });

    const result: dbConfig = {
        id: configResult.id,
        name: configResult.name,
        lastModificationDate: configResult.lastModificationDate
    };

    return result;
}

export async function updateConfig(client: MongoClient, id: string, newDate: Date): Promise<any> {
    return await client
        .db("gold-price")
        .collection("config")
        .updateOne({ id }, { $set: { lastModificationDate: newDate } });
}