import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch, currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const handleAllocationChange = (name, type) => {
        dispatch({
            type: type,
            payload: {
                name: name,
                cost: 10,
            }
        });
    }

    return (
        <tr>
            <td>{props.name}</td>
            <td>{currency}{props.cost}</td>
            <td>
                <button 
                    className="btn btn-success rounded-circle"
                    onClick={() => handleAllocationChange(props.name, 'ADD_EXPENSE')}
                    style={{ width: '1.5em', height: '1.5em', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    +
                </button>
            </td>
            <td>
                <button 
                    className="btn btn-danger rounded-circle"
                    onClick={() => handleAllocationChange(props.name, 'RED_EXPENSE')}
                    style={{ width: '1.5em', height: '1.5em', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    -
                </button>
            </td>
            <td>
                <TiDelete 
                    size='1.5em' 
                    onClick={handleDeleteExpense}
                    className="text-danger"
                    style={{ cursor: 'pointer' }}
                />
            </td>
        </tr>
    );
};

export default ExpenseItem;
