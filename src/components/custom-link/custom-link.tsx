import { FC } from 'react'
import { Link, useMatch } from 'react-router-dom'

interface TCustomLink {
    to: string
    classes?: string
}

const CustomLink:FC<TCustomLink> = ({children, to, classes, ...props}) => {
    const match = useMatch(to)
    return (
        <Link
            to={to}
            style={{color: match ? 'white': '' }}
            className={`${match && 'active'} ${classes}`}
            {...props}
        >
        {children}
        </Link>
    )
}

export default CustomLink