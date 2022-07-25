import classNames from "classnames"
import api from "../../../../services/api"
import { useCallback, useEffect, useState } from "react"
import FormInput from "../../../../design-systems/molecules/FormInput"
import ChatListItem from "./ChatListItem"
import MainMenu from "./MainMenu"

export default function ContactSidebar() {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState([]);

  const getRooms = useCallback(() => {
    setLoading(true);

    api.get('/v1/chat/rooms').then(({ data: responseData }) => (
      setRooms(responseData.data.rooms)
    )).finally(() => {
      setLoading(false)
    })

  }, []);

  useEffect(() => {
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        {loading && <div>loading</div>}
        {rooms.map((room, index) => {
          const active = index === 1
          return (
            <ChatListItem
              key={room.id + index}
              active={active}
              room={room}
              className={classNames({ 'mt-4': index === 0 })}
            />
          )
        })}
      </div>
    </aside>
  )
}