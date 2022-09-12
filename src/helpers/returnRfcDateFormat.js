export const returnRfcDateFormat = (date)=>{
    if(date&&date?.length>0){
        var a = date.split('.')
        return a[2]+"-"+a[1]+"-"+a[0]
    }
}