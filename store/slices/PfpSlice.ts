import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialInter {
    url: string
}

const initialState: InitialInter = {
    url: ''
}

export const PfpSlice = createSlice({
    name: "pfp",
    initialState,
    reducers: {
        setUrl:(state, action: PayloadAction<string>) =>{
            state.url = action.payload
        }
    }
})

export const { setUrl } = PfpSlice.actions
export const PfpReducer = PfpSlice.reducer