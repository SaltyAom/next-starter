import type { FormEventHandler } from 'react'

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography
} from '@mui/material'

import tw from '@tailwind'

import { useRegister } from '@stores'

import subjects, {
    schools,
    locations as schoolsDetail,
    subjectToDate,
    normalSubjects
} from './data'

import { SearchLocation, SpecialNeed } from './components'

const createOption = (school: string = '') => ({
    school
})

const SubjectSelection = () => {
    const [registration, updateRegistration] = useRegister()

    const { subjects: selection, locations } = registration
    const selectedDates = [
        ...new Set(
            selection
                .map((v) =>
                    v.includes('ความ') ? v.split(' ความ')[0] : v.slice(0, 2)
                )
                .map((v) => subjectToDate[v as keyof typeof subjectToDate])
        )
    ].sort()

    const handleSelect = (name: string) => () => {
        let previous = [...selection]

        if (name.includes('PAT 7.'))
            previous = previous.filter((subject) => !subject.includes('PAT 7.'))

        if (name.startsWith('39') && previous.find((v) => v.startsWith('89')))
            previous = previous.filter((subject) => !subject.startsWith('89'))

        if (name.startsWith('89') && previous.find((v) => v.startsWith('39')))
            previous = previous.filter((subject) => !subject.startsWith('39'))

        if (name.startsWith('49') && previous.find((v) => v.startsWith('99')))
            previous = previous.filter((subject) => !subject.startsWith('99'))

        if (name.startsWith('99') && previous.find((v) => v.startsWith('49')))
            previous = previous.filter((subject) => !subject.startsWith('49'))

        updateRegistration({
            ...registration,
            subjects: selection.includes(name)
                ? previous.filter((s) => s !== name)
                : [...previous, name].sort()
        })
    }

    const handleLocation =
        (index: number, location: string) => (title: string) => {
            const place: string[] = [
                // @ts-ignore
                ...(registration?.locations?.[location] || ['', '', '', '', ''])
            ]

            place[index] = title

            updateRegistration({
                ...registration,
                locations: {
                    ...registration.locations,
                    [location]: place
                }
            })
        }

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault()

        if (selection.length)
            updateRegistration({
                ...registration,
                step: 1
            })
    }

    return (
        <form
            className={tw`flex flex-col items-start w-full mx-auto`}
            onSubmit={handleSubmit}
        >
            <Typography variant="h6" className={tw`mb-8`}>
                ลงทะเบียน
            </Typography>

            <SpecialNeed />
            <Typography
                variant="h6"
                className={tw`flex items-center gap-2 mb-2`}
            >
                เลือกวิชาสอบ GAT/PAT{' '}
            </Typography>

            <TableContainer className={tw`w-full max-table border rounded`}>
                <Table className={tw`w-full`} aria-label="Subject Selection">
                    <TableHead>
                        <TableRow>
                            <TableCell>วันที่</TableCell>
                            <TableCell>ช่วงเช้า (08:30 - 11:30)</TableCell>
                            <TableCell>ช่วงบ่าย (13:00 - 16:00)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subjects.map((subject) => (
                            <TableRow
                                key={subject.day[1]}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0
                                    }
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    className={tw`min-w-[120px]`}
                                >
                                    <Typography
                                        variant="caption"
                                        className={tw`text-gray-600`}
                                    >
                                        {subject.day[0]}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {subject.day[1]}
                                    </Typography>
                                </TableCell>
                                {subject.subjects.map((part, index) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <TableCell key={index}>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                aria-label="subject"
                                                name={`${subject.day}-${index}`}
                                                className={tw`flex flex-col justify-start gap-4`}
                                            >
                                                {part.map(
                                                    ([type, subjectName]) => (
                                                        <FormControlLabel
                                                            key={subjectName}
                                                            value={
                                                                subjectName as string
                                                            }
                                                            checked={selection.includes(
                                                                `${type} ${subjectName}`
                                                            )}
                                                            control={
                                                                <Radio
                                                                    onClick={handleSelect(
                                                                        `${type} ${subjectName}`
                                                                    )}
                                                                />
                                                            }
                                                            label={
                                                                <>
                                                                    <Typography
                                                                        variant="caption"
                                                                        className={tw`text-gray-600`}
                                                                    >
                                                                        {type}
                                                                    </Typography>
                                                                    <Typography variant="body1">
                                                                        {
                                                                            subjectName
                                                                        }
                                                                    </Typography>
                                                                </>
                                                            }
                                                        />
                                                    )
                                                )}
                                            </RadioGroup>
                                        </FormControl>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography
                variant="h6"
                className={tw`flex items-center gap-2 mt-6 mb-2`}
            >
                เลือกวิชาสอบสามัญ
            </Typography>

            <TableContainer className={tw`w-full max-table border rounded`}>
                <Table className={tw`w-full`} aria-label="Subject Selection">
                    <TableHead>
                        <TableRow>
                            <TableCell>วันที่</TableCell>
                            <TableCell className={tw`min-w-[160px]`}>08:30 - 10:00</TableCell>
                            <TableCell className={tw`min-w-[160px]`}>11:00 - 12:30</TableCell>
                            <TableCell className={tw`min-w-[160px]`}>13:00 - 16:00</TableCell>
                            <TableCell className={tw`min-w-[160px]`}>15:30 - 17:00</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {normalSubjects.map((subject) => (
                            <TableRow
                                key={subject.day[1]}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0
                                    }
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    className={tw`min-w-[120px]`}
                                >
                                    <Typography
                                        variant="caption"
                                        className={tw`text-gray-600`}
                                    >
                                        {subject.day[0]}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {subject.day[1]}
                                    </Typography>
                                </TableCell>
                                {subject.subjects.map((part, index) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <TableCell key={index}>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                aria-label="subject"
                                                name={`${subject.day}-${index}`}
                                                className={tw`flex flex-col justify-start gap-4`}
                                            >
                                                {part.map(
                                                    ([type, subjectName]) => (
                                                        <FormControlLabel
                                                            key={subjectName}
                                                            value={
                                                                subjectName as string
                                                            }
                                                            checked={selection.includes(
                                                                `${type} ${subjectName}`
                                                            )}
                                                            control={
                                                                <Radio
                                                                    onClick={handleSelect(
                                                                        `${type} ${subjectName}`
                                                                    )}
                                                                />
                                                            }
                                                            label={
                                                                <>
                                                                    <Typography
                                                                        variant="caption"
                                                                        className={tw`text-gray-600`}
                                                                    >
                                                                        {type}
                                                                    </Typography>
                                                                    <Typography variant="body1">
                                                                        {
                                                                            subjectName
                                                                        }
                                                                    </Typography>
                                                                </>
                                                            }
                                                        />
                                                    )
                                                )}
                                            </RadioGroup>
                                        </FormControl>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography
                variant="h6"
                className={tw`flex items-center gap-2 my-6`}
            >
                เลือกสนามสอบ
            </Typography>

            <TableContainer className={tw`w-full max-w-[95vw] border rounded`}>
                <Table className={tw`w-full`} aria-label="Location Selection">
                    <TableHead>
                        <TableRow>
                            <TableCell className={tw`sm:w-[300px]`}>
                                วิชา
                            </TableCell>
                            <TableCell className={tw`hidden sm:table-cell`}>
                                สนามสอบ
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        className={tw`flex flex-col md:table-row-group gap-8`}
                    >
                        {!selection.length && (
                            <TableRow>
                                <TableCell component="th" scope="row" />
                            </TableRow>
                        )}
                        {selectedDates.map((date) => {
                            const current: string[] =
                                // @ts-ignore
                                locations[date as string] || []

                            const currentLocation: string =
                                current.find((v) => v) || ''
                            const index = schools.indexOf(currentLocation)
                            const province = schoolsDetail[index]?.[3] || ''

                            const mapOption = (i: number) =>
                                createOption(
                                    schoolsDetail[
                                        schools.indexOf(current[i])
                                    ]?.[0]
                                )

                            const availableSubject = [
                                ...(subjects
                                    .filter((v) => v.day[1] === date)
                                    .flatMap((v) => {
                                        const code = v.subjects.flatMap((x) =>
                                            x.map((y) => y.join(' '))
                                        )

                                        return code.filter((c) =>
                                            selection.includes(c)
                                        )
                                    })
                                    .filter((v) => v) || []),
                                ...(normalSubjects
                                    .filter((v) => v.day[1] === date)
                                    .flatMap((v) => {
                                        const code = v.subjects.flatMap((x) =>
                                            x.map((y) => y.join(' '))
                                        )

                                        return code.filter((c) =>
                                            selection.includes(c)
                                        )
                                    })
                                    .filter((v) => v) || [])
                            ]

                            return (
                                <TableRow key={date}>
                                    <TableCell component="th" scope="row" className={tw`flex flex-col gap-1 md:table-cell`}>
                                        <Typography
                                            className={tw`text-gray-400`}
                                        >
                                            {date}
                                        </Typography>
                                        {availableSubject.map((subject) => (
                                            <Typography
                                                variant="h6"
                                                key={subject}
                                            >
                                                {subject}
                                            </Typography>
                                        ))}
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        className={tw`flex flex-col gap-4`}
                                    >
                                        <SearchLocation
                                            placeholder="อันดับ 1"
                                            filter={province}
                                            selected={current}
                                            value={mapOption(0)}
                                            onChange={handleLocation(0, date)}
                                            required
                                        />
                                        <SearchLocation
                                            placeholder="อันดับ 2"
                                            filter={province}
                                            selected={current}
                                            value={mapOption(1)}
                                            onChange={handleLocation(1, date)}
                                        />
                                        <SearchLocation
                                            placeholder="อันดับ 3"
                                            filter={province}
                                            selected={current}
                                            value={mapOption(2)}
                                            onChange={handleLocation(2, date)}
                                        />
                                        <SearchLocation
                                            placeholder="อันดับ 4"
                                            filter={province}
                                            selected={current}
                                            value={mapOption(3)}
                                            onChange={handleLocation(3, date)}
                                        />
                                        <SearchLocation
                                            placeholder="อันดับ 5"
                                            filter={province}
                                            selected={current}
                                            value={mapOption(4)}
                                            onChange={handleLocation(4, date)}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button
                variant="contained"
                disableElevation
                type="submit"
                className={tw`px-9 py-3 my-6 ml-auto`}
                disabled={!selection.length}
            >
                <Typography>ต่อไป</Typography>
            </Button>
        </form>
    )
}

export default SubjectSelection
