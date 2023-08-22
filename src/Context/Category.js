import React,{ Component } from "react";


export const CategoryContext=React.createContext();
export default class Category extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedCategory:"general",
            country:"us",
        }
    }
    handleChangeCategory=(categoryValue)=>{
        this.setState({
            selectedCategory:categoryValue,
        })
    }
    handleChangeCountry=(countryValue)=>{
        this.setState({
            country:countryValue,
        })
    }
    render(){
        return(
            <>
                <CategoryContext.Provider value={[this.state.selectedCategory,this.handleChangeCategory,this.state.country,this.handleChangeCountry]}>
                    {this.props.children}
                </CategoryContext.Provider>
            </>
        )
    }
}