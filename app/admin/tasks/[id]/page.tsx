import AdminNav from "@/components/adminpagescomponent/nav/AdminNav";
import SingleTaskHeader from "@/components/adminpagescomponent/rightside/singleTask/SingleTaskHeader";
import { RiArrowLeftLongLine } from "@remixicon/react";
import Link from "next/link";

export default function SingleTask() {
    return (
        <div className="w-full h-full">
            <AdminNav />
            <div className="pt-25  w-fit  px-4 text-gray-400 text-xs hover:text-white">
                <Link href={`/admin/tasks`} className="flex items-center gap-3">
                    <RiArrowLeftLongLine className="w-5 h-5 " />
                    <h1>Back to Tasks</h1>
                </Link>
            </div>
            <SingleTaskHeader />
        </div>
    )
}