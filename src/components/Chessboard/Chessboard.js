import React, { useEffect, useRef, useState } from 'react';
import "./Chessboard.css";
import Tile from "../Tile/Tile.js";
import Referee from '../../referee/Referee.js';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
    image: string;
    x: number;
    y: number;
    type: PieceType;
    team: TeamType;
    enPassant?: boolean;
}

const TeamType = {
    OPPONENT: 'OPPONENT',
    OUR: 'OUR'
  };
  
  const PieceType = {
    PAWN: 'PAWN',
    BISHOP: 'BISHOP',
    KNIGHT: 'KNIGHT',
    ROOK: 'ROOK',
    QUEEN: 'QUEEN',
    KING: 'KING'
  };

const initialBoardState= [];

for (let p = 0; p < 2; p++) {
    const teamType= (p === 0) ? TeamType.OPPONENT : TeamType.OUR;
    const type = (teamType === TeamType.OPPONENT) ? "b" : "w";
    const y = (teamType === TeamType.OPPONENT) ? 7 : 0;

    initialBoardState.push({ image: require(`../../assests/images/elephant_${type}.png`), x: 0, y, type: PieceType.ROOK, team: teamType });
    initialBoardState.push({ image: require(`../../assests/images/elephant_${type}.png`), x: 7, y, type: PieceType.ROOK, team: teamType });
    initialBoardState.push({ image: require(`../../assests/images/horse_${type}.png`), x: 1, y, type: PieceType.KNIGHT,team: teamType });
    initialBoardState.push({ image: require(`../../assests/images/horse_${type}.png`), x: 6, y, type: PieceType.KNIGHT, team: teamType });
    initialBoardState.push({ image: require(`../../assests/images/bishop_${type}.png`), x: 2, y, type: PieceType.BISHOP, team: teamType });
    initialBoardState.push({ image: require(`../../assests/images/bishop_${type}.png`), x: 5, y, type: PieceType.BISHOP, team: teamType });
    initialBoardState.push({ image: require(`../../assests/images/king_${type}.png`), x: 3, y, type: PieceType.KING, team: teamType });
    initialBoardState.push({ image: require(`../../assests/images/queen_${type}.png`), x: 4, y, type: PieceType.QUEEN, team: teamType });
}

for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: require("../../assests/images/pawn_b.png"), x: i, y: 6, type: PieceType.PAWN, team: TeamType.OPPONENT });
}

for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: require("../../assests/images/pawn_w.png"), x: i, y: 1, type: PieceType.PAWN, team: TeamType.OUR });
}

// pieces.push({ image: require("../../assests/images/elephant_w.png"), x: 0, y: 0 });
// pieces.push({ image: require("../../assests/images/elephant_w.png"), x: 7, y: 0 });
// pieces.push({ image: require("../../assests/images/horse_w.png"), x: 1, y: 0 });
// pieces.push({ image: require("../../assests/images/horse_w.png"), x: 6, y: 0 });
// pieces.push({ image: require("../../assests/images/bishop_w.png"), x: 2, y: 0 });
// pieces.push({ image: require("../../assests/images/bishop_w.png"), x: 5, y: 0 });
// pieces.push({ image: require("../../assests/images/king_w.png"), x: 4, y: 0 });
// pieces.push({ image: require("../../assests/images/queen_w.png"), x: 3, y: 0 });

export default function Chessboard(){
    const [activePiece, setActivePiece]= useState(null); 
    const [gridX, setGridX]= useState(0);
    const [gridY, setGridY]= useState(0);
    const [pieces, setPieces]= useState(initialBoardState);
    const chessboardRef= useRef(null);
    const referee = new Referee(PieceType, TeamType);

    function grabPiece(e) {
        const element = e.target;
        const chessboard= chessboardRef.current;
        if (element.classList.contains("chess-piece") && chessboard) {
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
            setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)));
            const x= e.clientX - 50;
            const y= e.clientY - 50;
            element.style.position= "absolute";
            element.style.left= `${x}px`;
            element.style.top= `${y}px`;
            setActivePiece(element);
        }
    }

    function movePiece(e) {
        const chessboard= chessboardRef.current;
        if (activePiece && chessboard) {
            const minX= chessboard.offsetLeft - 25;
            const minY= chessboard.offsetTop - 25;
            const maxX= chessboard.offsetLeft + chessboard.clientWidth - 75;
            const maxY= chessboard.offsetTop + chessboard.clientHeight - 75;
            const x= e.clientX - 50;
            const y= e.clientY - 50;
            activePiece.style.position= "absolute";
            // activePiece.style.left= `${x}px`;
            // activePiece.style.top= `${y}px`;
           
            if(x < minX){
                activePiece.style.left = `${minX}px`;    
            }
            else if(x > maxX){
                activePiece.style.left = `${maxX}px`;
            }
            else{
                activePiece.style.left = `${x}px`;
            }

            if(y < minY){
                activePiece.style.top = `${minY}px`;    
            }
            else if(y > maxY){
                activePiece.style.top = `${maxY}px`;
            }
            else{
                activePiece.style.top = `${y}px`;
            }
        }
    }

    function dropPiece(e) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));
            const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY);
    
            if (currentPiece) {
                const updatedPieces = [];
                const validMove = referee.isValidMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces);
                const isEnPassantMove = referee.isEnPassantMove(gridX, gridY, x, y, pieces, currentPiece.type, currentPiece.team);
                const pawnDirection= currentPiece.team === TeamType.OUR ? 1 : -1;
                if (isEnPassantMove) {
                    pieces.forEach((piece) => {
                        if (piece.x === gridX && piece.y === gridY) {
                            piece.enPassant = false;
                            updatedPieces.push({ ...piece, x, y });
                        }
                        else if (!(piece.x === x && piece.y === y - pawnDirection)) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            updatedPieces.push(piece);
                        }
                    });
                }
    
                if (validMove) {
                    pieces.forEach((piece) => {
                        if (piece.x === gridX && piece.y === gridY) {
                            if (Math.abs(gridY - y) === 2 && piece.type === PieceType.PAWN) {
                                piece.enPassant = true;
                            } else {
                                piece.enPassant = false;
                            }
                            updatedPieces.push({ ...piece, x, y });
                        } else if (!(piece.x === x && piece.y === y)) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            updatedPieces.push(piece);
                        }
                    });
                    setPieces(updatedPieces);
                } else {
                    // Reset the position if the move is not valid
                    activePiece.style.position = 'relative';
                    activePiece.style.removeProperty('top');
                    activePiece.style.removeProperty('left');
                }
            }
            setActivePiece(null);
        }
    }
    
    

    let board = [];

        for (let j = verticalAxis.length - 1; j >= 0; j--) {
            for (let i = 0; i < horizontalAxis.length; i++) {
                const number = j + i + 2;
                let image = undefined;
                pieces.forEach((p) => {
                if (p.x === i && p.y === j) {
                    image = p.image;
                }
            });
            board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
            }
        }

    return (
        <div 
            onMouseMove={(e) => movePiece(e)} 
            onMouseDown={(e) => grabPiece(e)} 
            onMouseUp={(e) => dropPiece(e)}
            id='chessboard'
            ref={chessboardRef}>
            {board}
        </div>
    );
}
