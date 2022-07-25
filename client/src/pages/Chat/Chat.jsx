import useAuth from "../../hooks/useAuth"
import { socketChat } from "../../services/socket";
import { useCallback, useEffect } from "react"
import ChatContent from "./components/ChatContent"
import ContactSidebar from "./components/ContactSidebar"
import { useNavigate } from "react-router-dom";

function Chat() {
  const {token} = useAuth();
  const navigate = useNavigate();

  const connectSocket = useCallback(() => {
    socketChat.auth = {token};

    if (token) {
      socketChat.connect()
    }
  }, [token])

  useEffect(() => {
    connectSocket()

    navigate('/chats', {replace: true})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socketChat.onAny(args => {
      console.log(args)
    })

    return () => {
      socketChat.offAny(() => {
        console.log('offAny')
      })
    }
  }, [])

  return (
    <div className="bg-gray-100 h-screen p-0 xl:py-6 xl:px-8 flex items-center justify-center">
      <div className="bg-white w-screen xl:w-screen xl:max-w-screen-xl min-h-full xl:rounded-lg overflow-hidden">

        <div className="flex flex-row-reverse h-[calc(100vh)] xl:h-[calc(100vh-1.5rem)]">

          <ChatContent />

          <ContactSidebar />

        </div>

      </div >
    </div >
  )
}

export default Chat

