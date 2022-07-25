import ChatContent from "./components/ChatContent"
import ContactSidebar from "./components/ContactSidebar"

function Chat() {
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

