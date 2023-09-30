// Represents a form text field.

import Error1 from "@/svg/Error1";

export function FormTextField({ type="text", children, error, warn, ok, ...props }) {
    return (
        <div>
            <input type={type} className="txt-box" {...props} />
            {error && <div className="text-red-800 mt-2 mb-2 flex items-center gap-2"><Error1 className="w-[1.6em] h-[1.6em" color="rgb(153, 27, 27)"/>{error}</div>}
            {warn && <div className="text-yellow-400">{warn}</div>}
            {ok && <div className="text-green-500">{ok}</div>}
        </div>
    )
}