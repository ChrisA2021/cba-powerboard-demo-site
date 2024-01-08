import React, { useEffect } from 'react';

const PowerBoardWidget = ({ publicKey, gatewayId }) => {
  useEffect(() => {
    // Dynamically create script tag for PowerBoard Widget
    const script = document.createElement('script');
    script.src = 'https://widget.preproduction.powerboard.commbank.com.au/sdk/latest/widget.umd.js';
    script.async = true;

    script.onload = () => {
      // Code to execute after the script is loaded
      var widget = new cba.HtmlWidget("#widget", publicKey, gatewayId);

      widget.onFinishInsert('input[name="payment_source"]', "payment_source");
      widget.setEnv("preproduction_cba");
      widget.useAutoResize();
      widget.setTexts({ submit_button: "Submit Card" });
      widget.setStyles({ background_color: "#FFFFFF", border_color: "#000000", button_color: "#000000" });

      widget.load();

      widget.on("finish", function (data) {
        console.log("Widget Response", data);
      });
    };

    // Append the script tag to the document body
    document.body.appendChild(script);

    // Clean up function to remove the script tag on component unmount (optional)
    return () => {
      document.body.removeChild(script);
    };
  }, [publicKey, gatewayId]);

  return <div id="widget"></div>;
};

export default PowerBoardWidget;
