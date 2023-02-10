import { Button, Card, CardContent, CardMedia, Rating, Skeleton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';





function ProductItem(props) {
  const { name, price, imageUrl, rating } = props;

  return (
    <Card >
      <CardMedia image={imageUrl} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Price: {price}
        </Typography>
        <Rating value={rating} readOnly />
      </CardContent>
    </Card>
  );
}



function ProductList(products) {
  

  return products.map((product) => (
    <ProductItem
      key={product.id}
      name={product.name}
      price={product.price}
      imageUrl={product.imageUrl}
      rating={product.rating}
    />
  ));
}





function SearchBar(props) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.search = `?q=${query}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleChange} />
    </form>
  );
}



function Pagination(props) {
  const { totalPages } = props;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const currentSearch = window.location.search;
    const updatedSearch = currentSearch ? `${currentSearch}&page=${page}` : `?page=${page}`;
    window.location.search = updatedSearch;
  };

  return (
    <div>
      <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button key={page} onClick={() => handlePageChange(page)}>
          {page}
        </Button>
      ))}
      <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
        Next
      </Button>
    </div>
  );
}










export default function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
    const q = searchParams.get("q") || "";
    setKeyword(q);
    const apiUrl = `/api/search?q=${q}&page=${page}`;
    setLoading(true);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <SearchBar keyword={keyword} />
      <Pagination totalPages={totalPages} currentPage={currentPage} />
      {loading ? (
        <div>
          {Array.from({ length: 10 }, (_, i) => i).map((_, i) => (
            <Skeleton key={i} style={{ margin: "10px 0" }} />
          ))}
        </div>
      ) : (
        <div>
          {results.map((result) => (
            <ProductItem key={result.id} {...result} />
          ))}
        </div>
      )}
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
