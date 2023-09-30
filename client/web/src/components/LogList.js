export default function LogList({entries, props}) {
    return (
        <div className="" {...props}>
            <table className="w-full bg-white border-[1px] border-zinc-300 rounded border-separate">
                <thead className=" text-zinc-800 text-left">
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Vocabulary</th>
                    </tr>
                </thead>
                <tbody>

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

function Entry({entry}) {
    return (
        <tr>
            <td>{entry.name}</td>
            <td>{entry.date}</td>
            <td>
                {entry.vocab.map((word, i) => (
                    <span>{word}</span>
                ))}
            </td>
        </tr>
    )
}