export default function SearchBarLoader() {
    return (
        <div className="absolute inset-0 h-fit w-full  space-y-5 rounded-xl bg-[#171A26]">
            {[1, 2, 3, 4].map((item) => (

                <div
                    key={item}
                    className="flex w-full animate-pulse items-center justify-between gap-4"
                >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="h-8 w-8 shrink-0 rounded-lg border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-indigo-500/10" />

                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                            <div className="h-2.5 w-1/3 rounded-full bg-gradient-to-r from-blue-400/50 to-indigo-400/30" />
                            <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-indigo-400/30 to-slate-400/10" />
                        </div>
                    </div>

                    <div className="h-5 w-16 shrink-0 rounded-md bg-gradient-to-r from-blue-400/20 to-indigo-400/30" />
                </div>

            ))}
        </div>
    )
}