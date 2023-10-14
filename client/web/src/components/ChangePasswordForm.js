'use client'

import { FormTextField } from "./FormTextField"
import { useState } from "react"

export default function ChangePasswordForm({ onSubmit }) {
    const [oldp, setOld] = useState()
    const [newp, setNew] = useState()
    const [confirmp, setConfirm] = useState()

    return (
        <div>
            <form
                className="flex flex-col gap-4"
                onSubmit={e => {
                    e.preventDefault()
                    onSubmit && onSubmit({
                        pwd: {
                            old: oldp,
                            new: newp,
                            confirm: confirmp
                        }, event: e
                    })
                }}
            >
                <FormTextField placeholder="Old Password" onChange={e => setOld(e.target.value)} />
                <div className="flex gap-4">
                    <FormTextField placeholder="New Password" onChange={e => setNew(e.target.value)} />
                    <FormTextField placeholder="Confirm Password" onChange={e => setConfirm(e.target.value)} />
                </div>
                <div className="grid gap-x-4 grid-flow-col auto-cols-max pt-4">
                    <button className="ok-button" type="submit">Change</button>
                    <button className="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    )
}