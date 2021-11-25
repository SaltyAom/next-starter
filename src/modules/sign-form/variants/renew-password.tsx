import { useState } from 'react'
import Link from 'next/link'

import { useForm } from 'react-hook-form'

import { Button, FormLayout, Input } from '../component'
import style from '../sign-form.module.sass'

import type { DraftForm, FormValue } from '../types'

const form: DraftForm = {
    email: {},
}

const SignIn = () => {
    const { register, handleSubmit } = useForm<FormValue>()
    const [error, updateError] = useState('')

    const process = (data: FormValue) => {
        if (data.password !== data['confirm password'])
            return updateError("Password isn't match")

        updateError('Something went wrong')
    }

    return (
        <FormLayout title="Reset Nyan account with email">
            <form
                className="flex flex-col w-full pt-6 pb-2 gap-4"
                onSubmit={handleSubmit(process)}
            >
                {Object.keys(form).map((input) => (
                    <Input
                        key={input}
                        placeholder={input}
                        {...form[input]}
                        register={register(input)}
                    />
                ))}
                {error && (
                    <a className={`${style.content} text-red-400 font-medium`}>
                        {error}
                    </a>
                )}

                <a className={`${style.link} font-normal`}>Forgot password?</a>
                <Button primary onClick={handleSubmit(process)}>
                    Sign In
                </Button>
                <p className={`${style.content} mt-2`}>
                    Already have an account?{' '}
                    <Link href="/">
                        <a className={style.link}>Sign in</a>
                    </Link>
                </p>
            </form>
        </FormLayout>
    )
}

export default SignIn
