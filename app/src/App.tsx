import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';

import { Body, Footer } from './components/layout';
import { LookupView, ResultsView } from './pages';

export function App() {

    return (
        <BrowserRouter>
            <Body>
                <Routes>
                    <Route path='/lookup/*' element={
                        <LookupView />
                    } />

                    <Route path='/results/*' element={
                        <ResultsView />
                    } />

                    <Route path='*' element={
                        <Navigate to='/lookup' replace={true} />
                    } />
                </Routes>
            </Body>
            <Footer />
        </BrowserRouter>
    );
}
