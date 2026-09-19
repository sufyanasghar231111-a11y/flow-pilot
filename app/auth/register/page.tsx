
import { getCurrentUser } from "@/libs/auth/getCurrentUser";
import RegisterForm from "./RegisterForm";



export default async function Register() {

    await getCurrentUser()

    return <RegisterForm />
}
