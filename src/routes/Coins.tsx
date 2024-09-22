import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;

  & + & {
    margin-top: 10px;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.pointColor};
    }
  }

  a {
    transition: color 0.2s ease-in;
    color: inherit;
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
  }
`;

const IconImg = styled.img`
  width: 25px;
  height: 25px;
  vertical-align: text-bottom;
  margin-right: 10px;
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  const { data, isLoading } = useQuery<ICoins[]>('allCoins', fetchCoins, {
    staleTime: 1000 * 60 * 5, // 5분마다 캐시 갱신
  });

  return (
    <>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header title='🪙 Coins 🪙' />
      {isLoading ? (
        <Loader load={isLoading} />
      ) : (
        <CoinsList>
          {data &&
            data.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={coin.name}>
                  <div>
                    <IconImg
                      src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                      alt='coin icon'
                    />
                    {coin.name}
                  </div>{' '}
                  <span>👉</span>
                </Link>
              </Coin>
            ))}
        </CoinsList>
      )}
    </>
  );
}
