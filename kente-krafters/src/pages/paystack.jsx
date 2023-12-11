import React, { useState } from 'react';
import PaystackPop from '@paystack/inline-js';

const PaystackIntegration = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const paywithpaystack = (e) => {
    e.preventDefault();
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_e65c34966f0295eefd5c59b717cc0ff04793eb58",
      amount: amount * 100,
      email,
      firstname,
      lastname,
      onSuccess: (transaction) => {
        let message = `Payment Complete! Reference ${transaction.reference}`;
        alert(message);
      },
      oncancel: () => {
        alert("You have canceled the transaction");
      }
    });
  };

  return (
    <div className="w3-container">
      <form id="paymentForm" className="w3-container w3-card-4 w3-light-grey" onSubmit={paywithpaystack}>
        {/* Email Section */}
        <div className="w3-row w3-section">
          <div className="w3-col" style={{ width: '50px' }}>
            <i className="w3-xxlarge fa fa-envelope"></i>
          </div>
          <div className="w3-rest">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email-address" className="w3-input w3-border" />
            </div>
          </div>
        </div>

        {/* Amount Section */}
        <div className="w3-row w3-section">
          <div className="w3-col" style={{ width: '50px' }}>
            <i className="w3-xxlarge fa fa-dollar"></i>
          </div>
          <div className="w3-rest">
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input type="tel" value={amount} onChange={(e) => setAmount(e.target.value)} id="amount" className="w3-input w3-border" />
            </div>
          </div>
        </div>

        {/* First Name Section */}
        <div className="w3-row w3-section">
          <div className="w3-col" style={{ width: '50px' }}>
            <i className="w3-xxlarge fa fa-user"></i>
          </div>
          <div className="w3-rest">
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} id="first-name" className="w3-input w3-border" />
            </div>
          </div>
        </div>

        {/* Last Name Section */}
        <div className="w3-row w3-section">
          <div className="w3-col" style={{ width: '50px' }}>
            <i className="w3-xxlarge fa fa-user"></i>
          </div>
          <div className="w3-rest">
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} id="last-name" className="w3-input w3-border" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w3-row w3-section">
          <div className="w3-col" style={{ width: '50px' }}></div>
          <div className="w3-rest">
            <button type="submit" className="w3-button w3-section w3-blue w3-ripple">
              Submit Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaystackIntegration;
