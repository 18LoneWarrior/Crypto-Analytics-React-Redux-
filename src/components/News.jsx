import React, {useState} from 'react'
import moment from 'moment'
import {Select, Typography, Card, Avatar, Row, Col} from 'antd'
import {useGetCryptoNewsQuery} from '../services/cryptoNewsApi'
import {Link} from "react-router-dom";
import millify from "millify";
import {useGetCryptosQuery} from "../services/cryptoApi.jsx";
import Loader from './Loader';
const {Text, Title} = Typography
const {option} = Select


// eslint-disable-next-line react/prop-types
const News = ({ simplified })=>{
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data1 } = useGetCryptosQuery(100)
    const { data, isLoading, error } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12});
    const cryptoNews = data?.data;
    if (isLoading) return <Loader/>;
    if (error) return <Title style={{position:"center"}}>Error Loading the News !!!</Title>
    if (!cryptoNews || cryptoNews.length === 0) return 'No news available';

    return(
    <Row gutter={[34, 34]} className="crypto-card-container">
        {!simplified && (
            <Col span={24}>
                <Select showSearch className="select-news" placeholder="Select a crypto"  optionFilterProp="childern" onChange={(value)=> setNewsCategory(value)} filterOption={(input, option)=>option.children.toLowerCase().indexOf(input.toLowerCase())}>
                <option value="Cryptocurrency">
                    {data1?.data1?.coins.map((coin)=><option value={coin.name}>{coin.name}</option>)}
                </option>
                </Select>
            </Col>
        )}
        {cryptoNews.map((news) => (
            <Col key={news._id} xs={24} sm={12} lg={8}>
                <Card className="news-card" hoverable>
                        <Link to={news.link} target="_blank" rel="noreferrer">
                        <div className="news-image-container">
                            <img
                                src={news.images?.[2]?.src || 'https://via.placeholder.com/150'}
                                alt={news.title}
                                style={{width: '100%', maxHeight: '120px'}}
                            />
                        </div>
                        <Text>{news.time_text}</Text>
                        <Title className="news-title" level={4} style={{width: '100%', maxHeight: '120px'}}>{news.title}</Title>
                        <p>{news.text.split(' ').slice(0, 20).join(' ') + (news.text.split(' ').length > 20 ? '...' : '')}</p>
                    </Link>
                </Card>
            </Col>
        ))}
    </Row>
    )
}
export default News