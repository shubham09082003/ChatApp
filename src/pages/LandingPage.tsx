import { useState } from "react"
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const [roomId , setRoomId] = useState("");
    const navigate = useNavigate();
  return (
    <div className="bg-black h-screen overflow-hidden">
        <div className="flex flex-col w-[50%] mx-auto text-center border border-gray-600 rounded-lg shadow-md p-10 mt-[30vh]">
            <div className="flex text-center justify-center gap-2">
                <img src={"chat-icon.png"} width={30}/>
                <h1 className="text-white text-2xl">Real Time Chat App</h1>
            </div>
            <p className="text-gray-600">temporary deleted after all user exit</p>
            <input onChange={(e) => {
                setRoomId(e.target.value);
            }} className="border border-gray-400 rounded p-3 text-white mt-2" type="text" placeholder="Enter room Id"></input>
            <button onClick={() => {
                navigate(`/chat/${roomId}`)
            }} className="bg-white text-black p-3 text-md rounded mt-2">Create New Room</button>
        </div>
    </div>
  )
}

export default LandingPage