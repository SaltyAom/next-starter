import type { ButtonComponent } from './types'

const primary = 'text-white text-md font-medium justify-center bg-black'
const secondary = 'text-gray-500 text-md bg-transparent border border-gray-300'

const Button: ButtonComponent = ({
    primary: isPrimary,
    children,
    type,
    icon = null,
    ...props
}) => {
    return (
        <button
            className={`flex flex-row items-center gap-2 ${
                isPrimary ? primary : secondary
            } p-3 rounded`}
            type="submit"
            {...props}
        >
            {icon && (
                <div className="overflow-hidden w-[21px] h-[21px]">{icon}</div>
            )}
            {children}
        </button>
    )
}

export default Button
