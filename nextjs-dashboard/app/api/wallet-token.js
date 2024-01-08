const createWalletTokenRequest = async (
    amount,
    reference,
    firstName,
    lastName,
    email,
    gateway_id,
    secret_key
) => {
    let responseData;
    try {
        const apiUrl =
            'https://api.preproduction.powerboard.commbank.com.au/v1/charges/wallet';

        const requestBody = {
            amount: amount,
            currency: 'AUD',
            reference: reference,
            customer: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                payment_source: {
                    gateway_id: gateway_id,
                },
            },
        };

        const headers = new Headers();
        headers.append('x-user-secret-key', secret_key);
        headers.append('Content-Type', 'application/json');

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        responseData = await response.json();
    } catch (error) {
        // Handle errors, log, or throw further if needed
        console.error('Error posting charge to PowerBoard:', error);
        throw error;
    }
    return responseData.resource.data.token;
};

export default createWalletTokenRequest;
