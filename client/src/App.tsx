import { Route, Switch } from 'wouter';
import { Sidebar } from './components/Sidebar/Sidebar';
import { HomePage } from './pages/HomePage';
import { QuestionPage } from './pages/QuestionPage';

function App() {
  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <main className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route<{ id: string }> path="/q/:id">
            {(params) => <QuestionPage id={params.id} />}
          </Route>
          <Route>
            <div className="p-4">
              <h3>Page not found</h3>
            </div>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
