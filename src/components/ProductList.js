import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
    return (
        <>
        {products.map(products => (
            <Link key={products.productId} className="article-list-item" to ={`/projectList/${products.productId}`}>
                <h3>{products.productName}</h3>
            </Link>
        ))}
        </>
    )
}

export default ProductList