import React from 'react';

//this component is used when we want to show the row containing data 
// for our product

const ReadOnlyRow = ({ val, handleEditClick, handleDeleteClick}) => {
    var devs = val.Developers;
    return(
        <tr>
            <td>{val.productName}</td>
            <td>{val.productOwnerName}</td>
            <td>
                <ul>
                    {devs.map(function(name, i){
                        return <li key={i}>{name}</li>
                    })}
                </ul>
            </td>
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