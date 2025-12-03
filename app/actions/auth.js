"use server";

// Login function that calls the API
export async function Login(email, password) {
  const loginUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Account/Login`;
  
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwidHlwIjoiSldUIiwiY3R5IjoiSldUIn0.kwUIAXFpgwSjr54oxEsNnoNrNUkzS-USJJwBltdHhqDLhkT_8Pg4GB41rUavhrVIFCjGzmuTMASAi_pXhMVEbR18Sftw2yI7.HfBmqRMzxF7HEV50Rvkoyg.GklB36zZpFFBADsuAol-ooAzR34X5eOqofeRkoqx6jPfa0uz1sfPX2OS9Czk_jkW8gxxgLNeUrIxr80TKxa79LSMavYqbrvRGeTJPhEuh1KymRks9ByHiw5hV0XMWzLwxEX7z09zYlAveY1iLijTITSVCsV2nL6eFhVT3ozeeZV_OayapJfvjYgh3KrGN82_Ge9xckGYCngHDtHkG_J5eRosllrboqyorjBrFNZL1lmvvEHIfbVF6ROWDZjsvdpUPNSaQP427x_BhqpQ8yKTETS-5zCMUfMvbwMcZZbcfy2x2aIzHTLA4boK0lN7umUFOxtOMtsCB5OTj-f6Vvq060UHwEF-PHK9v3D8zGwG0otJdeyRFQWsM6h3nKdYsZdep2O87itxwaRD9pkXqs2H87IXDsRl_gbqSD99ntPsYdkRdePyeVp26AIRWAK1m4wONmzDlOAwM0nep0mowkU3XH1Og93-tdRQvyrulLYyOOUTkSvo_TvHkIWS796IkOzpn7HK4Y5ptsgJSrcmVqMrRvqB_dWUZoM05wxVKrJPE0GStsEUhFfaRD_GTlX2s_snZkKIpDwnCFantHiJUcDqTiw7kgK3nX1zOhWIHL66sYA.keW_IuNkOuwk1QOACLGcP8M3Q-1qdcC07vVXNSuPe20"
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