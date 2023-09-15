import React,{useState } from "react";


export const CategoryContext=React.createContext();
export default function Category(props){
    const [ selectedCategory,setSelectedCategory]=useState("general")
    const [ country,setCountry]=useState("us")
    const handleChangeCategory=(categoryValue)=>{
        setSelectedCategory(categoryValue)
    }
    const handleChangeCountry=(countryValue)=>{
        setCountry(countryValue)
    }
        return(
            <>
                <CategoryContext.Provider value={[selectedCategory,handleChangeCategory,country,handleChangeCountry]}>
                    {props.children}
                </CategoryContext.Provider>
            </>
        )
    }