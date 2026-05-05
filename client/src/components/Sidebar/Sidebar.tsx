import { useState } from 'react';
import { Link } from 'wouter';
import { categoriesSorted, questionsByCategory } from '../../data/questions';
import { CategoryGroup } from './CategoryGroup';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <aside
        className="border-end bg-body-tertiary d-flex flex-column align-items-center"
        style={{ width: 40, minWidth: 40, height: '100vh' }}
      >
        <button
          type="button"
          className="btn btn-sm btn-link p-2"
          title="Show question list"
          onClick={() => setCollapsed(false)}
          aria-label="Show question list"
        >
          »
        </button>
      </aside>
    );
  }

  return (
    <aside
      className="border-end bg-body-tertiary d-flex flex-column"
      style={{ width: 280, minWidth: 280, height: '100vh', overflowY: 'auto' }}
    >
      <div className="px-3 py-3 border-bottom d-flex align-items-center justify-content-between">
        <Link href="/">
          <a className="text-decoration-none text-body fw-bold">
            HTML &amp; CSS Practice
          </a>
        </Link>
        <button
          type="button"
          className="btn btn-sm btn-link p-0 ms-2"
          title="Hide question list"
          onClick={() => setCollapsed(true)}
          aria-label="Hide question list"
        >
          «
        </button>
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
