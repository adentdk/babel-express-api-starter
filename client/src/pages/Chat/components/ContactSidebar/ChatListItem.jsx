import classNames from "classnames";

export default function ChatListItem({active, contact, className}) {
  return (
    <a href={`#${contact.id}`}>
      <div className={classNames("px-4 py-2 mb-2 rounded-lg h-16 flex items-center justify-between bg-white hover:bg-gray-100", {'bg-blue-500 hover:bg-blue-400': active }, className)}>
        <div className="flex flex-grow flex-col">
          <div className={classNames("font-medium text-md text-gray-900", { 'text-white': active })}>
            {contact.name}
          </div>
          <div className={classNames("font-normal text-md", { 'text-gray-100': active, 'text-gray-500': !active })}>
            <span className="whitespace-nowrap">
              {contact.lastMessage}
            </span>
          </div>
        </div>
        {contact.unread > 0 && (
          <div className="w-8">
            <div className={classNames({ 'bg-white text-blue-700': active, 'bg-blue-500 text-white': !active }, "h-6 w-6 rounded-full text-xs flex items-center justify-center p-1")}>
              {contact.unread}
            </div>
          </div>
        )}
      </div>
    </a>
  )
}