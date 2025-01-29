export default function Breadcrumb({ path }: { path: string[] }) {
  return (
    <nav className="text-gray-700 text-sm mb-4">
      {path.map((segment, index) => (
        <span key={index}>
          {index > 0 && " / "}
          {index === path.length - 1 ? (
            <span className="font-semibold">{segment}</span>
          ) : (
            <a href="/" className="hover:underline">
              {segment}
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}
