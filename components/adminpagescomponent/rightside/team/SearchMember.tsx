import { useTeam } from "@/contexts/teamContext/TeamContext";
import { RiSearchLine } from "@remixicon/react";

export default function SearchMember({ searchInput, setSearchInput }: { searchInput: string, setSearchInput: React.Dispatch<React.SetStateAction<string>> }) {

    return (
        <div className="relative w-64">
            <RiSearchLine
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
                onChange={(elem) => { setSearchInput(elem.target.value) }}
                value={searchInput}
                type="text"
                placeholder="Search member..."
                className="h-9 w-full rounded-md border border-[#2A2E3D] bg-[#1D202D] pl-9 pr-3 text-sm text-gray-200 outline-none placeholder:text-gray-500 transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20"
            />
        </div>
    )
}