"use server";

import getAdminCredential from "./adminAuth";


export default async function demoRequest(payload) {
    const Link = `https://wize-invoice-dev-api.octaprimetech.com/api/v1/DemoRequests`
    const Auth = await getAdminCredential();
    try {
        const request = await fetch(Link,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "X-USER-KEY" : Auth.userKey,
                "Authorization" : `Basic ${Auth.Credential}`
            },
            body:JSON.stringify(payload)
        })
        const response = await request.json();
        console.log(response);
        
        if(!request.ok) {
        return {
        success: false,
        messages: ["The request was not sent. Please try again."] || response.messages[0]
      };
        }
        return {
        success: response.isSuccess,
        messages: ["Your request has been successfully submitted. We will contact you as soon as possible."] || response.messages[0] 
        }

    }catch(err) {
        console.error("Request Demo Error",err);
    return {
      success: false,
      messages: ["Connection error. Please try again."]
    };
        
    }
}