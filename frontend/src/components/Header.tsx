import { UserIcon } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  return (
    <div className="border-b border-border p-4 bg-muted">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Image
          className="h-8 w-auto"
          src="/logo.svg"
          width={257}
          height={51}
          alt="Puro Pollo Logo"
        />
        <button className="p-2 border border-border hover:border-primary/20 rounded-full hover:bg-primary/20 transition cursor-pointer">
          <UserIcon />
        </button>
      </div>
    </div>
  );
}
