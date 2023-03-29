import React from 'react';

const ReadOnlyRow = ({ val, handleEditClick, handleDeleteClick}) => {
    return(
        <tr>
            <td>{val.productName}</td>
            <td>{val.productOwnerName}</td>
            <td>{val.Developers}</td>
            <td>{val.scrumMasterName}</td>
            <td>{val.startDate}</td>
            <td>{val.methodology}</td>
            <td>
                <button type="button" onClick={(event) => handleEditClick(event, val)}>Edit</button>
                <button type="button" onClick={() => handleDeleteClick(val.productId)}>Delete</button>
            </td>
        </tr>
    );
};

export default ReadOnlyRow;