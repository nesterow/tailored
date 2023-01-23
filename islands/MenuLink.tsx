// deno-lint-ignore-file no-window-prefix
import ColorfulLink, {ColorfulLinkProps} from "../components/ColorfulLink.tsx"
import {useState, useEffect} from 'preact/hooks'


/**
 * `props.href` must start with '/'
 **/
export default function MenuLink(props: ColorfulLinkProps){ 
    const [active, setActive] = useState(false)

    const listener = function () {
        const fullPath = location.pathname + location.search + location.hash
        if (fullPath === props.href) {
            setActive(true)
        } else {
            setActive(false)
        }
    }

    useEffect(() => {
        listener() 
        window.addEventListener('popstate', listener)
        return () => {
            window.removeEventListener('popstate', listener)
        }
    }, [])

    return (
        <ColorfulLink {...props} active={active} onClick={() => setActive(true)}/>
    )
}