import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

export default async function CardWrapper() {

    const starterPackage = { price: 32, description: 'Good for sole traders, new businesses, and the self-employed.' };
    const standardPackage = { price: 65, description: 'Good for growing small businesses.' };
    const premiumPackage = { price: 85, description: 'Good for established businesses of all sizes.' };
    const ultimatePackage = { price: 115, description: 'Good for larger employers and more complex small businesses' };

    return (
        <>
            <XeroCard title="Starter" value={starterPackage} />
            <XeroCard title="Standard" value={standardPackage} />
            <XeroCard title="Premium 5" value={premiumPackage} />
            <XeroCard title="Ultimate 10" value={ultimatePackage} />
        </>
    );
}

export function XeroCard({
    title,
    value,
}: {
    title: string;
    value: { price: number; description: string };
}) {

    return (
        <Card sx={{ minWidth: 275, display: 'flex', flexDirection: 'column', }}>
            <CardContent>
                <Typography sx={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }} color="text.primary" gutterBottom>
                    {title}
                </Typography>
                <Typography sx={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center' }} color="text.primary" component="div">
                    <span style={{ fontSize: 20 }}>$</span>{value.price}
                </Typography>
                <Typography sx={{ mb: 1.5, textAlign: 'center' }} color="text.secondary">
                    AUD per month
                </Typography>
                <Typography sx={{ textAlign: 'center' }} variant="body2">
                    {value.description}
                    <br />
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', marginTop: 'auto' }}>
                <Button variant="contained" endIcon={<ShoppingCart />}   sx={{
    backgroundColor: '#19B2D6 !important', 
    '&:hover': {
      backgroundColor: '#22D3FB !important',
    },
  }}>
                    BUY NOW
                </Button>
            </CardActions>
        </Card>
    );
}
