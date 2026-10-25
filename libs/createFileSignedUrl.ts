import { supabase } from "./supabase";

export async function createFileSignedUrl( pfp:string ): Promise<string> {

    const { data, error } = await supabase.storage
        .from('flowpilot-files')
        .createSignedUrl(pfp, 3600)

    if (error) {
        throw new Error(error.message)
    }

    return data.signedUrl

}