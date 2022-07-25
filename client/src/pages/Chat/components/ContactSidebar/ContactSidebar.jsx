import classNames from "classnames"
import FormInput from "../../../../design-systems/molecules/FormInput"
import ChatListItem from "./ChatListItem"
import MainMenu from "./MainMenu"

export default function ContactSidebar() {
  return (
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
  )
}

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