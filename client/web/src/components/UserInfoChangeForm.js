'use client'

import { useEffect, useState } from "react"
import { FormTextField } from "./FormTextField"
import { FormTextArea } from "./FormTextArea"

export default function UserInfoChangeForm({ default: def, onSubmit }) {
    const [name, setName] = useState()
    const [bio, setBio] = useState()

    useEffect(() => {
        const {name, bio} = def
        setName(name)
        setBio(bio)
    }, [def])

    return (
        <div>
            <form 
                className="flex flex-col gap-4"
                onSubmit={e => {
                    e.preventDefault()
                    onSubmit && onSubmit({ name, bio })
                }}
            >
                <FormTextField placeholder="User Name" defaultValue={name} onChange={e => setName(e.target.value)}/>
                <FormTextArea placeholder="Something about urself ..." defaultValue={bio} onChange={e => setBio(e.target.value)}/>
                <div className="inline-grid gap-x-4 grid-flow-col auto-cols-max pt-4">
                    <button className="ok-button" type="submit">Save</button>
                    <button className="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    )
}