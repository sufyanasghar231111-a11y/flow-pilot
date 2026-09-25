import { RiAddBoxLine, RiAddLine } from "@remixicon/react";

export default function ProjectNotFound() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-6 py-9 text-center px-4">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-600/10 border border-blue-600/20">
                <RiAddBoxLine className="w-10 h-10 text-blue-500" />
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">
                    Your workspace is empty
                </h3>

                <p className="max-w-sm text-sm text-gray-400">
                    Create your first project and start organizing your work.
                </p>
            </div>

            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600/70 text-white text-sm font-medium hover:bg-blue-600 transition-colors duration-200">
                <RiAddLine className="w-4 h-4" />
                Create Project
            </button>
        </div>
    )
}