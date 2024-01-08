import React, { useEffect } from 'react';

const PayPalWidget = ({ walletToken }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.preproduction.powerboard.commbank.com.au/sdk/latest/widget.umd.js';
    script.async = true;
    script.onload = () => {
      // Initialize PayPal widget after script is loaded
      const button = new cba.WalletButtons("#widget-paypal", walletToken, {
        amount_label: "Payment Amount",
        country: "AU",
        request_shipping: true,
        pay_later: true,
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'pill',
          tagline: false,
          label: '',
        },
      });

      button.setEnv('preproduction_cba');
      button.onUnavailable(() => console.log("No wallet buttons available"));
      button.onPaymentSuccessful((data) => console.log("Payment Successful", data));
      button.onPaymentError((data) => console.log("The payment was not successful", data));
      button.onPaymentInReview((data) => console.log("The payment is on fraud review", data));
      button.load();
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script when the component unmounts
      document.body.removeChild(script);
    };
  }, [walletToken]);

  return <div id="widget-paypal"></div>;
};

export default PayPalWidget;
