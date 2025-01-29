import Link from "next/link";

export default function UserPanel() {
  return (
    <div className="absolute right-0 bg-white text-black rounded shadow-lg mt-2 w-40">
      <Link href="/favourite" className="block px-4 py-2 hover:bg-gray-100">
        Favourites
      </Link>
      <Link href="/purchased" className="block px-4 py-2 hover:bg-gray-100">
        Purchased
      </Link>
      <button className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left">
        Logout
      </button>
    </div>
  );
}
