'use client';
import {
    Image,
    Input,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Loader from '@/app/loading';
import { Card } from '@nextui-org/card';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import IbmLogo from '@/shared/assets/images/IBM-logo.png';
import { Company, CompanyShortDescription } from '@/entities/Company';
import { useFocused } from '@/shared/lib/hooks/useFocused/useFocused';

export default function InvestmentPage() {
    const [inputText, setInputText] = useState('');
    const [searchText, setSearchText] = useState('');
    const { isFocused, focusEventHandlers } = useFocused();
    const [selectedTicker, setSelectedTicker] = useState('');
    const { data: chooseOptions, isLoading: isOptionsLoading } = useNews(searchText);
    
    // const chooseOptions: CompanyShortDescription[] = [{
    //     '1. symbol': 'Sb',
    //     '2. name': 'Name',
    //     '3. type': 'type',
    //     '4. region': 'region',
    //     '5. marketOpen': 'marketOpen',
    //     '6. marketClose': 'marketClose',
    //     '7. timezone': 'timezone',
    //     '8. currency': 'currency',
    //     '9. matchScore': 'matchScore',
    // }];
    // const isOptionsLoading = false;

    const { data: company, isLoading } = useIBM();
    const { data: selectedCompany } = useCompanyByTicker(selectedTicker);
    console.log('selectedCompany:',selectedCompany);

    const isCompanyIbm = useMemo(() => {
        if (company && selectedCompany) {
            return JSON.stringify(company) === JSON.stringify(selectedCompany);
        }

        return true;
    }, [company, selectedCompany]);


    const currentCompany = useMemo(() => {
        return selectedCompany || company;
    }, [company, selectedCompany]);


    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
        makeSearchOnServer();
    };

    const makeSearchOnServer = useDebounce(() => {
        setSearchText(inputText);
    }, 1000);

    const onSelectCompanyFromOptionsClick = useCallback((company: CompanyShortDescription) => (e: any) => {
        setSelectedTicker(company['1. symbol']);
        focusEventHandlers.onBlur(e);
    }, [focusEventHandlers]);


    const isOptionsShown = (chooseOptions?.length || isOptionsLoading) && isFocused;

    const tableData = [
        { name: 'Name', uid: 'name', value: currentCompany?.Name },
        { name: 'Ticker', uid: 'symbol', value: currentCompany?.Symbol },
        { name: 'Price', uid: 'price', value: currentCompany?.['50DayMovingAverage'] },
        { name: 'PE Ratio', uid: 'pe', value: currentCompany?.PERatio },
        { name: 'PEG Ratio', uid: 'peg', value: currentCompany?.PEGRatio },
        {
            name: 'Market Capitalization',
            uid: 'marketCup',
            value: currentCompany?.MarketCapitalization + ' $',
        },
        {
            name: 'Quarter Earnings YOY',
            uid: 'quarterEarnings',
            value: currentCompany?.QuarterlyEarningsGrowthYOY,
        },
        {
            name: 'Book value',
            uid: 'bookValue',
            value: currentCompany?.BookValue,
        },
        {
            name: 'Dividend Date',
            uid: 'dividendDate',
            value: currentCompany?.DividendDate,
        },
        {
            name: 'Ex Dividend Date',
            uid: 'exDividendDate',
            value: currentCompany?.ExDividendDate,
        },
        {
            name: 'Dividend per share',
            uid: 'divPerShare',
            value: currentCompany?.DividendPerShare,
        },
        {
            name: 'Dividend Yield',
            uid: 'divYield',
            value: currentCompany?.DividendYield,
        },
        {
            name: 'Sector',
            uid: 'sector',
            value: currentCompany?.Sector,
        },
        {
            name: 'Industry',
            uid: 'industry',
            value: currentCompany?.Industry,
        },
    ];

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className='font-bold text-h1'>Investment companies</h1>
            <div className='relative w-[400px] m-auto'>
                <Input
                    value={inputText}
                    onChange={onInputChange}
                    placeholder='Type name or some info about company'
                    startContent={<SearchIcon />}
                    className='w-[400px] m-auto'
                    variant='underlined'
                    {...focusEventHandlers}
                />
                {isOptionsShown && (
                    <Card className='clickable-content py-[15px] w-[400px] absolute top-[50px] z-[100] left-0'>
                        {isOptionsLoading && (
                            <div className='h-[100px] flex items-center justify-center'>
                                <Spinner size='md' />
                            </div>
                        )}
                        {chooseOptions?.map((option, index) => {
                            return (
                                <div
                                    onClick={onSelectCompanyFromOptionsClick(option)}
                                    key={index}
                                    className='p-[10px] hover:bg-[#f0ecec] cursor-pointer'
                                >
                                    <div className='flex'>
                                        <div className='font-bold mr-[10px]'>
                                            {option['1. symbol']}
                                        </div>
                                        <div>{option['2. name']}</div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='mr-[15px]'>({option['3. type']})</div>
                                        <div>({option['4. region']})</div>
                                    </div>
                                </div>
                            );
                        })}
                    </Card>
                )}
            </div>

            <div className='mt-[30px]'>
                <h2 className='text-h1 font-bold text-center'>
                    {currentCompany?.Name} ({currentCompany?.Symbol})
                </h2>
                <Card className='my-[30px] text-h2 p-[30px] flex items-center justify-center'>
                    {isCompanyIbm && <Image className='mb-[20px] w-[300px] h-[200px]' src={IbmLogo.src} alt='IBM' />}
                    <div>{currentCompany?.Description}</div>
                </Card>
                <div className='flex justify-between'>
                    <h1 className='text-h2 font-bold'>
                        Current: {currentCompany?.['50DayMovingAverage']} $
                    </h1>
                    <h1 className='text-h2 font-bold'>Target: {currentCompany?.AnalystTargetPrice} $</h1>
                    <h1 className='text-h2 font-bold'>PE: {currentCompany?.PERatio}</h1>
                </div>

                <Table className='mt-[30px]' aria-label={currentCompany?.Name}>
                    <TableHeader columns={tableData}>
                        {(column) => (
                            <TableColumn className='uppercase' key={column.uid} align={'start'}>
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
            {isCompanyIbm && <div className='flex items-center justify-center my-[50px]'>
                <iframe
                    width='80%'
                    height='600'
                    src='https://www.youtube.com/embed/s5akT1zxe4g'
                    allowFullScreen
                />
            </div>
            }
        </div>
    );
}

const useNews = (searchString: string) => {
    const isSearchExist = searchString.length > 0;

    return useSWR<CompanyShortDescription[], Error>(
        [`news`, searchString],
        isSearchExist
            ? async () => {
                return await axios
                    .get(
                        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${
                            searchString
                        }&apikey=6Q7R37192C2O16R4`,
                    )
                    .then((res) => res.data?.bestMatches);
            }
            : null,
    );
};

const useIBM = () => {
    // Using individual hook for IBM because of API restrictions
    return useSWR<Company, Error>([`IBM`], async () => {
        return await axios
            .get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`)
            .then((res) => res.data);
    });
};

const useCompanyByTicker = (companyTicker: string) => {
    return useSWR<Company, Error>([`Company`,companyTicker], companyTicker ? async () => {
        return await axios
            .get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${companyTicker}&apikey=6Q7R37192C2O16R4`)
            .then((res) => res.data);
    } : null);
};
