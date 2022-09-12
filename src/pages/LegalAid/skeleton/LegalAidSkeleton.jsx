


const LegalAidSkeleton = (props) => {
    return (
        <div className="animate-pulse">
            <div className="bg-white px-5 py-3 rounded-lg flex items-center w-full mb-5">
                <div class="flex items-center h-full justify-between w-full ">
                    <div class="flex flex-col space-y-3">
                        <div class="w-36 bg-gray-300 h-6 rounded-md ">
                        </div>
                        <div class="w-24 bg-gray-300 h-6 rounded-md ">
                        </div>
                    </div>
                    <div className="w-20 bg-gray-300 h-10 rounded-md ">
                    </div>
                </div>
            </div>
            {[...Array(10)].map(() => {
                return (
                    <div className="bg-white px-5 py-3 rounded-lg w-full">
                        <div className="flex justify-between rounded-lg">
                            <div className="w-11/12 pr-6">
                                <div class="w-full bg-gray-300 h-6 rounded-md ">
                                </div>
                                <div class="w-2/12 bg-gray-300 h-3 rounded-md mt-2 ">
                                </div>

                            </div>
                            <div className="w-1/12 flex justify-end">
                                <div class=" bg-gray-300 h-6 rounded-md w-1/3">
                                </div>
                                <div class=" bg-gray-300 h-6 rounded-md w-1/3 ml-3">
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}



export default LegalAidSkeleton