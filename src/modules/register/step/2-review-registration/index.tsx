import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material'

import { useRegister } from '@stores'

import tw from '@tailwind'

import subjectDetail, { subjectToDate } from '../0-subject-selection/data'

const ReviewRegistration = () => {
    const [registration, updateRegistration] = useRegister()

    const { subjects, locations } = registration
    const selectedDates = [
        ...new Set(
            subjects
                .map((v) => v.split(' ความ')[0])
                .map((v) => subjectToDate[v as keyof typeof subjectToDate])
        )
    ].sort()

    const reset = () => {
        updateRegistration({
            ...registration,
            step: 0
        })
    }

    const next = () => {
        updateRegistration({
            ...registration,
            step: 3
        })
    }

    return (
        <main
            className={tw`flex flex-col items-start w-full max-w-4xl mx-auto`}
        >
            <Typography variant="h6">ตรวจสอบใบสมัคร</Typography>
            <TableContainer className={tw`w-full max-table border rounded`}>
                <Table className={tw`w-full`} aria-label="Review">
                    <TableHead>
                        <TableRow>
                            <TableCell className={tw`sm:w-[300px]`}>
                                วิชา
                            </TableCell>
                            <TableCell className={tw`hidden sm:table-cell`}>
                                สถานที่สมัครสอบ
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        className={tw`flex flex-col md:table-row-group gap-8`}
                    >
                        {selectedDates.map((date) => {
                            const dateSubjects =
                                subjectDetail
                                    .filter(
                                        ({ day: [, subjectDate] }) =>
                                            subjectDate === date
                                    )
                                    .flatMap((v) => {
                                        const code = v.subjects.flatMap((x) =>
                                            x.map((y) => y.join(' '))
                                        )

                                        return code.filter((c) =>
                                            subjects.includes(c)
                                        )
                                    })
                                    .filter((v) => v) || []

                            return (
                                <TableRow key={date}>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        className={tw`flex flex-col min-w-[160px] gap-2 md:table-cell`}
                                    >
                                        <Typography
                                            variant="caption"
                                            className={tw`text-gray-600`}
                                        >
                                            {date}
                                        </Typography>
                                        {dateSubjects.map((s) => (
                                            <Typography variant="h6">{s}</Typography>
                                        ))}
                                    </TableCell>
                                    <TableCell
                                        className={tw`flex flex-col gap-3 md:table-cell`}
                                    >
                                        {locations[date]!.map(
                                            (
                                                location: string,
                                                index: number
                                            ) => (
                                                // eslint-disable-next-line react/no-array-index-key
                                                <article
                                                    key={location || index}
                                                    className={tw`flex flex-col my-4`}
                                                >
                                                    <Typography
                                                        variant="caption"
                                                        className={tw`text-gray-600`}
                                                    >
                                                        อันดับที่ {index + 1}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {location || '-'}
                                                    </Typography>
                                                </article>
                                            )
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <section
                className={tw`flex justify-between items-center w-full my-6`}
            >
                <Button className={tw`px-9 py-3`} onClick={reset}>
                    <Typography>แก้ไข</Typography>
                </Button>

                <Button
                    variant="contained"
                    disableElevation
                    className={tw`px-9 py-3`}
                    onClick={next}
                >
                    <Typography>ต่อไป</Typography>
                </Button>
            </section>
        </main>
    )
}

export default ReviewRegistration
