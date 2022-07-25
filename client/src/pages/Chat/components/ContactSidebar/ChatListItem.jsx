import classNames from "classnames";
import { useMemo } from "react";
import { dayDiff, timeAgo, getFormattedDate } from "../../../../utils/date";

export default function ChatListItem({active, room, className}) {

  const lastMessageAt = useMemo(() => {
    let result = '';
    const daydiff = Math.abs(dayDiff(new Date(), new Date(room.lastMessageAt)));

    if (daydiff > 0) {
      result = getFormattedDate(new Date(room.lastMessageAt), 'dd mm yyyy');
    }

    result = timeAgo(new Date(room.lastMessageAt))

    return result;
  }, [room.lastMessageAt])

  return (
    <a href={`#${room.id}`}>
      <div className={classNames("px-4 py-2 mb-2 rounded-lg h-16 flex items-center justify-between bg-white hover:bg-gray-100", {'bg-blue-500 hover:bg-blue-400': active }, className)}>
        <div className="flex flex-grow flex-col">
          <div className={classNames("font-medium text-md text-gray-900", { 'text-white': active })}>
            {room.name}
          </div>
          <div className={classNames("font-normal text-md", { 'text-gray-100': active, 'text-gray-500': !active })}>
            <span className="whitespace-nowrap">
              {room.lastMessage}
            </span>
          </div>
        </div>
        <div>
          <div>{lastMessageAt}</div>
          {room.unread > 0 && (
            <div className="w-8">
              <div className={classNames({ 'bg-white text-blue-700': active, 'bg-blue-500 text-white': !active }, "h-6 w-6 rounded-full text-xs flex items-center justify-center p-1")}>
                {room.unread}
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  )
}