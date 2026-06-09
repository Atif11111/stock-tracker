'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '../lib/constants';
import SearchCommand from './SearchCommand';

const NavItems = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(path);
  };

  return (
    <ul className="flex flex-col sm:flex-row gap-6 p-2 sm:gap-10 font-medium center-ed">
      {NAV_ITEMS.map((item) => (
        <li key={item.href}>
          {item.label === 'Search' ? (
            <SearchCommand
              renderAs="text"
              label={item.label}
            />
          ) : (
            <Link
              href={item.href}
              className={`text-gray-400 hover:text-gray-200 transition-colors duration-200 ${
                isActive(item.href) ? 'text-white' : ''
              }`}
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavItems;