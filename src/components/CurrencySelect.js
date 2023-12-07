import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencySelect = () => {
  const { currency, dispatch } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleCurrencyChange = (cur) => {
    dispatch({ type: 'CHG_CURRENCY', payload: cur });
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    console.log(currency);
  }, [currency]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const currencies = {
    "$": "Dollar",
    "£": "Pound",
    "€": "Euro",
    "₹": "Rupee"
  };

  const currencyName = currencies[currency];
  
  return (
    <div className="currency-select-container" ref={wrapperRef}>
      <div className="currency-select-label" onClick={toggleDropdown}>
        Currency ({currency} {currencyName})
        <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
      </div>
      {isOpen && (
        <div className="currency-options">
          {Object.entries(currencies).map(([curSymbol, curName]) => (
            <div
              key={curSymbol}
              className={`currency-option ${currency === curSymbol ? 'selected' : ''}`}
              onClick={() => handleCurrencyChange(curSymbol)}
            >
              {curSymbol} {curName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelect;
