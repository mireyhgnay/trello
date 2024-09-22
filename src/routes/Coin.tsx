import {
  useLocation,
  useParams,
  Outlet,
  Link,
  useMatch,
} from 'react-router-dom';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { Helmet } from 'react-helmet';

import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoinsInfo, fetchCoinsTickers } from '../api';

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
  color: ${(props) => props.theme.darkButtonColor};
`;

const Tab = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 12px 0px;
  border-radius: 10px;
  margin: 25px 0;

  a {
    display: block;
    color: ${(props) =>
      props.isActive ? props.theme.pointColor : props.theme.textColor};
  }
`;

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface ILocation {
  state: string;
}

export default function Coin() {
  const params = useParams();
  const coinId = params.coinId as string;
  const { state } = useLocation() as ILocation;
  const chartMatch = useMatch('/:coinId/chart');

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ['info', coinId],
    () => fetchCoinsInfo(coinId),
    {
      staleTime: 1000 * 60 * 5, // 5분마다 캐시 갱신
    }
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ['tickers', coinId],
    () => fetchCoinsTickers(coinId),
    {
      staleTime: 1000 * 60 * 5, // 5분마다 캐시 갱신
      refetchInterval: 5000, // 5초마다 refetch하여 내용 업데이트
    }
  );

  const load = infoLoading || tickersLoading;

  return (
    <>
      <Helmet>
        <title>{state ? state : load ? 'Loading...' : infoData?.name}</title>
      </Helmet>

      <Header title={state ? state : infoData?.name} isBack={true} />

      {load ? (
        <Loader load={load} />
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tab isActive={chartMatch !== null}>
            {chartMatch ? (
              <Link to={`/${coinId}`}>Chart 닫기</Link>
            ) : (
              <Link to={`/${coinId}/chart`}>Chart 보기</Link>
            )}
          </Tab>

          <Outlet context={coinId} />
        </>
      )}
    </>
  );
}
