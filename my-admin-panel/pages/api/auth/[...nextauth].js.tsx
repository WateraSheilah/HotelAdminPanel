import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { SessionStrategy } from "next-auth";
import { closeClient, connectToDatabase } from "@/utilities/db";
import { validatePassword } from "@/utilities/password";

export const authOptions = {
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials || !credentials.username || !credentials.password) {
                    throw new Error("Check username or password");
                }
                const client = await connectToDatabase();

                const usersCollection = client.collection("admins");

                const user = await usersCollection.findOne({
                    username: credentials.username,
                });

                if (!user) {
                    await closeClient();
                    throw new Error("No user found");
                }

                const isValid = await validatePassword(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    await closeClient();
                    throw new Error("Please enter correct password");
                }

                await closeClient();
                return {
                    id: user._id.toString(),
                    username: user.username
                };
            },
        }),
        // GoogleProvider(),
    ],
};

export default NextAuth(authOptions);
