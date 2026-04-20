import { Link } from 'wouter';
import { categoriesSorted, questionsByCategory } from '../../data/questions';
import { CategoryGroup } from './CategoryGroup';

export function Sidebar() {
  return (
    <aside
      className="border-end bg-body-tertiary d-flex flex-column"
      style={{ width: 280, minWidth: 280, height: '100vh', overflowY: 'auto' }}
    >
      <div className="px-3 py-3 border-bottom">
        <Link href="/">
          <a className="text-decoration-none text-body fw-bold">
            HTML &amp; CSS Practice
          </a>
        </Link>
      </div>
      <div className="py-2 flex-grow-1">
        {categoriesSorted.map((cat) => (
          <CategoryGroup
            key={cat.id}
            category={cat}
            questions={questionsByCategory[cat.id] ?? []}
          />
        ))}
      </div>
    </aside>
  );
}
