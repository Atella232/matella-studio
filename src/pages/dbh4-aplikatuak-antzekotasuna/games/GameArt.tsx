import { Car } from '../../../features/unit-v2/games/GameKit'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { thousandsSeparatorFor } from '../../../utils/numberFormat'
import type { SimilarityGameId } from './info'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import { SimilarityArt } from '../../dbh4-games/SimilarityGames'

/** Small illustration of each game; the art is the same in every language, only its thousands mark follows the language */
export function SimilarityGameArt({ game, language }: { game: SimilarityGameId; language: UnitLanguage }) {
    if (game === 'tower') return <SimilarityArt game="tower" />
    if (game === 'map') return <SimilarityArt game="map" />
    if (game === 'scale') return <SimilarityArt game="scale" />
    if (game === 'detective') return <DetectiveArt lines={['H/24 = 3/2 ?', 'k = √9 = 3', 'A′ = A · k²']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="r" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="r" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">{`1 : 50${language === 'ar' ? ' ' : thousandsSeparatorFor(language)}000`}</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['r=3 → A', '× 9', '2/4=3/x', 'x=6'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
