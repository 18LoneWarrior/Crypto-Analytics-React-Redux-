import React, {useState, useEffect} from 'react'
import millify from 'millify';
import {Link} from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'
import {useGetCryptosQuery} from '../services/cryptoApi'
import Loader from './Loader'


// eslint-disable-next-line react/prop-types
const Cryptocurrency = ({ simplified })=>{

    const count = simplified ? 10 :100
    const {data: cryptosList, isFetching } = useGetCryptosQuery(count)
    const [crypto, setCrypto] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    //To implement the searchbar functionality in cryptocurrency page.
    useEffect(()=>{
        const filteredData = cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCrypto(filteredData)
    },[cryptosList,searchTerm])

    if(isFetching) return <Loader/>;
    return(
        <>
            {!simplified && (
                <div className="search-cryto" style={{width: "250px", margin:"10px"}}>
                    <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
            )}
            <Row className="crypto-card-container" gutter={[32, 32]}>
                {crypto?.map((currency) => (
                    <Col key={currency.uuid} className="crypto-card" xs={24} sm={12} lg={6}>
                    <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                        <Card
                            hoverable
                            extra={<img className="crypto-image" alt="example" src={currency.iconUrl} />}
                            title={`${currency.rank}. ${currency.name}`}>
                            <p>Price: {millify(currency.price)}</p>
                            <p>Market Cap: {millify(currency.marketCap)}</p>
                            <p>Daily Change: {millify(currency.change)}</p>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
        </>
    )
}

export default Cryptocurrency