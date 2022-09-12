const getByLocale = (text) => {
    const locale = localStorage.getItem('locale')
    // debugger
    if (text){
        if (text[locale]){
            return text[locale]
        }
        
        else if(text.tm){
            return text.tm
        }
       
        else return text
    }
   
    return ''
    
}

export default getByLocale