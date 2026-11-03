import { RiSearch2Line } from "@remixicon/react";

export default function EmptySearchModal() {
    return (
        <div className="flex h-50 flex-col items-center justify-center gap-3 px-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#343B52] bg-[#202638]">
                <RiSearch2Line className="h-6 w-6 text-blue-400" />
            </div>

            <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">
                    What are you looking for?
                </h3>

                <p className="text-xs leading-5 text-gray-400">
                    Search for projects, tasks, or team members to find what you need.
                </p>
            </div>
        </div>
    )
}