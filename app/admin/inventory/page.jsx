"use client";

import { useProducts } from "@/app/context/productContext";
import { useState } from "react";

export default function Inventory() {
    const {products, addProduct, editProduct, deleteProduct} = useProducts();

    const [newProduct, setNewProduct] = useState({
        id: '',
        name: '',
        price: ''
    });

    const handleChange = (e) => setNewProduct({
        ...newProduct,
        [e.target.name]: e.target.value
    });

    const handleAddProduct = () => {
        addProduct({
            ...newProduct, id: products.length + 1
        });
        setNewProduct({ //Resets the newProduct
            id: '',
            name: '',
            price: ''
        });
    };

    return(
        <div>
            <h1>Inventory Management</h1>
            <input name="name" placeholder="Product Name" onChange={handleChange} value={newProduct.name} />
            <input name="price" placeholder="Price" onChange={handleChange} value={newProduct.price} />
            <button onClick={handleAddProduct}>Add Product</button>
            
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                        <button onClick={() => editProduct({ ...product, name: 'New Name' })}>Edit</button>
                        {/* Para el edit se hace con un <Dialog />, como en el ejemplo de la clase */}
                        {/* Igualmente el delete, basense en el ejemplo de clase */}
                    </li>
                ))}
            </ul>
        </div>
    );
}