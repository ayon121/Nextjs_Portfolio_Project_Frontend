"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */


export const addproject = async (data: any) => {
    const res = await fetch(`https://backend-rho-plum-42.vercel.app/api/v1/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })


    if (!res?.ok) {
        console.log("Project Added failed");
    }

    return await res.json()
}