class APiUtils {
    private apiContext: any; // Adjust the type according to the actual type of apiContext
    private loginPayload: any; // Adjust the type according to the structure of the login payload

    constructor(apiContext: any, loginPayload: any) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(): Promise<string> {
        try {
            // Makes a POST request to the login endpoint with the provided login payload.
            const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
                data: this.loginPayload
            });

            if (!loginResponse.ok()) {
                throw new Error(`Failed to log in. Status: ${loginResponse.status()}, ${await loginResponse.text()}`);
            }

            // Parses the JSON response from the login request.
            const loginResponseJson = await loginResponse.json();

            // Extracts the token from the login response.
            const token = loginResponseJson.token;
            console.log(token);

            // Returns the token.
            return token;
        } catch (error) {
            console.error('Error while fetching token:', error.message);
            throw error;
        }
    }

    async createOrder(orderPayload: any): Promise<any> {
        let response: any = {};
        // Get the authentication token.
        response.token = await this.getToken();
        // Make a POST request to create an order, including the order payload and the authorization token in the request headers.
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            },
        });

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);

        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
}
export { APiUtils }
