

export function getShortDate(date){
    if (date&&typeof(date)==='object'){
        return date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()
    }
    else return ' '
}