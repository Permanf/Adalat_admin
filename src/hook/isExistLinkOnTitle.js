
export const isExistLinkOnTitle = (title)=>{
    if (!title||title.length<1) return false
    return title?.includes('http')
}