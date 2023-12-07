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
    <div className="position-relative mx-auto bg-lighter-green rounded" style={{ maxWidth: '200px' }} ref={wrapperRef}>
    <div 
      className="currency-select-label d-block text-white rounded py-2 text-center cursor-pointer"
      onClick={toggleDropdown}
    >
      Currency ({currency} {currencyName})
    </div>
    {isOpen && (
      <div className="bg-lighter-green currency-options position-absolute w-100 mt-1 rounded zindex-dropdown border border-dark">
           {Object.entries(currencies).map(([curSymbol, curName]) => (
            <div
              key={curSymbol}
              className={`py-2 px-3 cursor-pointer ${currency === curSymbol ? 'bg-white' : ''}`}
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
