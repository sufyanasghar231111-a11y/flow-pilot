import { RiInbox2Line } from "@remixicon/react";

export default function NoTaskFound({id}:{id:string}) {
    return (
        <div className="w-full min-h-[300px] flex items-center justify-center px-3">
            <div className="flex flex-col items-center text-center">

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700/80 bg-gray-800/50">
                    <RiInbox2Line className="h-5 w-5 text-gray-500" />
                </div>

                <p className="mt-3 text-xs font-medium text-gray-400">
                    No tasks in {id}
                </p>

                <p className="mt-1 max-w-[150px] text-[11px] leading-4 text-gray-600">
                    Tasks added to this stage will appear here.
                </p>

            </div>
        </div>
    )
}