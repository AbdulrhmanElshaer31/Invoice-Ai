// services/invoiceService.js
'use server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_USERNAME = process.env.NEXT_PUBLIC_DEFAULT_USERNAME || '';
const API_PASSWORD = process.env.NEXT_PUBLIC_DEFAULT_PASSWORD || '';
const USER_KEY = process.env.NEXT_PUBLIC_USER_KEY || '';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

// Helper function to get headers with authorization
const getHeaders = () => {
    const headers = {};

    // Add X-USER-KEY if provided
    if (USER_KEY) {
        headers['X-USER-KEY'] = USER_KEY;
    }

    // Add X-API-KEY if provided
    if (API_KEY) {
        headers['X-API-KEY'] = API_KEY;
    }

    // Add Basic Authentication if username and password are provided
    if (API_USERNAME && API_PASSWORD) {
        const credentials = btoa(`${API_USERNAME}:${API_PASSWORD}`);
        headers['Authorization'] = `Basic ${credentials}`;
    }

    // Debug: Log headers (remove in production)
    console.log('Request headers:', {
        'X-USER-KEY': USER_KEY ? '***' : 'MISSING',
        'X-API-KEY': API_KEY ? '***' : 'MISSING',
        'Authorization': API_USERNAME && API_PASSWORD ? 'Basic ***' : 'MISSING',
        'API_URL': API_BASE_URL
    });

    return headers;
};

export const uploadInvoice = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/api/v1/files/upload`, {
            method: 'POST',
            body: formData,
            // Don't set Content-Type header - browser sets it automatically with boundary
            headers: getHeaders(),
        });

        if (!response.ok) {
            // Try to get error message from response
            let errorMessage = `Upload failed: ${response.status} ${response.statusText}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
                console.error('API Error Response:', errorData);
            } catch {
                // If response is not JSON, use status text
                const errorText = await response.text().catch(() => '');
                console.error('API Error Text:', errorText);
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Upload error:', error);
        return { success: false, error: error.message };
    }
};

// export const uploadMultipleInvoices = async (files) => {
//     try {
//         const formData = new FormData();
//         Array.from(files).forEach((file) => {
//             formData.append('files', file);
//         });

//         const response = await fetch(`${API_BASE_URL}/api/invoices/upload-multiple`, {
//             method: 'POST',
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error(`Upload failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         return { success: true, data };
//     } catch (error) {
//         console.error('Upload error:', error);
//         return { success: false, error: error.message };
//     }
// };