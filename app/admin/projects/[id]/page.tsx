
import AdminNav from "@/components/adminpagescomponent/nav/AdminNav";
import SingleProjectDetail from "@/components/adminpagescomponent/rightside/singleproject/SingleProjectDetail";
import { RiArrowLeftLongLine } from "@remixicon/react";
import Link from "next/link";


export default function SingleProject() {

    return (
        <div className="w-full h-full">
            <AdminNav />
            <Link href={`/admin/projects`}>
                <div className="pt-25 flex items-center gap-3 px-4 text-gray-400 text-xs hover:text-white">
                    <RiArrowLeftLongLine className="w-5 h-5 " />
                    <h1>Back to Projects</h1>
                </div>
            </Link>
            <SingleProjectDetail />
        </div>
    )
}