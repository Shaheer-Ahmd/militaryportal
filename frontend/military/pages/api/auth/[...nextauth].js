import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "text" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        
        try {
          const response = await axios.post("http://127.0.0.1:5000/verify-password", { email, password });
          const result = response.data; // accessing response data directly
          
          console.log("Result:", result); // added for debugging
          console.log("Status:", result.status_code); // added for debugging
          if (result.status_code == 200) {
            const user = { email, password }; // corrected property name
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error:", error);
          return null;
        }
      }
    })
  ]
};

export default NextAuth(authOptions);
