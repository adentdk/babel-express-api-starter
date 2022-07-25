import { Fragment } from 'react'
import classNames from 'classnames'
import { Menu, Transition } from '@headlessui/react'
import MenuAlt4Icon from '@heroicons/react/solid/MenuAlt4Icon'
import UserCircleIcon from '@heroicons/react/outline/UserCircleIcon'
import LogoutIcon from '@heroicons/react/outline/LogoutIcon'

export default function MainMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="w-full justify-center rounded-full bg-black bg-opacity-0 px-2 py-2 text-sm font-medium hover:bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <MenuAlt4Icon
            className="h-5 w-5 text-gray-900"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>  
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames('group flex w-full items-center rounded-md px-2 py-2 text-sm', {'bg-blue-500 bg-opacity-75 text-white': active})}
                >
                  <UserCircleIcon className={classNames("mr-2 h-5 w-5 text-gray-900", {'text-gray-100': active})} />
                  Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames('group flex w-full items-center rounded-md px-2 py-2 text-sm', {'bg-blue-500 bg-opacity-75 text-white': active})}
                >
                  <LogoutIcon className={classNames("mr-2 h-5 w-5 text-gray-900", {'text-gray-100': active})} />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}