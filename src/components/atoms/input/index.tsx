import { CheckCircle } from '@atoms'

import tw, { combine } from '@tailwind'

import type { InputComponent } from './types'

const Input: InputComponent = ({
    active = false,
    className = '',
    labelClassName = '',
    wrapperClassName = '',
    label = '',
    placeholder = label,
    name,
    withCheck = false,
    error = '',
    ...props
}) => (
    <label htmlFor={name} className={combine(tw`label`, labelClassName)}>
        {label}
        <div
            className={combine(
                tw`flex mt-2 p-1 pr-3 bg-white border focus-within:ring-1 ring-primary rounded`,
                wrapperClassName
            )}
        >
            <input
                id={name}
                className={combine(tw`text-input`, className)}
                name={name}
                placeholder={placeholder}
                type="tel"
                {...props}
            />

            {withCheck && (
                <CheckCircle active={active} className={tw`m-auto`} />
            )}
        </div>
        {error && <p className={tw`mt-2 error`}>{error}</p>}
    </label>
)

export default Input
