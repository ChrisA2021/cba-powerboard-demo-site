import Form from '@/app/ui/cart/create-form';
import Breadcrumbs from '@/app/ui/cart/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create Invoice',
};

export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Store', href: '/dashboard/store' },
          {
            label: 'Checkout',
            href: '/dashboard/checkout',
            active: true,
          },
        ]}
      />
      <Form/>
    </main>
  );
}


