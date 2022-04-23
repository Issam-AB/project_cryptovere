import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetExchangesQuery } from "../../services/cryptoApi";

const Cryptocurrencies = () => {
  const { data: cryptoList, isFetching } = useGetExchangesQuery();
  const [cryptos, setCryptos] = useState({});

  useEffect(() => {
    setCryptos(cryptoList?.slice(0, 99));
  }, [cryptoList]);

  if (isFetching) return "loading...";

  console.info("data", cryptos);

  return (
    <>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/cryptos/${currency.id}`}>
              <Card
                title={`${
                  currency.adjusted_rank ? currency.adjusted_rank : "0"
                }. ${currency.name}`}
              ></Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
