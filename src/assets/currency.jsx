import React, { useState, useEffect } from 'react';

// Your API key and base URL
const API_KEY = '6f8a0d098ee50465723da511';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;


function CurrencyConverter() {
  // State variables
  const [amount, setAmount] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [conversionRates, setConversionRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch exchange rates when baseCurrency changes
  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/latest/${baseCurrency}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.result === 'success') {
          setConversionRates(data.conversion_rates);
        } else {
          throw new Error('API returned an error.');
        }
      } catch (err) {
        setError(err.message);
        setConversionRates({});
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency]); // Re-run when baseCurrency changes

  // Calculate the converted amount
  const getConvertedAmount = () => {
    if (!conversionRates[targetCurrency]) return 0;
    const rate = conversionRates[targetCurrency];
    return amount * rate;
  };
  
  // Get list of currency codes from the API response
  const currencyCodes = Object.keys(conversionRates);
 

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Currency Converter</h2>
      
      {/* Display loading or error state */}
      {loading && <p>Loading rates...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Amount Input */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="amount">Amount: </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      {/* From Currency Selection */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="from">From: </label>
        <select
          id="from"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          
        >
       
          {currencyCodes.map((code) => (
            <option key={code} value={code}>
              {code}
              
            </option>
          ))}
          
        </select>
      </div>

      {/* To Currency Selection */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="to">To: </label>
        <select
          id="to"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        >
          {currencyCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      {/* Display Result */}
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
        {amount} {baseCurrency} = {getConvertedAmount().toFixed(4)} {targetCurrency}
        
      </div>
      
    </div>
    
  );
}

export default CurrencyConverter;