"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */


export const addblog = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })


    if (!res?.ok) {
        console.log("Blog Added failed");
    }

    return await res.json()
}