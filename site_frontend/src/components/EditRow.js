import React from 'react';

const EditRow = ({ editFormData, handleEditFormChange }) => {
    return (
        <tr>
            <td>
                <input
                    type="text"
                    name="productName"
                    required="required"
                    placeholder="Product Name"
                    defaultValue={editFormData.productName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    name="productOwnerName"
                    required="required"
                    placeholder="Product Owner Name"
                    defaultValue={editFormData.productOwnerName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    name="Developers"
                    required="required"
                    placeholder="Developers"
                    defaultValue={editFormData.Developers}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    name="scrumMasterName"
                    required="required"
                    placeholder="Scrum Master Name"
                    defaultValue={editFormData.productOwnerName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    name="startDate"
                    required="required"
                    placeholder="Product Name"
                    defaultValue={editFormData.startDate}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    name="methodology"
                    required="required"
                    placeholder="Methodology"
                    defaultValue={editFormData.methodology}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <button type="submit">Save</button>
            </td>
        </tr>
    );
};

export default EditRow;