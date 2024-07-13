import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "./utils/fetchProducts";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type Item = {
  id: number,
  name: string,
  price: number
  createdAt: string
  updatedAt: string
}

const App = () => {
  const { ref, inView } = useInView({
    threshold: 0
  });

  
  const {data, fetchNextPage, isLoading, isFetching} = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage: {
      data: Item[],
      meta: {nextPage: number}
    }) => {
      const nextPage = lastPage.meta.nextPage;
      return nextPage;
    }
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  
  if (!data) {
    return <div>Loading...</div>
  }

  const { pages } = data;

  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log(pages);

  return (
    <div
      style={{margin: '0 auto', width: '80%'}}
    >
      <h1
        style={{textAlign: 'center'}}
      >
        Infinite Scroll Example
      </h1>
      {
        pages.map((page, index) => (
          <div
            style={{border: '1px solid black', padding: '10px', margin: '10px 0'}}
            key={index}
          >
            {
              page.data.map((product: Item) => (
                <div 
                  key={product.id}
                  style={{border: '1px solid black', padding: '10px', margin: '10px 0'}}
                >
                  <h2>{product.name}</h2>
                  <p>{product.price}</p>
                </div>
              ))
            }
          </div>
        ))
      }
      <div
        ref={ref}
      >
        {isFetching && 'Loading...'}
      </div>
    </div>
  )
}

export default App;