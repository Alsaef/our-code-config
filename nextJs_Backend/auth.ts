import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DBConnection } from "./db";
import User from "@/model/user";
import bcrypt from 'bcryptjs';
export const authOptions:NextAuthOptions={
    providers:[
       CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "email", type: "email", placeholder: "Enter Email" },
            password: { label: "Password", type: "password",placeholder: "Password" }
          },
          async authorize(credentials){
            if (!credentials?.email || !credentials.password) {
                throw new Error('Missing Email Or Password')
            }



            try {
              await DBConnection()  

            const user= await User.findOne({email:credentials.email})
            
            if (!user) {
                throw new Error("User Can't Fount")
            }

          const matchPassword=  await bcrypt.compare(
                credentials.password,
                user.password
            )
            if (!matchPassword) {
                throw new Error("Wrong Password")
            }

            return{
                id:user._id.toString(),
                email:user.email
            }

            } catch (error:any) {
                throw new Error(error.message)
            }


          }
       })
    ],
    callbacks: {
        async jwt({token,user}){
            if (user) {
              token.id=user.id  
            }
            return token
        },
        async session({session,token}){

            if (session.user) {
              session.user.id as string  
            }
            return session
        }
      },

      pages:{
        signIn:'/login',
        error:'/login'

      },
      session:{
        strategy:'jwt'
      }
}
