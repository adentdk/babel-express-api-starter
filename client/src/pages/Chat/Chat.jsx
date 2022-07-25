import classNames from "classnames"
import FormInput from "../../design-systems/molecules/FormInput/FormInput"
import MainMenu from "../../components/MainMenu"
import ChatListItem from "../../components/ChatListItem";

function Chat() {
  return (
    <div className="bg-gray-100 h-screen p-0 xl:py-6 xl:px-8 flex items-center justify-center">
      <div className="bg-white w-screen xl:w-screen xl:max-w-screen-xl min-h-full xl:rounded-lg overflow-hidden">

        <div className="flex flex-row-reverse h-[calc(100vh)] xl:h-[calc(100vh-1.5rem)]">
          <main
            id="chat"
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

          <aside
            className={classNames(
              "transition-[width]",
              "w-full",
              "sm:w-2/3",
              "md:w-3/5",
              "lg:w-1/3",
              "peer-target:w-0",
              "sm:peer-target:w-0",
              "md:peer-target:w-2/5",
              "lg:peer-target:w-1/3",
              "overflow-hidden",
              "relative",
            )}
          >

            <header className="absolute z-10 left-0 right-0">
              <nav className="flex bg-white h-16 px-4 items-center w-full border-r-2 border-b-2">
                <MainMenu />

                <FormInput placeholder="Search" className="w-full ml-4" />
              </nav>
            </header>

            <div className="px-1 pt-16 h-full overflow-y-auto border-r-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
              {CONTACT.map((contact, index) => {
                const active = index === 1
                return (
                  <ChatListItem
                    key={contact.id + index}
                    active={active}
                    contact={contact}
                    className={classNames({ 'mt-4': index === 0 })}
                  />
                )
              })}
            </div>
          </aside>


        </div>

      </div >
    </div >
  )
}

export default Chat

const CONTACT = [
  {
    id: 'chatid',
    name: 'Aden trisna',
    lastMessage: 'halo ini adalah data yang palsu',
    lastMessageAt: '2022-08-01',
    unread: 1,
  },
  {
    id: 'chatid',
    name: 'Aden trisna',
    lastMessage: 'halo ini adalah data yang palsu',
    lastMessageAt: '2022-08-01',
    unread: 12,
  },
  {
    id: 'chatid',
    name: 'Aden trisna',
    lastMessage: 'halo ini adalah data yang palsu',
    lastMessageAt: '2022-08-01',
    unread: 0,
  },
  {
    id: 'chatid',
    name: 'Aden trisna',
    lastMessage: 'halo ini adalah data yang palsu',
    lastMessageAt: '2022-08-01',
    unread: 0,
  },
  {
    id: 'chatid',
    name: 'Aden trisna',
    lastMessage: 'halo ini adalah data yang palsu',
    lastMessageAt: '2022-08-01',
    unread: 0,
  },
  {
    id: 'chatid',
    name: 'Aden trisna',
    lastMessage: 'halo ini adalah data yang palsu',
    lastMessageAt: '2022-08-01',
    unread: 0,
  },
  {
    id: 'chatid',
    name: 'Aden trisna',
    lastMessage: 'halo ini adalah data yang palsu',
    lastMessageAt: '2022-08-01',
    unread: 0,
  },
  {
    id: 'chatid',
    name: 'Aden trisna',
    lastMessage: 'halo ini adalah data yang palsu',
    lastMessageAt: '2022-08-01',
    unread: 0,
  },
  {
    id: 'chatid',
    name: 'Aden trisna',
    lastMessage: 'halo ini adalah data yang palsu',
    lastMessageAt: '2022-08-01',
    unread: 0,
  },
  {
    id: 'chatid',
    name: 'Aden trisna',
    lastMessage: 'halo ini adalah data yang palsu',
    lastMessageAt: '2022-08-01',
    unread: 0,
  },
  {
    id: 'chatid',
    name: 'Aden trisna',
    lastMessage: 'halo ini adalah data yang palsu',
    lastMessageAt: '2022-08-01',
    unread: 0,
  },
]

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