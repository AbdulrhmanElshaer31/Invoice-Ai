"use server";

// Login function that calls the API
export async function Login(email, password) {
  const loginUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Account/Login`;
  
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({    
        "username": email,
        "password": password
      })
    });

    // Parse response even if not ok to get error messages
    const result = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        data: null,
        messages: result.messages || ["Login failed. Please check your credentials."]
      };
    }
    
    // Return success response
    return {
      data: result.data,
      success: result.isSuccess,
      messages: result.messages || []
    };
    
  } catch (err) {
    console.error("Login error:", err);
    return {
      success: false,
      data: null,
      messages: ["Connection error. Please try again."]
    };
  }
}