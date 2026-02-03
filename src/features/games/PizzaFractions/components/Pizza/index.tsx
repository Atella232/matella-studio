import { useMemo } from 'react'
import { getSlicePath } from '../../utils/fractions'
import './Pizza.css'

interface PizzaProps {
    denominator: number
    selectedSlices: number[]
    onSliceClick: (index: number) => void
    disabled?: boolean
}

export function Pizza({ denominator, selectedSlices, onSliceClick, disabled = false }: PizzaProps) {
    const size = 300
    const center = size / 2
    const radius = (size / 2) - 20 // Leave margin for shadows
    const innerRadius = radius * 0.15 // Center circle radius

    // Generate slice paths
    const slices = useMemo(() => {
        return Array.from({ length: denominator }, (_, i) => ({
            index: i,
            path: getSlicePath(i, denominator, radius, center, center),
            isSelected: selectedSlices.includes(i)
        }))
    }, [denominator, selectedSlices, radius, center])

    // Generate random toppings for each slice
    const toppings = useMemo(() => {
        const allToppings: { cx: number; cy: number; type: 'pepperoni' | 'olive' | 'mushroom'; sliceIndex: number }[] = []

        slices.forEach((_, sliceIndex) => {
            const anglePerSlice = (2 * Math.PI) / denominator
            const midAngle = sliceIndex * anglePerSlice - Math.PI / 2 + anglePerSlice / 2

            // Add 2-3 toppings per slice at different distances from center
            const distances = [0.4, 0.6, 0.75]
            distances.forEach((dist, i) => {
                const offsetAngle = midAngle + (Math.random() - 0.5) * anglePerSlice * 0.5
                const cx = center + radius * dist * Math.cos(offsetAngle)
                const cy = center + radius * dist * Math.sin(offsetAngle)
                const types: ('pepperoni' | 'olive' | 'mushroom')[] = ['pepperoni', 'olive', 'mushroom']

                allToppings.push({
                    cx,
                    cy,
                    type: types[i % 3],
                    sliceIndex
                })
            })
        })

        return allToppings
    }, [slices, denominator, center, radius])

    const handleSliceClick = (index: number) => {
        if (!disabled) {
            onSliceClick(index)
        }
    }

    return (
        <div className="pizza-container">
            <svg
                className="pizza-svg"
                viewBox={`0 0 ${size} ${size}`}
                role="img"
                aria-label={`Pizza dividida en ${denominator} porciones`}
            >
                {/* Pizza crust (outer ring) */}
                <circle
                    className="pizza-crust"
                    cx={center}
                    cy={center}
                    r={radius + 10}
                />

                {/* Pizza sauce base */}
                <circle
                    className="pizza-sauce"
                    cx={center}
                    cy={center}
                    r={radius}
                />

                {/* Cheese layer (slices) */}
                {slices.map(slice => (
                    <path
                        key={slice.index}
                        d={slice.path}
                        className={`pizza-slice ${slice.isSelected ? 'selected' : ''}`}
                        onClick={() => handleSliceClick(slice.index)}
                        role="button"
                        aria-pressed={slice.isSelected}
                        aria-label={`Porción ${slice.index + 1} de ${denominator}`}
                        tabIndex={disabled ? -1 : 0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleSliceClick(slice.index)
                            }
                        }}
                    />
                ))}

                {/* Toppings */}
                {toppings.map((topping, i) => {
                    if (topping.type === 'pepperoni') {
                        return (
                            <circle
                                key={`topping-${i}`}
                                className="topping-pepperoni"
                                cx={topping.cx}
                                cy={topping.cy}
                                r={8}
                            />
                        )
                    }
                    if (topping.type === 'olive') {
                        return (
                            <circle
                                key={`topping-${i}`}
                                className="topping-olive"
                                cx={topping.cx}
                                cy={topping.cy}
                                r={5}
                            />
                        )
                    }
                    return (
                        <ellipse
                            key={`topping-${i}`}
                            className="topping-mushroom"
                            cx={topping.cx}
                            cy={topping.cy}
                            rx={7}
                            ry={5}
                            transform={`rotate(${Math.random() * 360} ${topping.cx} ${topping.cy})`}
                        />
                    )
                })}

                {/* Slice dividing lines */}
                {slices.map(slice => {
                    const angle = slice.index * (2 * Math.PI / denominator) - Math.PI / 2
                    const x2 = center + radius * Math.cos(angle)
                    const y2 = center + radius * Math.sin(angle)
                    return (
                        <line
                            key={`line-${slice.index}`}
                            className="pizza-lines"
                            x1={center}
                            y1={center}
                            x2={x2}
                            y2={y2}
                        />
                    )
                })}

                {/* Center circle */}
                <circle
                    className="pizza-center"
                    cx={center}
                    cy={center}
                    r={innerRadius}
                />

                {/* Selection indicators */}
                {slices.filter(s => s.isSelected).map(slice => {
                    const anglePerSlice = (2 * Math.PI) / denominator
                    const midAngle = slice.index * anglePerSlice - Math.PI / 2 + anglePerSlice / 2
                    const indicatorDist = radius * 0.5
                    const cx = center + indicatorDist * Math.cos(midAngle)
                    const cy = center + indicatorDist * Math.sin(midAngle)

                    return (
                        <text
                            key={`indicator-${slice.index}`}
                            className="slice-indicator"
                            x={cx}
                            y={cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            ✓
                        </text>
                    )
                })}
            </svg>
        </div>
    )
}
