import { RiSearchLine } from "@remixicon/react";
import SearchMember from "./SearchMember";

export default function TeamDetailHeader({ searchInput, setSearchInput }: { searchInput: string, setSearchInput: React.Dispatch<React.SetStateAction<string>> }) {
    return (
        <div className="flex items-center justify-between px-5 py-4">
            <div>
                <h2 className="text-lg font-semibold text-gray-100">
                    Team Members
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                    Manage and view your team members
                </p>
            </div>

            <div className="flex items-center gap-3">
                <SearchMember searchInput={searchInput} setSearchInput={setSearchInput} />

                {/* <div className="relative">
                    <select
                        className="h-9 appearance-none rounded-md border border-[#2A2E3D] bg-[#1D202D] px-3 pr-9 text-sm text-gray-300 outline-none transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20"
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>

                    <RiArrowDownSLine
                        size={17}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                </div> */}
            </div>
        </div>
    );
}