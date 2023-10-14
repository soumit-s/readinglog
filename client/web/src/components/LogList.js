'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

export default function LogList({entries, props, selected, setSelected}) {

    const onCheck = (e) => {
        selected[e.id] = true
        setSelected({...selected})
    }

    const onUncheck = (e) => {
        selected[e.id] = false
        setSelected({...selected})
    }

    useEffect(() => {
        const s = {}
        entries.forEach(e => {
            if (Object.keys(selected).findIndex(k => k == e.id) != -1)
                s[e.id] = selected[e.id]
            else s[e.id] = false
        })
        setSelected(s)
    }, [entries])


    useEffect(() => {
        console.log(selected)
    }, [selected])

    return (
        <div className="" {...props}>
            <table className="w-full bg-white border-[1px] border-zinc-300 rounded-md border-separate border-spacing-0 overflow-hidden">
                <thead className=" text-zinc-800 text-left border-b-[1px]">
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Vocabulary</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        entries && entries.map((entry, key) => (
                            <Entry key={key} entry={entry} 
                                onCheck={() => onCheck(entry)}
                                onUncheck={() => onUncheck(entry)} 
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

function Empty() {
    return (
        <div className="text-center [&>*]:text-4xl">
            <div>You dont have any logs.</div>
            <div>Create one.</div>
        </div>
    )
}

function Entry({entry, isSelected = false, onCheck, onUncheck}) {
    const { title, words } = entry

    const onChange = e => {
        if (e.target.checked) {
            onCheck && onCheck()
        } else {
            onUncheck && onUncheck()
        }
    }

    console.log(entry)

    return (
        <tr className="even:bg-zinc-100">
            <td className="text-zinc-600 flex items-center gap-4">
                <input type="checkbox" defaultChecked={isSelected} onChange={onChange}/>
                <Link
                    className="hover:text-blue-500 hover:underline" 
                    href={entry.url}
                >{title}</Link>
            </td>
            <td>{dateToString(Date.now())}</td>
            <td className="flex gap-2">
                {words && words.map((word, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-emerald-700 text-white">{word}</span>
                ))}
            </td>
        </tr>
    )
}

function dateToString(date) {
    if (date instanceof Date) {
        return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()
    }
}