"use server";

//Get Admin Auth
export default async function getAdminCredential() {
  const loginUrl = "https://wize-invoice-dev-api.octaprimetech.com/api/v1/Account/Login";
  const Credential = btoa("admin@local.com:Abc@1234");
  try {
    const response = await fetch(loginUrl,{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        "username":"admin@local.com",
        "password":"Abc@1234"
      })
    })
    if(!response.ok) {
      throw new Error("Request Failed Check Credentials");
    }
    const result = await response.json();
    return {
      userKey : result.data.userKey,
      Credential: Credential
    }
  }catch(err) {
    console.error(err);
    return null;
  }
}