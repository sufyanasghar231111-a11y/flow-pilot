import { RiFilePdf2Line } from "@remixicon/react";

export default function ExportPDF({handleDownload}:{handleDownload:()=> void}) {
    return (
        <button onClick={handleDownload} className="flex items-center gap-3 border border-[#252938] hover:border-[#252976] rounded text-sm text-gray-300 w-[40%] py-2.5 justify-center mr-11">
            <RiFilePdf2Line className="w-4 h-4 text-gray-400" />
            Export PDF
        </button>
    )
}