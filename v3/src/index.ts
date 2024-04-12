import { parseLocatifyCsv } from './search/parseLocatifyCsv';

// Register Vanilla Web Components
import './web-components/icon';


// Merge any backend keys which were added to the locatify object with
// the frontend code. Allow the backend to override anything here as
// we'll assume that if it's doing it that it has a good reason to be.
const backendLocatify = window.locatify ?? {};
window.locatify = Object.assign({
    parseLocatifyCsv
}, backendLocatify);
