'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCustomer } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCustomer, initialState);

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
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
