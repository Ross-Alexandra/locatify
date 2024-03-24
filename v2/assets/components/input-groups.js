function setInputGroupIndex(input, index) {
    const name = input.getAttribute('name');
    input.setAttribute('name', name.replace(/\[\d\]/, `[${index}]`));
}

/**
 * Input Groups Component (Web Component)
 * This component should be provided a template `div` which will
 * be used to create the input group.
 * 
 * The original input group should match the structure of the rest of the
 * input groups.
 * 
 * @attr default-empty - If provided, the component will remove the original input group when the component is connected.
 * 
 * @listens input-groups-remove-group - Removes the input group provided in the event detail from the component.
 * @listens input-groups-add-group - Adds a new input group to the component. If the event detail is a list, each
 * item in the list will be applied as the value for the input in the new group matching the index.
*/
class InputGroups extends HTMLElement {
    constructor() {
        super();

        this.addEventListener('input-groups-add-group', e => {
            const groupsToAdd = this.shadowGroupCopy.querySelectorAll('input[name]').length;
            const values = e.detail instanceof Array ? e.detail : [];

            if (values.length === groupsToAdd || values.length === 0) {
                this.addInputGroup(...values);
            } else {
                throw new Error('The number of values provided does not match the number of inputs in the group');
            }
        });
        
        this.addEventListener('input-groups-remove-group', e => {
            this.removeInputGroup(e.detail);
        });

    }

    connectedCallback() {
        requestAnimationFrame(() => {
            const originalRoot = this.querySelector('& > *');
            this.shadowGroupCopy = originalRoot.cloneNode(true);
            this.shadowGroupCopy.querySelectorAll('input').forEach(input => input.value = '');

            if (this.hasAttribute('default-empty')) {
                originalRoot.remove();
            }
        });
    }

    removeInputGroup(groupToRemove) {
        groupToRemove.remove();
    
        // Update the input names for the remaining groups
        const inputGroups = this.querySelectorAll('& > *');
        inputGroups.forEach((group, index) => {
            group.querySelectorAll('input').forEach(input => setInputGroupIndex(input, index));
        });

        if (inputGroups.length === 0) {
            this.dispatchEvent(new CustomEvent('input-groups-empty', { bubbles: true }));
        }
    }

    /**
     * Adds a new input group to the component
     * 
     * @param  {...string} values 
     */
    addInputGroup(...values) {
        const newGroup = this.shadowGroupCopy.cloneNode(true);

        // Setup the input names for the new group
        const totalGroups = this.querySelectorAll('& > *').length;

        newGroup.querySelectorAll('input').forEach((input, index) => {
            setInputGroupIndex(input, totalGroups)
            input.value = values[index] || '';
        });

        this.appendChild(newGroup);

        if (totalGroups === 0) {
            this.dispatchEvent(new CustomEvent('input-groups-not-empty', { bubbles: true }));
        }
    }
}

customElements.define('x-input-groups', InputGroups);
