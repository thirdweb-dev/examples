
import { useState } from "react";
import './GameModule.css';
import ModalComponent from "./ModalComponent"

const GameModule = () => {

let [showModal, setModal] = useState(false);
  
  return (
  <>
  <div className="game-container">
  <button type="button" style={{padding: "12px 20px", width: "300px"}} onClick={() => {
          setModal(true);
        }}>I want to play a game!</button>
  </div>

  {showModal && <ModalComponent setOpenModal={setModal} />}
  
  </>
  );
};
export default GameModule;