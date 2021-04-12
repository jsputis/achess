
import './App.css';
import React,{useState,useEffect,useRef} from "react";
import ChessBoard from 'chessboardjsx';
import Chess from "chess.js";
import aclogo from './chess/assets/aclogo.png';
import ccselogo from './chess/assets/ccse.jpg';

const container ={
  marginTop:"2rem",
  display:"flex",
  justifyContent:"space-around",
  alignItem:"center"
}

const headerBanner = {
  textAlign:"center",

}

function App() {
  const [fen,setFen] = useState("start")

  let game =useRef(null);
  useEffect(()=>{
    game.current = new Chess();
  },[])
  console.log(game)

  const onDrop=({sourceSquare,targetSquare}) =>{
    let move = game.current.move({
      from:sourceSquare,
      to: targetSquare
    })
    if(move ===null) return; // it is to check for illegal moves

    //provide the fen string
    setFen(game.current.fen())
  }

  const resetGame = () =>{
    game.current.clear();
    game.current.reset();
    setFen("start")
  }
  
  return (
    <>
      
      <div style={headerBanner}>
      <img src={aclogo} alt="Asian College Logo" width="200px" height="100px"/>
      <img src={ccselogo} alt="Asian College Logo" width="500px"/>
      <h1 style={{textAlign:"center"}}>2-Player Chess Game</h1>
      </div>
      
      {
        game.current && game.current.game_over() ? <div style={{textAlign:"center"}}><h1 style={{color:"red"}}>Game Over</h1> <button onClick={resetGame}>Play Again</button></div>:<span></span>
      }
    <div className="App" style={container}>
      
      <ChessBoard position={fen}
      onDrop={onDrop}/>
      
    </div>
    </>
  );
}

export default App;
