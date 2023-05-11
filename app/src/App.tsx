import { Body, Footer } from './components/layout';
import { LookupView } from './pages/lookup-view';

export function App() {
    return (
        <>
            <Body>
                <LookupView />
            </Body>
            <Footer />
        </>
    );
}
