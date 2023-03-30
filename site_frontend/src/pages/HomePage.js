import { useState, useEffect, Fragment } from "react";
import { nanoid } from 'nanoid';
import axios from 'axios';
//import products from "./product-content.json";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditRow from "../components/EditRow";

const HomePage = () => {
    //used to get product data from file
    const [productData, setProducts] = useState([]);

    //used to save the state when trying to add a product
    const [addFormData, setAddFormData] = useState({
        productName: '',
        productOwnerName: '',
        Developers: '',
        scrumMasterName: '',
        startDate: '',
        methodology: ''
    });

    //used to save the state when editing a product
    const [editFormData, setEditFormData] = useState({
        productName: '',
        productOwnerName: '',
        Developers: '',
        scrumMasterName: '',
        startDate: '',
        methodology: ''
    });

    //state for showing regular row or editable row
    const [editProductId, setEditProductId] = useState(null);

    //function to keep track of changes to edit row
    const handleAddFormChange = (event) => {
        event.preventDefault();
        //get the name of the field we changed
        const fieldName = event.target.getAttribute('name');
        //get the value that it was changed to 
        const fieldValue = event.target.value;

        //hold the state as it was to not overwrite it
        const newFormData = { ...addFormData };
        //create new state with updated field in place
        newFormData[fieldName] = fieldValue;

        //save the change
        setAddFormData(newFormData);
    };


    const handleLoadClick = () => {
        const url = 'http://localhost:8000/api/read';
        axios.post(url)
        .then((res) => {
            const jsonIn = JSON.parse(res.data);
            setProducts(jsonIn);
        });
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        //get the name of the field we changed and what it was changed to
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        //copy old state make update to field that needs updating
        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        //set it in place
        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        const newProduct = {
            productId: nanoid(),
            productName: addFormData.productName,
            productOwnerName: addFormData.productOwnerName,
            Developers: addFormData.Developers,
            scrumMasterName: addFormData.scrumMasterName,
            startDate: addFormData.startDate,
            methodology: addFormData.methodology
        };

        const newProducts = [...productData, newProduct];
        setProducts(newProducts);
        addProduct(newProduct);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedProduct = {
            productId: editProductId,
            productName: editFormData.productName,
            productOwnerName: editFormData.productOwnerName,
            Developers: editFormData.Developers,
            scrumMasterName: editFormData.scrumMasterName,
            startDate: editFormData.startDate,
            methodology: editFormData.methodology
        }

        const newProducts = [...productData];

        const index = productData.findIndex((product) => product.productId === editProductId)

        newProducts[index] = editedProduct;

        setProducts(newProducts);
        setEditProductId(null);
        updateJson(newProducts);
    }

    const handleEditClick = (event, product) => {
        event.preventDefault();
        setEditProductId(product.productId);

        const formValues = {
            productName: product.productName,
            productOwnerName: product.productOwnerName,
            Developers: product.Developers,
            scrumMasterName: product.scrumMasterName,
            startDate: product.startDate,
            methodology: product.methodology
        }

        setEditFormData(formValues);
    };

    const handleDeleteClick = (productId) => {
        const newProducts = [...productData];
        const index = productData.findIndex((curProduct) => curProduct.productId === productId);

        newProducts.splice(index, 1);

        setProducts(newProducts);
        deleteProduct(productId);
    }

    const deleteProduct = (productId) => {
        const url = `http://localhost:8000/api/product/${productId}`;
        axios.delete(url)
        .then(response => {
            console.log("Status of DELETE: ", response.status);
        });
    };

    const addProduct = (product) => {
        const url = `http://localhost:8000/api/product`;
        axios.put(url, product)
        .then(response => {
            console.log("Status of PUT", response.status);
        });
    };

    const updateJson = (products) => {
        const url = 'http://localhost:8000/api/update';
        axios.post(url, products)
        .then(response => {
            console.log("This is the response", response);
        });
    };

    return (
        <>
        <button onClick={() => handleLoadClick()}>Load Products</button>
            <div className="App">
                <h2>Add a New Product</h2>
                <form onSubmit={handleAddFormSubmit}>
                    <input
                        type="text"
                        name="productName"
                        required="required"
                        placeholder="Product Name"
                        onChange={handleAddFormChange}
                    />
                    <input
                        type="text"
                        name="productOwnerName"
                        required="required"
                        placeholder="Product Owner Name"
                        onChange={handleAddFormChange}
                    />
                    <input
                        type="text"
                        name="Developers"
                        required="required"
                        placeholder="Developers (sep by ',')"
                        onChange={handleAddFormChange}
                    />
                    <input
                        type="text"
                        name="scrumMasterName"
                        required="required"
                        placeholder="Scrum Master Name"
                        onChange={handleAddFormChange}
                    />
                    <input
                        type="text"
                        name="startDate"
                        required="required"
                        placeholder="Start Date (YYYY/MM/DD)"
                        onChange={handleAddFormChange}
                    />
                    <input
                        type="text"
                        name="methodology"
                        required="required"
                        placeholder="Methodology"
                        onChange={handleAddFormChange}
                    />
                    <button type="submit">Add</button>
                </form>
                <h2>List of Products. Total Products: {productData.length}</h2>
                <form onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Owner</th>
                                <th>Developers</th>
                                <th>Scrum Master</th>
                                <th>Start Date</th>
                                <th>Methodology</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productData.map((val, ) => (
                                <Fragment>
                                    {editProductId === val.productId ? (
                                        <EditRow //key={}
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            val={val}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
}

export default HomePage;