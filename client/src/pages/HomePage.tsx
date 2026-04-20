import { Link } from 'wouter';
import { useAtomValue } from 'jotai';
import { bundle, categoriesSorted, questionsByCategory } from '../data/questions';
import { progressAtom } from '../state/atoms';

export function HomePage() {
  const progress = useAtomValue(progressAtom);
  const total = bundle.questions.length;
  const solved = bundle.questions.filter(
    (q) => progress[q.id]?.status === 'correct'
  ).length;

  return (
    <div className="p-4" style={{ maxWidth: 900 }}>
      <h2>HTML &amp; CSS Practice</h2>
      <p className="text-muted">
        Work through small HTML/CSS exercises. Write code in the editor, hit
        <strong> Run tests</strong>, and your progress is saved locally.
      </p>
      <div className="mb-4">
        <strong>Progress:</strong> {solved} / {total} questions completed
      </div>

      {categoriesSorted.map((cat) => {
        const questions = questionsByCategory[cat.id] ?? [];
        return (
          <section key={cat.id} className="mb-4">
            <h5>{cat.name}</h5>
            <ul className="list-unstyled">
              {questions.map((q) => {
                const status = progress[q.id]?.status ?? 'untried';
                return (
                  <li key={q.id} className="py-1">
                    <span className="me-2" style={{ display: 'inline-block', width: 18 }}>
                      {status === 'correct' ? '✅' : status === 'incorrect' ? '❌' : '•'}
                    </span>
                    <Link href={`/q/${q.id}`}>
                      <a className="text-decoration-none">
                        {String(q.order).padStart(2, '0')}. {q.title}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
