import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };
  document.title = `${capitalizeFirstLetter(props.category)} | MG`;

  useEffect(() => {
    updateNews();
  }, []);

  const handlePrevClick = async () => {
    setPage(page - 1);
    updateNews();
  };
  const handleNextClick = async () => {
    setPage(page + 1);
    updateNews();
  };

  return (
    <>
      <div className="container my-3">
        <h1 id="top-headline" className="text-center">
          Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        {loading && <Spinner />}
        <div className="row">
          {articles &&
            !loading &&
            articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageURL={element.urlToImage}
                    url={element.url}
                    date={element.publishedAt}
                    author={
                      element.source.name.length > 40
                        ? element.source.name.slice(0, 35) + "..."
                        : element.source.name
                    }
                  />
                </div>
              );
            })}
        </div>
        <br />
        <div className="d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
            disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </>
  );
};

export default News;

News.defaultProps = {
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
