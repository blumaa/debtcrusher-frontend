import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements'
import Checkout from './CheckoutForm'

const StripeCheckout = () => {
  return (
      <div className="ui main">
        <Checkout />
      </div>
  );
};

export default StripeCheckout;
