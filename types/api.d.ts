type rate = "SAR" | "USD" | "AED" | "BHD" | "EGP";

type rates = {
    [key in rate]: number;
};

type apiBaseResponse = {
    success: boolean;
    base: string;
    timestamp: number;
    rates: rates;
};