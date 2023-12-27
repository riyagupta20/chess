export const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
    image: string;
    x: number;
    y: number;
    type: PieceType;
    team: TeamType;
    enPassant?: boolean;
}

export const TeamType={
    OPPONENT: 'OPPONENT',
    OUR: 'OUR',
}

export const PieceType={
    PAWN: 'PAWN',
    BISHOP: 'BISHOP',
    KNIGHT: 'KNIGHT',
    ROOK: 'ROOK',
    QUEEN: 'QUEEN',
    KING: 'KING',
}
export const initialBoardState: Piece[] = [
    initialBoardState.push({ image: require(`../assests ${TeamType.OPPONENT}.png`), x:0, y:7, type: PieceType.ROOK, team: TeamType }),
    initialBoardState.push({ image: require(`../../assests/images/elephant_${TeamType.OPPONENT}.png`), x:7, y:7, type: PieceType.ROOK, team: TeamType }),
    initialBoardState.push({ image: require(`../../assests/images/horse_${TeamType.OPPONENT}.png`), x:1, y:7, type: PieceType.KNIGHT,team: TeamType }),
    initialBoardState.push({ image: require(`../../assests/images/horse_${TeamType.OPPONENT}.png`), x:6, y:7, type: PieceType.KNIGHT, team: TeamType }),
    initialBoardState.push({ image: require(`../../assests/images/bishop_${TeamType.OPPONENT}.png`), x:2, y:7, type: PieceType.BISHOP, team: TeamType }),
    initialBoardState.push({ image: require(`../../assests/images/bishop_${TeamType.OPPONENT}.png`), x:5, y:7, type: PieceType.BISHOP, team: TeamType }),
    initialBoardState.push({ image: require(`../../assests/images/king_${TeamType.OPPONENT}.png`), x:3, y:7, type: PieceType.KING, team: TeamType }),
    initialBoardState.push({ image: require(`../../assests/images/queen_${TeamType.OPPONENT}.png`), x:4, y:7, type: PieceType.QUEEN, team: TeamType }),

];
