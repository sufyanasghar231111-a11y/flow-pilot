import { useUiProject2 } from "@/contexts/projectContext/ProjectContext";
import { RiCloseFill } from "@remixicon/react";

export function FilterDataModel() {
    const {
        filterModal,
        setFilterModal,
        filterDate,
        setFilterData,
    } = useUiProject2();

    const handleFilter = (status: string) => {
        setFilterData(status);
        setFilterModal(false);
    };

    const handleClearFilter = () => {
        setFilterData("");
        setFilterModal(false);
    };

    return (
        <>
            {filterModal && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={() => setFilterModal(false)}
                        className="fixed inset-0 z-40"
                    />

                    {/* Modal */}
                    <div className="absolute top-12 right-40 z-50 w-56 rounded-lg border border-gray-700 bg-[#171A26] p-4 shadow-lg">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-100">
                                Filter by Status
                            </span>

                            <button
                                onClick={() => setFilterModal(false)}
                                className="text-gray-500 hover:text-gray-300"
                            >
                                <RiCloseFill size={18} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-1">
                            <button
                                onClick={() => handleFilter("active")}
                                className="flex items-center gap-2 rounded px-2 py-2 text-left text-sm text-gray-200 hover:bg-white/5"
                            >
                                <span className="h-2 w-2 rounded-full bg-blue-500" />
                                Active
                            </button>

                            <button
                                onClick={() => handleFilter("pending")}
                                className="flex items-center gap-2 rounded px-2 py-2 text-left text-sm text-gray-200 hover:bg-white/5"
                            >
                                <span className="h-2 w-2 rounded-full bg-yellow-500" />
                                Pending
                            </button>

                            <button
                                onClick={() => handleFilter("complete")}
                                className="flex items-center gap-2 rounded px-2 py-2 text-left text-sm text-gray-200 hover:bg-white/5"
                            >
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                Completed
                            </button>

                            <button
                                onClick={() => handleFilter("cancelled")}
                                className="flex items-center gap-2 rounded px-2 py-2 text-left text-sm text-gray-200 hover:bg-white/5"
                            >
                                <span className="h-2 w-2 rounded-full bg-red-500" />
                                Cancelled
                            </button>
                        </div>

                        {/* Clear */}
                        <div className="mt-3 border-t border-gray-700 pt-2">
                            <button
                                onClick={handleClearFilter}
                                disabled={!filterDate}
                                className="flex w-full items-center justify-center gap-1 rounded py-1 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Clear
                                <RiCloseFill size={16} />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}