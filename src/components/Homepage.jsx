// eslint-disable-next-line no-unused-vars
import React from 'react'
import millify from "millify";
import {Typography, Row, Col, Statistic} from "antd";
import {Link} from "react-router-dom";
import { useGetCryptosQuery} from "../services/cryptoApi";
import {Cryptocurrency, News} from "../components"
import Loader from './Loader';
const {Title} = Typography

const HomePage = ()=>{

    const {data, isFetching} = useGetCryptosQuery(10)
    const globalStats = data?.data?.stats
    if(isFetching) {return <Loader/>}

    return(
        <>
            <Title level={2} className="heading">Global Crypto Stats.</Title>
            <Row>
                <Col span={12}><Statistic title="Total Cryptocurrency" value={globalStats.total}/></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
                <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
                <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
            </Row>
            <div className="home-heading-container">
                <Title className="home-title" level={2}>Top 10 crypto in the world</Title>
                <Title className="show-more" level={3}><Link to="/cryptocurrency">Show More</Link></Title>
            </div>
            <Cryptocurrency simplified/>
            <div className="home-heading-container">
                <Title className="home-title" level={2}>Latest Crypto News</Title>
                <Title className="show-more" level={3}><Link to="/news">Show More</Link></Title>
            </div>
            <News simplified/>
        </>
    )
}

export default HomePage