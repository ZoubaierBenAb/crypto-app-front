import { useMemo, useState, useEffect } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';

import axios from 'axios';
import '../components/components-style/cryptoTable.css'
import { Button ,ConfigProvider,theme } from 'antd';
import {blue} from '@ant-design/colors'

function Exchanges() {
  const [exchanges, setExchanges] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: 'Exchanges',
        accessor: 'name',
        Cell: ({ row }) => (
          <div className="coin-cell">
            <img className="coin-image" src={row.original.image} alt={row.original.name} />
            <span className="coin-link">{row.original.name}</span>
          </div>
        ),
      },
      {
        Header: 'Country',
        accessor: 'country',
      },
      {
        Header: 'Trust Score',
        accessor: 'trust_score',
      },
      {
        Header: 'Year Established',
        accessor: 'year_established',
      },
    ],
    []
  );

  useEffect(() => {
    const fetchExchanges = async () => {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/exchanges?per_page=100'
      );
      setExchanges(response.data);
    };
    fetchExchanges();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex },
  } = useTable({ columns, data: exchanges , initialState: { sortBy: [{ id: 'trust_score' ,desc : true}] }}, useSortBy , usePagination);

  return (
    <ConfigProvider   theme={{
      algorithm: theme.darkAlgorithm,
    }}>
    <div className="Exchange-table">
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        
        <div className='pagination' >
          <Button  type='primary'  onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button >
          <span className='page' style={{color : blue[4]}}>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <Button  type='primary'  onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button  >
        </div>
      </div>
    </div>
    </ConfigProvider>
  );
}

export default Exchanges;
