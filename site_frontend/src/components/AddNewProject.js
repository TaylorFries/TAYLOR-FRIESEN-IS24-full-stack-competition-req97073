import React from "react";

const AddNewProject = (handleAddFormChange) => {
    return(
        <>
            <h2>Add a New Product</h2>
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
        </>
    );
};

export default AddNewProject;