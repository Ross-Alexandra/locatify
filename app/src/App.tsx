import { api } from './services';
 
export function App() {
    return (
        <div>
            <p>Start Hacking!</p>
            <button
                onClick={async () => {
                    const response = await api.get('/health-check');
                    console.log(response);
                }}
            >Health Check</button>
        </div>
    );
}
