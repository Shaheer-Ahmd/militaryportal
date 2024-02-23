import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions = {
    session: {
      strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          
          type: 'credentials',
          
          credentials: {},

          async authorize(credentials, req) {
            
            const {email, pwd} = credentials;
            
            
            // Add logic here to look up the user from the credentials supplied
            
            try {
                const response = await fetch("http://localhost:5000/verify-password", {
                  method: "POST", // or 'PUT'
                  body: JSON.stringify({email: email, password: pwd}),
                });
            
                const result = await response.json();
                console.log(result)
                if (result === "Password Verified"){
                    const user = { email: email, password: pwd}
                    return user;
                }
                else{
                    return null;
                }

            } catch (error) {
                console.error("Error:", error);
                return null;
              }
          },

         

        })
      ],
      pages : {
        signIn: "/auth/Form"
      }  
}


export default NextAuth (authOptions)
