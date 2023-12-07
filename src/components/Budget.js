import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, dispatch, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);

    const handleBudgetChange = (event) => {
        setNewBudget(event.target.value);
    };

    const handleBudgetBlur = () => {
        const value = parseInt(newBudget, 10);

        if (value > 20000) {
            alert("Budget cannot exceed £20,000");
            setNewBudget(budget);
            return;
        }

        if (value < totalExpenses) {
            alert("Budget cannot be lower than the total expenses");
            setNewBudget(budget);
            return;
        }

        dispatch({ type: 'SET_BUDGET', payload: value });
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}{budget}</span>
            <input 
                type="number" 
                step="10" 
                value={newBudget} 
                onChange={handleBudgetChange}
                onBlur={handleBudgetBlur}
            />
        </div>
    );
};

export default Budget;
