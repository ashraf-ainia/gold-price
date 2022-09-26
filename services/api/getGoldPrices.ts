export default async function (): Promise<apiBaseResponse | false> {
    try {
        const res = await fetch(
            `${process.env.GOLD_API_BASE_URL}/v1/latest?api_key=${process.env.GOLD_API_KEY}&base=XAU&currencies=SAR,USD,AED,BHD,EGP`
        );
        const data: apiBaseResponse = await res.json();
        return data;
    } catch (e) {
        console.log('getGoldPrices error: ', e);
        return false;
    }
}