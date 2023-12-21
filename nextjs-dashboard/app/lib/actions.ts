'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({ invalid_type_error: 'Please select a customer.', }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], { invalid_type_error: 'Please select an invoice status.', }),
    date: z.string(),
});

const CustomerFormSchema = z.object({
    customerGivenName: z.string({ invalid_type_error: 'Please enter your given name', }),
    customerFamilyName: z.string({ invalid_type_error: 'Please enter your family name.', }),
    customerEmail: z.string({ invalid_type_error: 'Please enter your email.', }),
    customerAddress: z.string({ invalid_type_error: 'Please enter your address.', }),
    customerCity: z.string({ invalid_type_error: 'Please enter your city.', }),
    customerState: z.string({ invalid_type_error: 'Please enter your state.', }),
    customerPostcode: z.string({ invalid_type_error: 'Please enter your postcode.', }),
    customerCountry: z.string({ invalid_type_error: 'Please enter your country.', }),
    customerPaymentMethod: z.string({ invalid_type_error: 'Please select a payment method.', }),
});

const CreateCustomer = CustomerFormSchema;

export type CustomerState = {
    errors?: {
        customerGivenName?: string[];
        customerFamilyName?: string[];
        customerEmail?: string[];
        customerAddress?: string[];
        customerCity?: string[];
        customerState?: string[];
        customerPostcode?: string[];
        customerCountry?: string[];
        customerPaymentMethod?: string[];
    };
    message?: string | null;
};

export async function createCustomer(prevState: CustomerState, formData: FormData) {

    console.log('hi');
    // Validate form fields using Zod
    const validatedFields = CreateCustomer.safeParse({
        customerGivenName: formData.get('customerGivenName'),
        customerFamilyName: formData.get('customerFamilyName'),
        customerEmail: formData.get('customerEmail'),
        customerAddress: formData.get('customerAddress'),
        customerCity: formData.get('customerCity'),
        customerState: formData.get('customerState'),
        customerPostcode: formData.get('customerPostcode'),
        customerCountry: formData.get('customerCountry'),
        customerPaymentMethod: formData.get('customerPaymentMethod'),
    });
    console.log(validatedFields);


    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        // console.log(validatedFields);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Please enter required billing information.',
        };
    }

    // Prepare data for insertion into the database
    const { customerGivenName, customerFamilyName, customerAddress, customerEmail, customerCity, customerState, customerPostcode, customerCountry, customerPaymentMethod } = validatedFields.data;

    // Create the table if it does not exist
    await sql`
        CREATE TABLE IF NOT EXISTS billing_info (
        id SERIAL PRIMARY KEY,
        customer_given_name VARCHAR(255),
        customer_family_name VARCHAR(255),
        customer_address VARCHAR(255),
        customer_email VARCHAR(255),
        customer_city VARCHAR(255),
        customer_state VARCHAR(255),
        customer_postcode VARCHAR(255),
        customer_country VARCHAR(255),
        customer_payment_method VARCHAR(255)
        );
    `;
    console.log('table created')

    // Insert data into the database
    try {
        await sql`
        INSERT INTO billing_info (customer_given_name, customer_family_name, customer_address, customer_email, customer_city, customer_state, customer_postcode, customer_country, customer_payment_method)
        VALUES (${customerGivenName}, ${customerFamilyName}, ${customerAddress}, ${customerEmail}, ${customerCity}, ${customerState}, ${customerPostcode}, ${customerCountry}, ${customerPaymentMethod})
      `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Complete Transaction.',
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/store');
    redirect('/dashboard/store');
}

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        // console.log(validatedFields);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    // Insert data into the database
    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// ...

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        // console.log(validatedFields);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await sql`
          UPDATE invoices
          SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
          WHERE id = ${id}
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }
}


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}