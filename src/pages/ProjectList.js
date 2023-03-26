import products from './product-content'
import ProductList from '../components/ProductList';

const ProjectList = () => {
    return(
        <>
        <h1>Current Projects</h1>
        <ProductList products={products} />
        </>
    );
} 

export default ProjectList;