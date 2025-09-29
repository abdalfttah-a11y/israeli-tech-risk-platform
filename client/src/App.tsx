import { Switch, Route } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Dashboard from "./pages/Dashboard"
import Companies from "./pages/Companies"
import Applications from "./pages/Applications"
import AcademicResearch from './pages/AcademicResearch'
import WarCrimesExposed from './pages/WarCrimesExposed'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background" dir="rtl">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/companies" component={Companies} />
          <Route path="/applications" component={Applications} />
          <Route path="/academic-research" component={AcademicResearch} />
          <Route path="/war-crimes-exposed" component={WarCrimesExposed} />
        </Switch>
      </div>
    </QueryClientProvider>
  )
}
