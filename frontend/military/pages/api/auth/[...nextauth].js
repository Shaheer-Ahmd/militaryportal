import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions = {
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {},

          async authorize(credentials, req) {
            
            const {email, pwd} = credentials;
            
            // Add logic here to look up the user from the credentials supplied
            
            try {
                const response = await fetch("http://localhost:8000/verify-password", {
                  method: "GET", // or 'PUT'
                  body: JSON.stringify({email: email, password: pwd}),
                });
            
                const result = await response.json();
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
          pages : {
            signIn: "/components/formSignIn",
            signUp: "/components/formSignUp",
          }

        })
      ]
}


export default NextAuth (authOptions)
