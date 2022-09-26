import { MongoClient } from "mongodb";

export async function addPrice(client: MongoClient, price: dbPrice): Promise<any> {
    return await client
        .db("gold-price")
        .collection("prices")
        .insertOne(price);
}

export async function getLastAddedPrice(client: MongoClient): Promise<any> {
    const prices = await client
        .db("gold-price")
        .collection("prices")
        .find({})
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

    if (prices && Array.isArray(prices) && prices.length >= 1) {
        return prices[0];
    }

    return false;
}