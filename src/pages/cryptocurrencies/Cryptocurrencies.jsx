import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetExchangesQuery } from "../../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetExchangesQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // setCryptos(cryptoList?.slice(0, 10));
    const filterData = cryptoList?.filter((coins) =>
      coins.name.toLowerCase().includes(searchTerm)
    );
    setCryptos(filterData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return "loading...";

  console.info("data", cryptos);

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/cryptos/${currency.id}`}>
              <Card
                title={`${
                  currency.adjusted_rank ? currency.adjusted_rank : "0"
                }. ${currency.name}`}
                hoverable
              >
                <p>Price: {millify(currency.quotes.USD.reported_volume_24h)}</p>
                {/* <p>Market Cap: {currency.quotes.USD.}</p> */}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
