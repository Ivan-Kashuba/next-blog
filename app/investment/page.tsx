'use client';
import {
    Image,
    Input,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';
import { ChangeEvent, useState } from 'react';
import useSWR from 'swr';
import { ProductI } from '@/entities/Product';
import axios from 'axios';
import { Company } from '@/entities/Company/model/types/company';
import Loader from '@/app/loading';
import { Card } from '@nextui-org/card';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import IbmLogo from '@/shared/assets/images/IBM-logo.png';

export default function InvestmentPage() {
    const [inputText, setInputText] = useState('');
    const [searchText, setSearchText] = useState('');

    // const { data, error } = useNews(searchText);

    const { data: company, isLoading } = useIBM();

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
        makeSearchOnServer();
    };

    const makeSearchOnServer = useDebounce(() => {
        setSearchText(inputText);
    }, 1000);

    if (isLoading) {
        return <Loader />;
    }

    const tableData = [
        { name: 'Name', uid: 'name', value: company?.Name },
        { name: 'Ticker', uid: 'symbol', value: company?.Symbol },
        { name: 'Price', uid: 'price', value: company?.['50DayMovingAverage'] },
        { name: 'PE Ratio', uid: 'pe', value: company?.PERatio },
        { name: 'PEG Ratio', uid: 'peg', value: company?.PEGRatio },
        {
            name: 'Market Capitalization',
            uid: 'marketCup',
            value: company?.MarketCapitalization + ' $',
        },
        {
            name: 'Quarter Earnings YOY',
            uid: 'quarterEarnings',
            value: company?.QuarterlyEarningsGrowthYOY,
        },
        {
            name: 'Book value',
            uid: 'bookValue',
            value: company?.BookValue,
        },
        {
            name: 'Dividend Date',
            uid: 'dividendDate',
            value: company?.DividendDate,
        },
        {
            name: 'Ex Dividend Date',
            uid: 'exDividendDate',
            value: company?.ExDividendDate,
        },
        {
            name: 'Dividend per share',
            uid: 'divPerShare',
            value: company?.DividendPerShare,
        },
        {
            name: 'Dividend Yield',
            uid: 'divYield',
            value: company?.DividendYield,
        },
        {
            name: 'Sector',
            uid: 'sector',
            value: company?.Sector,
        },
        {
            name: 'Industry',
            uid: 'industry',
            value: company?.Industry,
        },
    ];

    return (
        <div>
            <h1 className="font-bold text-h1">Investment companies</h1>
            <Input
                value={inputText}
                onChange={onInputChange}
                startContent={<SearchIcon />}
                className="w-[400px] m-auto"
                variant="underlined"
            />

            <div className="mt-[30px]">
                <h2 className="text-h1 font-bold text-center">
                    {company?.Name} ({company?.Symbol})
                </h2>
                <Card className="my-[30px] text-h2 p-[30px] flex items-center justify-center">
                    <Image className="mb-[20px] w-[300px] h-[200px]" src={IbmLogo.src} alt="IBM" />
                    <div>{company?.Description}</div>
                </Card>
                <div className="flex justify-between">
                    <h1 className="text-h2 font-bold">
                        Current: {company?.['50DayMovingAverage']} $
                    </h1>
                    <h1 className="text-h2 font-bold">Target: {company?.AnalystTargetPrice} $</h1>
                    <h1 className="text-h2 font-bold">PE: {company?.PERatio}</h1>
                </div>

                <Table className="mt-[30px]" aria-label={company?.Name}>
                    <TableHeader columns={tableData}>
                        {(column) => (
                            <TableColumn className="uppercase" key={column.uid} align={'start'}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            {tableData.map((item) => {
                                return <TableCell key={item.uid}>{item?.value || '-'}</TableCell>;
                            })}
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-center my-[50px]">
                <iframe
                    width="80%"
                    height="600"
                    src="https://www.youtube.com/embed/s5akT1zxe4g"
                    allowFullScreen
                />
            </div>
        </div>
    );
}

const useNews = (searchString: string) => {
    const isSearchExist = searchString.length > 0;

    return useSWR<ProductI, Error>(
        [`news`, searchString],
        isSearchExist
            ? async () => {
                  return await axios
                      .get(
                          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${
                              searchString || 'Tesla'
                          }&apikey=6Q7R37192C2O16R4`,
                      )
                      .then((res) => res.data?.bestMatches);
              }
            : null,
    );
};

const useIBM = () => {
    return useSWR<Company, Error>([`IBM`], async () => {
        return await axios
            .get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`)
            .then((res) => res.data);
    });
};
