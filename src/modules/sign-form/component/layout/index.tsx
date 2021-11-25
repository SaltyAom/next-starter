import style from '../../sign-form.module.sass'

import type { FormLayoutComponent } from './types'

const FormLayout: FormLayoutComponent = ({ children, title }) => {
    return (
        <main className="flex flex-col justify-center items-center w-full h-screen bg-gray-100 px-4">
            <section className="flex flex-col items-center max-w-xs w-full p-6 sm:p-8 bg-white rounded-2xl border shadow-lg">
                <img
                    className="w-[64px] h-[64px] mb-4"
                    src="https://raw.githubusercontent.com/SaltyAom/papership/master/public/assets/icon/ShinoX192.png"
                    alt="Icon"
                />
                <h2 className={style.title}>{title}</h2>
                {children}
            </section>
        </main>
    )
}

export default FormLayout
