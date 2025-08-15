import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link href="/Admin">Dashboard</Link>
          </li>
          <li>
            <Link href="/Admin/capabilities">Capabilities</Link>
          </li>
          <li>
            <Link href="/Admin/questions">Questions</Link>
          </li>
          <li>
            <Link href="/Admin/results">Results</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;