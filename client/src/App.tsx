import { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProductList, { Product } from './componenets/ProductList'
import Header from './componenets/Header'


const theme = createTheme({
  // other theme properties
});

function App() {
  const [products, setProducts] = useState<Product[]>([])


  useEffect(() => {
    fetch(`http://localhost:5050/product`)
      .then(res => res.json())
      .then(data => setProducts(data))
  })

  return (
    <ThemeProvider theme={theme}>
    <Header />
    <ProductList products={products} />
</ThemeProvider>
  )
}

export default App
