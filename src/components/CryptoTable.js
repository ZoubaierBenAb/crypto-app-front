import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { fetchCoins } from '../cryptoApi/cryptoStatsApi';
import './components-style/cryptoTable.css';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { useDispatch, useSelector } from 'react-redux';
import { addCoinToWishlist, deleteCoinFromWishlist } from '../reduxSlices/wishlistSlice';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import {red,green} from '@ant-design/colors'

function CryptoTable() {
  const [coins, setCoins] = useState([]);
  const [toggleHeart, setToggleHeart] = useState(false);
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  const handleAddToWishlist = (coinId) => {
    dispatch(addCoinToWishlist(coinId));
  };

  const handleDeleteFromWishlist = (coinId) => {
    dispatch(deleteCoinFromWishlist(coinId));
  };

  const columns = useMemo(
    () => [
      {
        Header: 'No.',
        accessor: 'number',
      },
      {
        Header: 'Coin',
        accessor: 'coin',
        Cell: ({ row }) => {
          const coinId = row.original.id;
          const coinIsInWishlist = wishlist.some((coin) => coin === coinId);

          const handleToggleWishlist = () => {
            if (coinIsInWishlist) {
              handleDeleteFromWishlist(coinId);
            } else {
              handleAddToWishlist(coinId);
            }
          };

          return (
            <div className="coin-cell">
               <Button type='text'
                className='wishlist-button'
                onClick={handleToggleWishlist}
              >
                {coinIsInWishlist ? (
                  <HeartFilled style={{fontSize:'20px'}} onClick={() => setToggleHeart(!toggleHeart)} />
                ) : (
                  <HeartOutlined style={{fontSize:'20px'}}  onClick={() => setToggleHeart(!toggleHeart)} />
                )}
              </Button>
              <img src={row.original.image} alt={row.original.name} className="coin-image" />
              <Link to={`/${row.original.id}`} className="coin-link">
                {row.original.name}
              </Link>
             
            </div>
          );
        },
      },
      {
        Header: '24h',
        accessor: 'price_change_percentage_24h',
        Cell: ({ value }) => (
          <span className='price-change' style={{ color: value >= 0 ? green[5] : red[4], fontWeight : 'semibold'}}>
            {value}%
          </span>
        ),
      },
      {
        Header: 'Market Cap',
        accessor: 'market_cap',
        Cell: ({ value }) => <span>{millify(value)}$</span>,
      },
      {
        Header: 'Circulating Supply',
        accessor: 'circulating_supply',
        Cell: ({ value }) => <span>{millify(value)}</span>,
      },
    ],
    [wishlist]
  );

  const data = useMemo(
    () =>
      coins[0]?.data?.map((coin, index) => ({
        ...coin,
        number: index + 1,
      })) || [],
    [coins]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCoins();
      setCoins(response);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={column.isSorted ? (column.isSortedDesc ? 'desc' : 'asc') : ''}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : '🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CryptoTable;
