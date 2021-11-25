// ? jsx-a11y/label-has-associated-control bug
// @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md

/* eslint-disable jsx-a11y/label-has-associated-control */
import style from '../../sign-form.module.sass'

import type { LoginInputComponent } from './types'

const LoginInput: LoginInputComponent = ({
    type = 'text',
    placeholder = '',
    labelClassName = '',
    register,
    required = true,
    ...props
}) => {
    return (
        <label
            className={`flex flex-col ${style.label} capitalize gap-2 ${labelClassName}`}
        >
            {placeholder}

            <section className="flex flex-row w-full px-4 py-2 b-0 rounded bg-gray-100">
                <input
                    className="text-gray-700 text-lg placeholder-gray-400 w-full bg-transparent focus:outline-none focus:ring-transparent p-0 border-0"
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    {...register}
                    {...props}
                />
            </section>
        </label>
    )
}

export default LoginInput
