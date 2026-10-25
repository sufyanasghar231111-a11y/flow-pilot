import "server-only";
import { supabase } from "@/libs/supabase";

export const ProfileUpdate = async (
    buffer: Buffer,
    contentType: string,
    userId: string,
    extension: string
) => {

    const filePath = `Profile/${userId}/${crypto.randomUUID()}.${extension}`;

    const { data, error } = await supabase.storage
        .from('flowpilot-files')
        .upload(filePath, buffer, {
            contentType,
            upsert: false
        });

    if (error) {
        throw new Error(error.message)
    }

    return data.path

}