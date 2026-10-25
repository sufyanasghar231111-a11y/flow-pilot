import { createSlice } from "@reduxjs/toolkit";

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: 'system'
    },
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
        }
    }
})

export const searchInputSlice = createSlice({
    name: 'searchInput',
    initialState: {
        searchInput: ''
    },
    reducers: {
        setSearchInput: (state, action) => {
            state.searchInput = action.payload
        }
    }
})

export const searchModal = createSlice({
    name: "searchModal",
    initialState: {
        searchModal: false
    },
    reducers: {
        setSearchModal: (state, action) => {
            state.searchModal = action.payload
        }
    }
})

export const searchPage = createSlice({
    name: 'searchPage',
    initialState: {
        searchPage:1
    },
    reducers:{
        setSearchPage:(state, action) => {
            state.searchPage = action.payload
        }
    }
})

export const { setTheme } = ThemeSlice.actions
export const { setSearchInput } = searchInputSlice.actions
export const { setSearchModal } = searchModal.actions
export const { setSearchPage } = searchPage.actions
export const themeReducer = ThemeSlice.reducer
export const searchInputReducer = searchInputSlice.reducer
export const searchModalReducer = searchModal.reducer
export const searchPageReducer = searchPage.reducer