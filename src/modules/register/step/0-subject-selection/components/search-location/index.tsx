/* eslint-disable react/require-default-props */
import { Autocomplete, TextField } from '@mui/material'

import locations from './data'

const SearchLocation = ({
    placeholder,
    onChange,
    filter = '',
    required = false,
    value = null,
    selected = []
}: {
    placeholder: string
    // eslint-disable-next-line no-unused-vars
    onChange: (title: string) => void
    filter?: string
    selected?: string[]
    required?: boolean
    value?: {
        school: string
    } | null
}) => {
    const options = locations
        .filter(([, , , province]) => {
            if (filter) return province.includes(filter)

            return true
        })
        .map((location) => {
            const [school, district, subDistrict, province, seat] = location

            return {
                school,
                district,
                subDistrict,
                province,
                seat
            }
        })

    const handleChange = (_: any, selection: typeof options[0] | null) => {
        onChange(selection?.school || '')
    }

    return (
        <Autocomplete
            id="locations"
            options={options
                .sort((a, b) => -b.province.localeCompare(a.province))
                .filter((s) => !selected.includes(s.school))}
            groupBy={(option) => option.province}
            getOptionLabel={(option) => option.school}
            onChange={handleChange}
            value={value as typeof options[0] | null}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={placeholder}
                    required={required}
                />
            )}
        />
    )
}

export { locations }
export { schools } from './data'
export default SearchLocation
