import classNames from "classnames";
import { useLocation } from "react-router-dom";

export default function ChatContent() {
  const {hash} = useLocation();
  return (
    <main
      id={hash.replace('#', '') || 'chatId'}
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


      <div className="px-1 pt-16 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50 hidden group-target:block">
        {CHATS.map((chat, index) => {
          const self = chat.senderId === 2;
          return (
            <div className={classNames("mb-4 mx-4 flex", { 'mt-4': index === 0, "justify-end": self })} key={chat.timestamp + index}>
              <div className={classNames(
                "p-2 rounded-md relative inline-block h-auto max-w-sm md:max-w-md",
                { "bg-white after:absolute after:w-0 after:h-0 after:right-auto after:-left-[10px] after:top-0 after:bottom-auto after:border-[10px] after:border-transparent after:border-t-white": !self },
                { "bg-blue-300 text-right after:absolute after:w-0 after:h-0 after:-right-[10px] after:left-auto after:top-0 after:bottom-auto after:border-[10px] after:border-transparent after:border-t-blue-300": self }
              )}>
                <div className="text-md">
                  <p>{chat.message}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </main>
  )
}

const CHATS = [
  {
    message: 'P',
    timestamp: '2020-01-01',
    senderId: 1
  },
  {
    message: 'P',
    timestamp: '2020-01-01',
    senderId: 1
  },
  {
    message: 'P',
    timestamp: '2020-01-01',
    senderId: 1
  },
  {
    message: 'P',
    timestamp: '2020-01-01',
    senderId: 1
  },
  {
    message: 'Halo kami dari pinjamindong memberitahukan bahwa anda telah memenangkan hadiah berupa mobile mewah',
    timestamp: '2020-01-01',
    senderId: 1
  },
  {
    message: 'wow',
    timestamp: '2020-01-01',
    senderId: 2
  },
]