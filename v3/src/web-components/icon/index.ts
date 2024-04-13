import accuracyTemplate from './icons/accuracy.html';
import bulkTemplate from './icons/bulk.html';
import clockTemplate from './icons/clock.html';
import errorTemplate from './icons/error.html';
import FileUploadTemplate from './icons/file-upload.html';
import LocationTemplate from './icons/location.html';
import manualTemplate from './icons/manual.html';
import missingTemplate from './icons/missing.html';
import newItemTemplate from './icons/new-item.html';
import postalCodeTemplate from './icons/postal-code.html';
import removeTemplate from './icons/remove.html';
import searchTemplate from './icons/search.html'; 

const iconTemplates = {
    accuracy: accuracyTemplate,
    bulk: bulkTemplate,
    clock: clockTemplate,
    error: errorTemplate,
    'file-upload': FileUploadTemplate,
    location: LocationTemplate,
    manual: manualTemplate,
    missing: missingTemplate,
    'new-item': newItemTemplate,
    'postal-code': postalCodeTemplate,
    remove: removeTemplate,
    search: searchTemplate,
};

export default class HTMLIcon extends HTMLElement {
    public connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['icon', 'size', 'color'];
    }

    public attributeChangedCallback() {
        this.render();
    }

    private render() {
        const icon = this.getAttribute('icon') as keyof typeof iconTemplates;
        this.innerHTML = iconTemplates[icon] ?? icon;

        requestAnimationFrame(() => {
            const size = this.getAttribute('size') ?? '24';
            const color = this.getAttribute('color') ?? 'var(--svg-stroke)';
    
            const svg = this.querySelector('svg');
            const path = this.querySelector('path');
    
            svg?.setAttribute('width', size);
            svg?.setAttribute('height', size);
            path?.setAttribute('fill', color);
        });
    }
}

customElements.define('x-icon', HTMLIcon);
