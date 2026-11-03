import SearchResult from "@/components/userpagecomponent/userrightside/searchcomponent/SearchResult";
import UserNav from "@/components/userpagecomponent/userrightside/UserNav";

export default function Search() {
    return (
        <div className="w-full h-full">
            <UserNav />
            <SearchResult />
        </div>
    )
}