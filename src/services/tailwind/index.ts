import { isProduction } from '@services/validation'

import styles from './tailwind.module.sass'

const tw = (classNames: string | TemplateStringsArray) => {
    let names = (typeof classNames === 'object'
        ? classNames[0]
        : classNames
    ).trim()

    if (!isProduction) return names

    return names
        .split(' ')
        .map((className) => styles[className])
        .join(' ')
}

export default tw
