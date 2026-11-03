import { RiSearchEyeLine } from "@remixicon/react";

export default function CannotFind() {
    return (
        <div className="flex h-50 flex-col items-center justify-center gap-3 px-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#343B52] bg-[#202638]">
                <RiSearchEyeLine className="h-6 w-6 text-gray-400" />
            </div>

            <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">
                    No results found
                </h3>

                <p className="max-w-xs text-xs leading-5 text-gray-400">
                    We couldn&apos;t find any projects, tasks, or team members matching your search.
                    Try another keyword.
                </p>
            </div>
        </div>
    )
}