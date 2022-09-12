
const PostDelete = (props) => {

    return (
        <main className="flex flex-col items-center justify-center p-5">
            <h1 className="text-2xl font-montserrat-bold"> Pozmagy tassyklaň </h1>
            <aside className="flex items-center justify-center mt-5">
                <button
                    onClick={() => props.delete()}
                    className="bg-white text-red-700 border border-red-700 hover:bg-red-700 hover:text-white duration-300 font-bold rounded-lg px-4 py-2 mr-2"
                >
                    Hawa
                </button>
                <button
                    onClick={() => props.close()}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 font-bold duration-300 border border-gray-200 rounded-lg px-4 py-2 ml-2">
                    Ýok
                </button>
            </aside>
        </main>
    )
}

export default PostDelete