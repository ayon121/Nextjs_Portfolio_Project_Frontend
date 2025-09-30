"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */


export const login = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login` , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(data)
    })

    console.log(res);

    if(!res?.ok){
        console.log("User Login failed");
    }

    return await res.json()
}