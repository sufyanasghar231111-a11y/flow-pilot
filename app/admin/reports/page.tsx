import AdminNav from "@/components/adminpagescomponent/nav/AdminNav";
import Reportheader from "@/components/adminpagescomponent/rightside/reports/Reportheader";
import Tabs from "@/components/adminpagescomponent/rightside/reports/Tabs";

export default function Reports() {
    return (
        <div className="w-full h-full bg-[#11131D]">
            <AdminNav />
            <Reportheader />
            <Tabs />
        </div>
    )
}