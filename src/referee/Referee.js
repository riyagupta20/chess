export default class Referee {
    constructor(pieceType, teamType) {
        this.pieceType = pieceType;
        this.teamType = teamType;
    }

    tileIsEmptyOrOccupiedByOppenent(x, y, boardState, team) {
        return !this.tileIsOccupied(x, y, boardState) || this.tileIsOccupiedByOppenent(x, y, boardState, team);
    }
    tileIsOccupied(x, y, boardState) {
        if (!Array.isArray(boardState)) {
            console.error("Invalid boardState: Expected an array.");
            return false;
        }
        const piece = boardState.find((p) => p.x === x && p.y === y);
        return piece !== undefined;
    }
    tileIsOccupiedByOppenent(x, y, boardState, team) {
        const piece = boardState.find((p) => p.x === x && p.y === y && p.team !== team);
        return piece !== undefined;
    }
    isEnPassantMove(px, py, x, y, type, team, boardState) {
        const pawnDirection = team === this.teamType.OUR ? 1 : -1;
        if (type === this.pieceType.PAWN) {
            if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
                const piece = boardState.find((p) => p.x === x && p.y === y + pawnDirection && p.enPassant === true);
                return piece !== undefined;
            }
        }
        return false;
    }
    isValidMove(px, py, x, y, type, team, boardState) {

        // Pawn
        if (type === this.pieceType.PAWN) {
            const specialRow = team === this.teamType.OUR ? 1 : 6;
            const pawnDirection = team === this.teamType.OUR ? 1 : -1;
            if (px === x && py === specialRow && y - py === 2 * pawnDirection && !this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y - pawnDirection, boardState)) {
                return true;
            } else if (px === x && y - py === pawnDirection && !this.tileIsOccupied(x, y, boardState)) {
                return true;
            } else if (x - px === -1 && y - py === pawnDirection && this.tileIsOccupiedByOppenent(x, y, boardState, team)) {
                console.log("Upper bottom left");
                return true;
            } else if (x - px === 1 && y - py === pawnDirection && this.tileIsOccupiedByOppenent(x, y, boardState, team)) {
                console.log("Upper bottom right");
                return true;
            }
        }

        // Knight
        else if (type === this.pieceType.KNIGHT) {
            for (let i = -1; i < 2; i += 2) {
                for (let j = -1; j < 2; j += 2) {
                    if (y - py === 2 * i) {
                        if (x - px === j) {
                            const destinationPiece = boardState.find((p) => p.x === x && p.y === y);
                            return !destinationPiece || (destinationPiece && destinationPiece.team !== team);
                        }
                    }
                    if (x - px === 2 * i) {
                        if (y - py === j) {
                            const destinationPiece = boardState.find((p) => p.x === x && p.y === y);
                            return !destinationPiece || (destinationPiece && destinationPiece.team !== team);
                        }
                    }
                }
            }
        }

        // Bishop
        else if (type === this.pieceType.BISHOP) {
            const dx = Math.abs(x - px);
            const dy = Math.abs(y - py);
            if (dx !== dy) {
                return false;
            }
            const xDirection = x > px ? 1 : -1;
            const yDirection = y > py ? 1 : -1;
            for (let i = 1; i < dx; i++) {
                const checkX = px + i * xDirection;
                const checkY = py + i * yDirection;
                if (this.tileIsOccupied(checkX, checkY, boardState)){
                    return false;
                }
            }
            if (!this.tileIsOccupied(x, y, boardState) || this.tileIsOccupiedByOppenent(x, y, boardState, team)) {
                return true;
            }
        }

        // Rook
        // Rook
else if (type === this.pieceType.ROOK) {
    if (px === x) {
        console.log("Moving Vertical");
        if (y < py) {
            console.log("Down");
            for (let i = 1; i < 8; i++) {
                let passedPosition = { x: px, y: py - i };
                if (passedPosition.x === x && passedPosition.y === y) {
                    console.log("Arrived");
                    return true;
                }
            }
        } else if (y > py) {
            console.log("Up");
            for (let i = 1; i < 8; i++) {
                let passedPosition = { x: px, y: py + i };
                if (passedPosition.x === x && passedPosition.y === y) {
                    console.log("Arrived");
                    return true;
                }
            }
        }
    } else if (py === y) {
        console.log("Moving Horizontal");
        if (x < px) {
            console.log("Left");
            for (let i = 1; i < 8; i++) {
                let passedPosition = { x: px - i, y: py };
                if (passedPosition.x === x && passedPosition.y === y) {
                    console.log("Arrived");
                    return true;
                }
            }
        } else if (x > px) {
            console.log("Right");
            for (let i = 1; i < 8; i++) {
                let passedPosition = { x: px + i, y: py };
                if (passedPosition.x === x && passedPosition.y === y) {
                    console.log("Arrived");
                    return true;
                }
            }
        }
    }
}


        // Queen
        else if (type === this.pieceType.QUEEN) {
            const dx = Math.abs(x - px);
            const dy = Math.abs(y - py);
            if (dx === dy) {
                const xDirection = x > px ? 1 : -1;
                const yDirection = y > py ? 1 : -1;
                for (let i = 1; i < dx; i++) {
                    const checkX = px + i * xDirection;
                    const checkY = py + i * yDirection;
                    if (this.tileIsOccupied(checkX, checkY, boardState)) {
                        return false;
                    }
                }
                if (this.tileIsOccupiedByOppenent(x, y, boardState, team) || !this.tileIsOccupied(x, y, boardState)) {
                    return true;
                }
            } else if (px === x || py === y) {
                if (px === x) {
                    for (let i = 1; i < 8; i++) {
                        let passedPosition = { x: px, y: py + i * Math.sign(y - py) };
                        if (passedPosition.x === x && passedPosition.y === y) {
                            return this.tileIsOccupiedByOppenent(x, y, boardState, team) || !this.tileIsOccupied(x, y, boardState);
                        }
                    }
                } else if (py === y) {
                    for (let i = 1; i < 8; i++) {
                        let passedPosition = { x: px + i * Math.sign(x - px), y: py };
                        if (passedPosition.x === x && passedPosition.y === y) {
                            return this.tileIsOccupiedByOppenent(x, y, boardState, team) || !this.tileIsOccupied(x, y, boardState);
                        }
                    }
                }
            }
            return false;
        }
        return false;
    }
}