import React, {useState, useEffect} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner'; 
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = ({ country = 'us', pageSize = 15, category = 'general', apiKey, setProgress}) => {
    
    const [totalCount, setTotalCount] = useState(0);
    const[counter,setCounter] = useState(1)

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async()=>{
        setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
        setLoading(true)
        let data = await fetch(url);
        setProgress(30)
        let parsedData = await data.json()
        setProgress(70)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        setTotalCount(Math.ceil(parsedData.totalResults/pageSize))
        setProgress(100)
    }

    useEffect(()=>{
        document.title = `${category.charAt(0).toUpperCase() + category.slice(1)} - NewsSphere`
        updateNews()
    },[])

    const handlePrevClick = async()=>{
        setPage(page - 1)
        updateNews()
    }
    const handleNextClick = async()=>{
        setPage(page + 1)
        updateNews()
    }

    const fetchMoreData = async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page+1}&pageSize=${pageSize}`
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setCounter(counter + 1)
    }

  
    return (
      <>
        <h2 className="text-center mb-4" style={{margin:'75px 0px 35px 0px'}}>NewsSphere - Top {category.charAt(0).toUpperCase() + category.slice(1)} Headlines</h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={counter <= totalCount}
          loader={<Spinner/>}
        >
        <div className="container">
            <div className="row g-4">  
                {articles.map((element,index)=>{
                    return <div className="col-md-4" key={index}>
                        <NewsItem title={element.title ?element.title.slice(0,45) : ""} description={element.description ? element.description.slice(0,90) : ""} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} sourceName={element.source.name}/>
                    </div>
                })}
            </div>
        </div>
        </InfiniteScroll>
      </>
    )
}

// News.defaultProps = {
//     country: 'us',
//     pageSize: 15,
//     category: 'general'
// }

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}


export default News;


