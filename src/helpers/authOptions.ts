import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
  }
}


export const authOptions : NextAuthOptions= {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {

        if (!credentials?.email || !credentials.password) {
          console.log("Email Or Password Not Fonud");
          return null
        }


        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          })


          if (!res?.ok) {
            console.log("User Login failed")
            return null
          }



          const user = await res.json()
          if (user) {
            return {
              id : user?.data?.user?._id,
              email : user?.data?.user?.email,
              name : user?.data?.user?.name,
            }
          } else {
            return null
          }

          
        } catch (error) {
          console.log(error);
          return null
        }

        


      }
    })
  ],
  callbacks : {
    async jwt({token , user}){
      if(user){
        token.id = user?.id
      }
      return token
    },
    async session ({session , token}) {
      if(session?.user){
        session.user.id = token?.id as string
      }
      return session
    }
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  }
}
