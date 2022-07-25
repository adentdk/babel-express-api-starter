import classNames from "classnames";
import api from "../../../../services/api";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ChatContent() {
  const navigate = useNavigate();
  const { hash } = useLocation();

  const roomId = useMemo(() => hash.replace('#', '') || 'empty', [hash]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const [messages, setMessages] = useState([])

  const scrollToBottom = () => {
    const element = document.getElementById('messageScroll');

    element.scrollTop = element.scrollHeight
  }

  const getRoomMessage = useCallback(() => {
    if (roomId !== 'empty') {
      setLoading(true)
      api.get(`/v1/chat/rooms/${roomId}/messages`).then(({ data: responseData }) => {
        scrollToBottom()
        setMessages(responseData.data.messages);
        setError(false)
      }).catch((error) => {
        navigate('/chats', { replace: false, state: null })
        setMessages([]);
        setError(true)
      })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [navigate, roomId]);


  useEffect(() => {
    getRoomMessage()
  }, [getRoomMessage])

  return (
    <main
      id={roomId}
      className={classNames(
        "transition-[width]",
        "peer",
        "group",
        "w-0",
        "sm:w-1/3",
        "md:w-2/5",
        "lg:w-2/3",
        "target:w-full",
        "sm:target:w-full",
        "md:target:w-3/5",
        "lg:target:w-2/3",
        "overflow-hidden",
        "bg-pattern1",
        "relative"
      )}
    >
      {!error && (
        <Fragment>
          <header className="absolute z-10 left-0 right-0 hidden group-target:block">
            <nav className="bg-white h-16 px-4 flex items-center">
              <a href="/">

              </a>
              <div>
                <div className="font-md font-bold">Aden Trisna Daud Kurnia</div>
                <div className="font-xs text-gray-500">Last seen 3 minutes ago</div>
              </div>
            </nav>
          </header>


          <div id="messageScroll" className="px-1 pt-16 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50 hidden group-target:block">
            {loading && <div>loading</div>}
            {messages.map((message, index) => {
              const self = message.senderId === 1;
              return (
                <div id={`chat-${message.id}`} className={classNames("mb-4 mx-4 flex", { 'mt-4': index === 0, "justify-end": self })} key={message.createdAt + index}>
                  <div className={classNames(
                    "p-2 rounded-md relative inline-block h-auto max-w-sm md:max-w-md",
                    { "bg-white after:absolute after:w-0 after:h-0 after:right-auto after:-left-[10px] after:top-0 after:bottom-auto after:border-[10px] after:border-transparent after:border-t-white": !self },
                    { "bg-blue-300 text-right after:absolute after:w-0 after:h-0 after:-right-[10px] after:left-auto after:top-0 after:bottom-auto after:border-[10px] after:border-transparent after:border-t-blue-300": self }
                  )}>
                    <div className="text-md">
                      <p>{message.content}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Fragment>
      )}

    </main>
  )
}