

interface PolarTextProps {
    width?: number | string;
    height?: number | string;
    className?: string;
    children: string[];
    viewBox?: string;
}
/**
 * Yet another way to abuse CPU.
 * Render text on polar rings. Rotate the rings with different speeds.
 * At the moment awaiting for experimental features (side) to be implemented in browsers.
 * @param {PolarTextProps} props
 */
export default function PolarText(props: PolarTextProps) {
    const angle = 45
    const radius = 40
    const delta = 6
    return (
        <svg width={props.width} height={props.width} viewBox={props.viewBox || '0 0 100 25'} {...props}>
            {props.children.map((phrase, i) => (
                <g>
                    <path transform={`rotate(${i * angle} 50 50)`} id={`hexside-${i}`} 
                            d={`M ${50 - delta / 2 * i},50 
                                m -${radius - delta * i},0
                                a ${radius - delta * i},${radius - delta * i} 0 1,0 ${radius * 2 - delta * i},0 
                                a ${radius - delta * i},${radius - delta * i} 0 1,0 -${radius * 2 - delta * i},0`} 
                            style={{
                                opacity: 1,
                                stroke: `hsl(${i * -120}, 100%, 50%)`,
                                strokeWidth: 0.03,
                                strokeDasharray: "1,1",
                                fill: `none`,
                            }}
                        >
                    </path>
                    <text style={{
                            fontSize: "2.5px",
                            fontWeight: "100",
                            fill: i % 2 ? `#800856` : `#000082`,
                            opacity: .5,
                        }}>
                            <textPath href={`#hexside-${i}`} side="right">
                                {phrase}
                            </textPath>
                    </text>
                    <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            from={`${i * angle} 50 50`}
                            to={`${360 + i * angle} 50 50`}
                            dur={`${460 - i * 40}s`}
                            repeatCount="3" />
                </g>
            ))}
        </svg>
    )
}