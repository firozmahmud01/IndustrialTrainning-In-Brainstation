import { Button, Card, CardContent, CardMedia, Grid, Rating, Skeleton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { getsearch, hostname } from './AllApi';





function BabyFoodItem({id,name,prize,rating,img}){
    
  return(
      <Card onClick={()=>{document.location="/product/details?p="+id}}
       sx={{ maxWidth: 250,cursor: 'pointer' }}>
          <CardMedia
          sx={{ height: 130 }}
          image={img}
          title="name"
          
          />
<CardContent>
  <Grid container>
      <Grid item xs={12}>
  <Typography variant='h6'>{name}</Typography>
  </Grid>
  <Grid item xs={6}>
  <Typography variant='body2'>{prize} ৳</Typography>
  </Grid>
  <Grid xs={6} item>
      <Typography sx={{textAlign:'right'}}>{rating} ★</Typography>
  </Grid>
  </Grid>
</CardContent>
      </Card>
  )
}



function ProductList(products) {
  
if(!products)return [];
  return products.map((product) => (
    <Grid xs={3} ms={2} key={product.id}>
    <BabyFoodItem
    id={product.id}
      name={product.name}
      prize={product.prize}
      img={hostname+'/images/'+product.img}
      rating={product.rating}
    />
    </Grid>
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
    
    setLoading(true);
    getsearch(q,page)
      .then((data) => {
        console.log(data)
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
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          {ProductList(results)}
          </Grid>
          
      )}
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}

