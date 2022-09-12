import { useEffect } from "react"

const Breadcrumb = ({children}) => {
    useEffect(() => {
        // console.log(children)
    }, [])

    return (
        <main className="bg-white flex px-4 py-3 rounded-lg my-3">
            {children}
        </main>
    )
}

export default Breadcrumb