
import { getCurrentUser } from "@/libs/auth/getCurrentUser";
import LoginInForm from "./LoginForm";

export default async function Login() {

    await getCurrentUser()

    return <LoginInForm />
}
