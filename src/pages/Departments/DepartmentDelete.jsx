import { useTranslation } from "react-i18next"
import SmallModal from "../../components/Modal/SmallModal"

const DepartmentDelete = ({deleteConfirm, departmentDelete, close}) => {
    const { t } = useTranslation()

    return (
        <SmallModal isOpen={deleteConfirm} close={close}>
            <aside className="flex flex-col items-center justify-center">
                    <h1 className="font-montserrat-bold text-xl"> { t('confirm_delete') } </h1>

                    <div className="flex mt-5">
                        <button
                            onClick={() => departmentDelete()}
                            className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 rounded-lg px-6 py-2 my-2 mr-4"
                        >
                            { t('yes') }
                        </button>

                        <button
                            onClick={() => close()}
                            className="bg-gray-100 text-gray-800 duration-300 rounded-lg px-6 py-2 my-2"
                        >
                            { t('no') }
                        </button>
                    </div>
                </aside>
        </SmallModal>
    )
}

export default DepartmentDelete