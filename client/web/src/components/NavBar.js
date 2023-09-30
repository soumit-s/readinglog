import Link from "next/link"
import UserProfileCard from "./UserProfileCard"

const DEFAULT_ACTIONS = {
    'signIn': true,
    'join': false,
}

const LINKS = [
    { value: "Home", href: "/" },
    { value: "About", href: "/" },
]

export default function NavBar({ actions = DEFAULT_ACTIONS, userData }) {
    return (
        <nav className="flex justify-between items-center py-4">
            <div className="font-bold text-lg">Reading Log</div>
            <div className="flex items-center gap-8">
                <div className="flex gap-4">
                    {
                        LINKS.map((l, i) => (
                            <Link href={l.href} key={i}
                                className="text-base relative px-2 py-[0.4em] after:absolute after:left-1/2 after:w-0 after:top-0 after:bottom-0 after:border-b-[1px] after:border-t-[1px] after:border-dashed hover:after:left-0 hover:after:w-full after:border-emerald-800 after:transition-all"
                            >
                                {l.value}
                            </Link>
                        ))
                    }
                </div>
                {
                    userData && <UserProfileCard userData={userData} />
                }

                {
                    !userData && <div className="flex gap-4">
                        <Link href="/signin" className="text-base normal-button">Login</Link>
                        <Link href="/signup" className="text-base ok-button">Join</Link>
                    </div>
                }

            </div>

        </nav>
    )
}