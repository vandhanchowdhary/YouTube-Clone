function Header({ toggleSidebar }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-gray-800 text-white flex items-center justify-between h-16 px-4 shadow">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-xl">
          ☰
        </button>
        <h1 className="text-lg font-bold">YouTube Clone</h1>
      </div>
      <button className="bg-blue-600 px-4 py-1 rounded">Sign In</button>
    </header>
  );
}

export default Header;