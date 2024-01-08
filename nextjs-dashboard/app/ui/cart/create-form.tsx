'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCustomer } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Email, LocationOn, LocationCity, Flag, Map } from '@mui/icons-material';
import PayPalIcon from '@/app/components/Icons/PayPalIcon';
import AfterPayIcon from '@/app/components/Icons/AfterPayIcon';
// import CreditCardIcon from '@/app/components/Icons/CreditCardIcon';
// import CreditCardIcon2 from '@/app/components/Icons/CreditCardIcon2';
import CreditCardIcon3 from '@/app/components/Icons/CreditCardIcon3';
import { PaymentMethods } from '@/app/components/Enums';
import React, { useState, useEffect } from 'react';
import PowerBoardWidget from '@/app/ui/cart/power-board-widget';

declare var cba: any; // Declare 'cba' variable


export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCustomer, initialState);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentMethodChange = (event: { target: { value: any; }; }) => {
    const newValue = event.target.value;
    console.log('Selected Payment Method:', newValue);
    setSelectedPaymentMethod(newValue);

    // if (newValue === PaymentMethods.CREDIT_CARD) {
    //   console.log('hello')
    // }
  };

  useEffect(() => {
    // Dynamically create script tag for PowerBoard Widget
    const script = document.createElement('script');
    script.src = 'https://widget.preproduction.powerboard.commbank.com.au/sdk/latest/widget.umd.js';
    script.async = true;

    script.onload = () => {
      // Code to execute after the script is loaded
      var widget = new cba.HtmlWidget("#widget", process.env.NEXT_PUBLIC_POWERBOARD_PUBLIC_KEY, process.env.NEXT_PUBLIC_POWERBOARD_GATEWAY_ID);

      widget.onFinishInsert('input[name="payment_source"]', "payment_source");
      widget.setEnv("preproduction_cba");
      widget.useAutoResize();
      widget.setTexts({ submit_button: "Submit Card" });
      widget.setStyles({
        background_color: "#FFFFFF",
        border_color: "#000000",
        button_color: "#000000"
      });

      widget.load();

      widget.on("finish", function (data: any) {
        console.log("Widget Response", data);
      });
    };

    // Append the script tag to the document body
    document.body.appendChild(script);

    // Clean up function to remove the script tag on component unmount (optional)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // useEffect(() => {
  //   if (selectedPaymentMethod === PaymentMethods.CREDIT_CARD) {
  //     console.log('hello');

  //     // Dynamically create script tag for PowerBoard Widget
  //     const script = document.createElement('script');
  //     script.src = 'https://widget.preproduction.powerboard.commbank.com.au/sdk/latest/widget.umd.js';
  //     script.async = true;

  //     script.onload = () => {
  //       // Code to execute after the script is loaded
  //       const widget = new cba.HtmlWidget("#widget", "", "");

  //       widget.onFinishInsert('input[name="payment_source"]', "payment_source");
  //       widget.setEnv("preproduction_cba");
  //       widget.useAutoResize();
  //       widget.setTexts({submit_button: "Submit Card"});
  //       widget.setStyles({background_color: "#FFFFFF", border_color: "#000000", button_color: "#000000"});

  //       widget.load();

  //       widget.on("finish", function(data: any) { console.log("Widget Response", data); });
  //     };

  //     // Append the script tag to the document body
  //     document.body.appendChild(script);

  //     // Clean up function to remove the script tag on component unmount (optional)
  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   }
  // }, [selectedPaymentMethod]);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Given Name */}
        <div className="mb-4 flex justify-between gap-10">
          <div className="flex-grow">
            <label htmlFor="customerGivenName" className="mb-2 block text-sm font-medium">
              Given Name
            </label>
            <div className="relative">
              <input
                id="customerGivenName"
                name="customerGivenName"
                type="string"
                placeholder="Enter given name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-given-name-error"
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="customer-given-name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.customerGivenName &&
                state.errors.customerGivenName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* </div> */}
          {/* Customer Family Name */}
          {/* <div className="mb-4"> */}
          <div className="flex-grow">
            <label htmlFor="customerFamilyName" className="mb-2 block text-sm font-medium">
              Family Name
            </label>
            <div className="relative">
              <input
                id="customerFamilyName"
                name="customerFamilyName"
                type="string"
                placeholder="Enter family name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-family-name-error"
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="customer-family-name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.customerFamilyName &&
                state.errors.customerFamilyName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Customer Email */}
        <div className="mb-4">
          <label htmlFor="customerEmail" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <input
              id="customerEmail"
              name="customerEmail"
              type="string"
              placeholder="Enter email"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="customer-email-error"
              required
            />
            <Email className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerEmail &&
              state.errors.customerEmail.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Customer Address */}
        <div className="mb-4">
          <label htmlFor="customerAddress" className="mb-2 block text-sm font-medium">
            Address
          </label>
          <div className="relative">
            <input
              id="customerAddress"
              name="customerAddress"
              type="string"
              placeholder="Enter address"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="customer-address-error"
              required
            />
            <LocationOn className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-address-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerAddress &&
              state.errors.customerAddress.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Customer City */}
        <div className="mb-4 flex justify-between gap-10">
          <div className="flex-grow">
            <label htmlFor="customerCity" className="mb-2 block text-sm font-medium">
              City
            </label>
            <div className="relative">
              <input
                id="customerCity"
                name="customerCity"
                type="string"
                placeholder="Enter city"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-city-error"
                required
              />
              <LocationCity className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="customer-city-error" aria-live="polite" aria-atomic="true">
              {state.errors?.customerCity &&
                state.errors.customerCity.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Customer State */}
          <div className="flex-grow">
            <label htmlFor="customerState" className="mb-2 block text-sm font-medium">
              State
            </label>
            <div className="relative">
              <input
                id="customerState"
                name="customerState"
                type="string"
                placeholder="Enter state"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-state-error"
                required
              />
              <Map className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="customer-state-error" aria-live="polite" aria-atomic="true">
              {state.errors?.customerState &&
                state.errors.customerState.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>


          {/* Customer Postcode */}
          <div className="flex-grow">
            <label htmlFor="customerPostcode" className="mb-2 block text-sm font-medium">
              Postcode
            </label>
            <div className="relative">
              <input
                id="customerPostcode"
                name="customerPostcode"
                type="string"
                placeholder="Enter postcode"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-postcode-error"
                required
              />
              <LocationOn className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="customer-postcode-error" aria-live="polite" aria-atomic="true">
              {state.errors?.customerPostcode &&
                state.errors.customerPostcode.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Customer Country */}
          <div className="flex-grow">
            <label htmlFor="customerCountry" className="mb-2 block text-sm font-medium">
              Country
            </label>
            <div className="relative">
              <input
                id="customerCountry"
                name="customerCountry"
                type="string"
                placeholder="Enter country"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-country-error"
                required
              />
              <Flag className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="customer-country-error" aria-live="polite" aria-atomic="true">
              {state.errors?.customerCountry &&
                state.errors.customerCountry.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
        <legend className="mb-2 block text-sm font-medium">
          Pay with:
        </legend>
        <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                id="creditCard"
                name="customerPaymentMethod"
                type="radio"
                value="creditCard"
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                aria-describedby="payment-error"
                onChange={handlePaymentMethodChange}
                required
              />
              <label
                htmlFor="pending"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
              >
                Credit Card <CreditCardIcon3 />
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="payPal"
                name="customerPaymentMethod"
                type="radio"
                value="payPal"
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                aria-describedby="payment-error"
                onChange={handlePaymentMethodChange}
                required
              />
              <label
                htmlFor="paid"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-[#FFC641] px-3 py-1.5 text-xs font-bold italic text-[#08378B]"
              >
                <div style={{ display: 'flex' }}>
                  <span className="text-[#08378B]" >Pay</span>
                  <span style={{ color: '#279ED8' }}>Pal</span>
                </div>
                <PayPalIcon />
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="afterPay"
                name="customerPaymentMethod"
                type="radio"
                value="afterPay"
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                aria-describedby="payment-error"
                onChange={handlePaymentMethodChange}
                required
              />
              <label
                htmlFor="paid"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-black"
              >
                afterpay <AfterPayIcon />
              </label>
            </div>
          </div>
        </div>
        </div>
        {/* Credit Card Widget */}
        <div className="mb-4">
          <label htmlFor="creditCardWidget" className="mb-2 block text-sm font-medium">
            Credit/Debit Card
          </label>
          <PowerBoardWidget publicKey={process.env.NEXT_PUBLIC_POWERBOARD_PUBLIC_KEY} gatewayId={process.env.NEXT_PUBLIC_POWERBOARD_GATEWAY_ID} />
        </div>
        {/* Form Error */}
        <fieldset aria-describedby="form-error">
          <div id="payment-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerPaymentMethod &&
              state.errors.customerPaymentMethod.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500" key={state.message}>
              {state.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/store"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Submit Billing Info</Button>
      </div>
    </form>
  );
}
