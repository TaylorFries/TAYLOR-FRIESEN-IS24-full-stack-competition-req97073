import { useState, useEffect, Fragment } from "react";
import { nanoid } from 'nanoid';
import axios from 'axios';
//import products from "./product-content.json";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditRow from "../components/EditRow";

const HomePage = () => {
    const address = "0.0.0.0";

    //used to get product data from file
    const [productData, setProducts] = useState([]);

    //used to save the state when trying to add a product
    const [addFormData, setAddFormData] = useState({
        productName: '',
        productOwnerName: '',
        Developers: [],
        scrumMasterName: '',
        startDate: '',
        methodology: ''
    });

    //used to save the state when editing a product
    const [editFormData, setEditFormData] = useState({
        productName: '',
        productOwnerName: '',
        Developers: [],
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

    //used to keep track of changes made in edit form
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

    //used to add a new product to the list in front end and send req to backend
    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        //sep the list into a list
        var devList = addFormData.Developers.split(',');
        //define a new product with values in the form field
        const newProduct = {
            productId: nanoid(),
            productName: addFormData.productName,
            productOwnerName: addFormData.productOwnerName,
            Developers: devList,
            scrumMasterName: addFormData.scrumMasterName,
            startDate: addFormData.startDate,
            methodology: addFormData.methodology
        };

        //make a new list with copy of old list and new item at end
        const newProducts = [...productData, newProduct];
        //update the state
        setProducts(newProducts);
        //send update to backend to update "database"
        addProduct(newProduct);
    };

    //used when edits to product are submitted
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        //get the list (no change to devs) or string (devs were changed) object 
        var devList = editFormData.Developers;
        if (typeof(editFormData.Developers) == 'string'){
            //if there was a change turn it back into a list
            devList = editFormData.Developers.split(',');
        }

        //var devList = editFormData.Developers.split(',');
        
        //get the form data and make a new product with it
        const editedProduct = {
            productId: editProductId,
            productName: editFormData.productName,
            productOwnerName: editFormData.productOwnerName,
            Developers: devList,
            scrumMasterName: editFormData.scrumMasterName,
            startDate: editFormData.startDate,
            methodology: editFormData.methodology
        }
        //create copy of current state
        const newProducts = [...productData];
        //get the index of the item to update
        const index = productData.findIndex((product) => product.productId === editProductId)
        //update that item to new product 
        newProducts[index] = editedProduct;
        //update state
        setProducts(newProducts);
        //turn edit row toggle off so we see read only row again
        setEditProductId(null);
        //send request to backend to update "database"
        editProduct(editProductId, editedProduct);
    }

    //used when "edit" button is selected on readonly row
    const handleEditClick = (event, product) => {
        event.preventDefault();
        //get the product ID of the product we want to edit
        setEditProductId(product.productId);
        //get the current values of each of the fields
        const formValues = {
            productName: product.productName,
            productOwnerName: product.productOwnerName,
            Developers: product.Developers,
            scrumMasterName: product.scrumMasterName,
            startDate: product.startDate,
            methodology: product.methodology
        }
        //set state for editing
        setEditFormData(formValues);
    };

    //used to handle "delete" button being pressed
    const handleDeleteClick = (productId) => {
        //make a copy of the current state
        const newProducts = [...productData];
        //get the index of the element to be deleted
        const index = productData.findIndex((curProduct) => curProduct.productId === productId);

        //splice out that element
        newProducts.splice(index, 1);

        //set state in place
        setProducts(newProducts);
        //send request to backend to remove that element from the list
        deleteProduct(productId);
    }

    //called after "delete" button is pressed and handled in FE
    const deleteProduct = (productId) => {
        //set endpoint
        const url = `http://localhost:8000/api/product/${productId}`;
        //send delete request to api
        axios.delete(url)
        .then(response => {
            //print status to console. 
            console.log("Status of DELETE: ", response.status);
        });
    };

    //used when add product button is submitted 
    const addProduct = (product) => {
        //set endpoint
        const url = `http://localhost:8000/api/product`;
        //send put request with the new product as the body
        axios.post(url, product)
        .then(response => {
            //log the status
            console.log("Status of POST", response.status);
        });
    };

    //handle editing of product based on ID
    const editProduct = (productId, product) => {
        //set endpoint
        const url = `http://localhost:8000/api/product/${productId}`;
        //send put request with product id 
        axios.put(url, product)
          .then(response => {
              console.log("Status of PUT: ", response.status);
          })

    };

    //"catch all" as I fill out the endpoints this will be used less. 
    const updateJson = (products) => {
        //set endpoint
        const url = 'http://localhost:8000/api/update';
        //send post request with the list of products
        axios.post(url, products)
        .then(response => {
            //log the response
            console.log("This is the response", response);
        });
    };

    useEffect(() => {
        const url = 'http://localhost:8000/api/load';
        axios.get(url)
          .then(response => {
                //parse the data that was sent back
                const jsonIn = JSON.parse(response.data);
                //update state of products
                setProducts(jsonIn);
          })
    }, []);

    //rendering functions
    return (
        <>
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
                            {productData.map((val ) => (
                                <Fragment>
                                    {editProductId === val.productId ? (
                                        <EditRow 
                                            key={val.productId}
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            key={val.productId}
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