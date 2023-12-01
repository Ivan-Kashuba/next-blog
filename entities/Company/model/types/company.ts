export interface Company {
    Symbol: string;
    AssetType: string;
    Name: string;
    Description: string;
    CIK: number;
    Exchange: string;
    Currency: string;
    Country: string;
    Sector: string;
    Industry: string;
    Address: string;
    FiscalYearEnd: string;
    LatestQuarter: string;
    MarketCapitalization: number;
    EBITDA: number;
    PERatio: number;
    PEGRatio: number;
    BookValue: number;
    DividendPerShare: number;
    DividendYield: number;
    EPS: number;
    RevenuePerShareTTM: number;
    ProfitMargin: number;
    OperatingMarginTTM: number;
    ReturnOnAssetsTTM: number;
    ReturnOnEquityTTM: number;
    RevenueTTM: number;
    GrossProfitTTM: number;
    DilutedEPSTTM: number;
    QuarterlyEarningsGrowthYOY: number;
    QuarterlyRevenueGrowthYOY: number;
    AnalystTargetPrice: number;
    TrailingPE: number;
    ForwardPE: number;
    PriceToSalesRatioTTM: number;
    PriceToBookRatio: number;
    EVToRevenue: number;
    EVToEBITDA: number;
    Beta: number;
    '52WeekHigh': number;
    '52WeekLow': number;
    '50DayMovingAverage': number;
    '200DayMovingAverage': number;
    SharesOutstanding: number;
    DividendDate: string;
    ExDividendDate: string;
}

export interface CompanyShortDescription {
    '1. symbol': string;
    '2. name': string;
    '3. type': string;
    '4. region': string;
    '5. marketOpen': string;
    '6. marketClose': string;
    '7. timezone': string;
    '8. currency': string;
    '9. matchScore': string;
}