import React, { useEffect, useState } from 'react'
import { Select, selectClasses } from '@mui/base/Select';
import { Option, optionClasses } from '@mui/base/Option';
import { Popper } from '@mui/base/Popper';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import './StockList.css'
import BasicCard from './BasicCard';

function StockList() {

    const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
        const slots = {
            root: StyledButton,
            listbox: StyledListbox,
            popper: StyledPopper,
            ...props.slots,
        };

        return <Select {...props} ref={ref} slots={slots} value={props.Price} />;
    });

    const blue = {
        100: '#DAECFF',
        200: '#99CCF3',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#f6f8fa',
        100: '#eaeef2',
        200: '#d0d7de',
        300: '#afb8c1',
        400: '#8c959f',
        500: '#6e7781',
        600: '#57606a',
        700: '#424a53',
        800: '#32383f',
        900: '#24292f',
    };

    const StyledButton = styled('button')(
        ({ theme }) => `
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        min-width: 320px;
        padding: 8px 12px;
        border-radius: 8px;
        text-align: left;
        line-height: 1.5;
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
            };
      
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 120ms;
      
        &:hover {
          background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
          border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
        }
      
        &.${selectClasses.focusVisible} {
          border-color: ${blue[400]};
          outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
        }
      
        &.${selectClasses.expanded} {
          &::after {
            content: '▴';
          }
        }
      
        &::after {
          content: '▾';
          float: right;
        }
        `,
    );

    const StyledListbox = styled('ul')(
        ({ theme }) => `
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        padding: 6px;
        margin: 12px 0;
        min-width: 320px;
        border-radius: 12px;
        overflow: auto;
        outline: 0px;
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
            };
        `,
    );

    const StyledOption = styled(Option)(
        ({ theme }) => `
        list-style: none;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
      
        &:last-of-type {
          border-bottom: none;
        }
      
        &.${optionClasses.selected} {
          background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
          color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
        }
      
        &.${optionClasses.highlighted} {
          background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
          color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        }
      
        &.${optionClasses.highlighted}.${optionClasses.selected} {
          background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
          color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
        }
      
        & span {
            pointer-events: none; /* Disable pointer events on the span */
          }

        &.${optionClasses.disabled} {
          color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
        }
      
        &:hover:not(.${optionClasses.disabled}) {
          background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
          color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        }
        `,
    );

    const StyledPopper = styled(Popper)`
        z-index: 1;
      `;

    const [stocks, setStocks] = useState([])
    const [selectedStock, setSelectedStock] = useState(stocks[0])

    useEffect(() => {
        fetchStocks();
        setInterval(fetchStocks, 60000);
        alert('Stock prices will be updated each minute')
    }, []);

    const handleChange = (event) => {
        if (event && event.target) {
            const selectedValue = event.target.textContent.trim();
            const nameWithoutNumbers = selectedValue.replace(/\d+/g, '');
            const selectedStock = stocks.find((stock) => stock.name === nameWithoutNumbers.trim());
            setSelectedStock(selectedStock);
        }
    }

    const fetchStocks = async () => {
        try {
            const response = await fetch('http://localhost:8001/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStocks(data);

            if (!selectedStock && data.length > 0) {
                setSelectedStock(data[0]);
            }
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    };

    return (
        <>
            <div>
                <CustomSelect defaultValue={selectedStock ? selectedStock.Price : null} onChange={handleChange}>
                    {stocks.map(stock => (
                        <>
                            <StyledOption value={stock.Price}>{stock.name} <span style={{ marginLeft: '10px' }}>{stock.Price}</span></StyledOption >
                        </>
                    ))}
                </CustomSelect>
            </div >
            {selectedStock && <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className='stock_info'>
                            <BasicCard prop={selectedStock}></BasicCard>
                        </div>
                    </Grid>
                </Grid>
            </div>
            }
        </>
    )
}

export default StockList