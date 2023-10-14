'use client'

import { FormTextField } from "@/components/FormTextField";
import WordEditor from "./WordEditor";
import { useEffect, useState } from "react";
import LogBox from "./LogBox";
import { faker } from "@faker-js/faker";

export default function LogEditor({ 
    title: defaultTitle,
    content: defaultContent, 
    words: defaultWords,
    onSave,
}) {
    const [wordContent, setWordContent] = useState('')
    const [words, setWords] = useState([])

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const onGenRandom = () => {
        const {title, content, words} = generateRandom()
        setTitle(title)
        setContent(content)
        setWords([...words])
        setWordContent(words.join(" "))
    }

    useEffect(() => {
        setTitle(defaultTitle)
        setContent(defaultContent)
        setWords([...defaultWords])
        setWordContent(defaultWords.join(" "))
    }, [defaultTitle, defaultContent, defaultWords])

    useEffect(() => {
        if (wordContent.trim().length) {
            setWords(wordContent.trim().split(/\s/).filter(v => v.trim().length != 0))
        } else {
            setWords([])
        }
    }, [wordContent])

    return (
        <div className="flex gap-4 flex-col h-full">
            <div className="flex gap-4">
                <div className="flex-auto">
                    <FormTextField placeholder="Log Title" onChange={e => setTitle(e.target.value)} defaultValue={title}/>
                </div>
                <button className="ok-button" onClick={_ => onGenRandom()}>Generate</button>
                <button className="ok-button" onClick={_ => onSave && onSave({title, content, words})}>Save</button>
                <button className="cancel-button">Cancel</button>
            </div>
            <div className="flex gap-4 flex-auto">
                <div className="h-full w-[70%] shrink-0">
                    <LogBox defaultValue={content} onChange={e => setContent(e.target.value)} />
                </div>
                <div className="flex-auto">
                    <WordEditor
                        words={words}
                        content={wordContent}
                        onChange={e => setWordContent(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

function generateRandom() {
    return {
        title: faker.lorem.sentence(),
        content: faker.lorem.sentences(),
        words: faker.word.words().split(" ")
    }
}