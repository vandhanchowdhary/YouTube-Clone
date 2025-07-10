function Header({ toggleSidebar }) {
  return (
    <header className="flex items-center justify-between bg-gray-800 text-white p-4">
      <div className="flex items-center gap-2">
        <button onClick={toggleSidebar}>☰</button>
        <h1 className="text-xl font-bold">YouTube Clone</h1>
      </div>
      <button className="bg-blue-600 px-4 py-1 rounded">Sign In</button>
    </header>
  );
}

export default Header;
