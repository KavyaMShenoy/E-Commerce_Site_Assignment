import { Link } from 'react-router-dom';

import { Card, Button } from 'react-bootstrap';

import "../css/ProductCard.css";

function ProductCard(productDetails) {

    const product = productDetails["product"][0];

    const handleAdd = () => {
        if (productDetails["product"][1] === "products") {
            productDetails["product"][2](product);
        }
    };

    const handleEdit = () => {
        if (productDetails["product"][1] === "admin") {
            productDetails["product"][2](product);
        }
    };

    const handleDelete = () => {
        if (productDetails["product"][1] === "admin") {
            productDetails["product"][3](product._id);
        }
    };

    return (
        <>

            <Card style={{ backgroundColor: "lightseagreen" }} className="text-light">

                <Card.Img variant="top" src={product.imageURL} alt={product.name} />

                <Card.Body >
                    {(productDetails["product"][1] === "products") ? (
                        <Link to={`/details/${product._id}`} className="card-link" style={{ color: 'white' }}>
                            <Card.Title>{product.name}</Card.Title>
                        </Link>) :
                        (<Card.Title>{product.name}</Card.Title>
                        )}

                    <Card.Text>
                        <span>Rs {product.price}</span>
                        <br />
                        <span>
                            {product.description}
                        </span>
                    </Card.Text>

                    {
                        (productDetails["product"][1] === "products") &&
                        <Button variant="light" style={{ color: "teal" }} onClick={handleAdd}>Add to Cart</Button>
                    }

                    {
                        (productDetails["product"][1] === "admin") &&
                        <div>
                            <Button variant="primary" className="m-3 text-light" style={{ color: "white" }} onClick={handleEdit}>Edit Product</Button>
                            <Button variant="danger" className="text-light" onClick={handleDelete}>Delete Product</Button>
                        </div>
                    }
                </Card.Body>
            </Card>
        </>
    )
}

export default ProductCard;