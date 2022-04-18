import { createContext,useContext,useReducer } from "react";
const filterSortContext = createContext()

const reducerFunc = (state,action) =>
{
    switch(action.type)
    {
        case "SORT-BY-DATE":
            return{
                ...state,
                sortBy:"date",
            }
        default:
            return state

    }

}

const FilterSortProvider = ({children}) =>{
    const [fsState,fsDispatch] = useReducer(reducerFunc,{
        sortBy:"",
        filter:""
    })

    return(
        <filterSortContext.Provider value={{fsState,fsDispatch}}>
            {children}
        </filterSortContext.Provider>
    )
}

const useFilterSort = () => useContext(filterSortContext);

export {FilterSortProvider,useFilterSort}
