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
 * @attr data-group-selector - The selector for the input group
 * @attr data-add-button-selector - The selector for the button that will add new input groups
 * @attr data-remove-group-selector - The selector for the button that will remove the input group
 */
class InputGroups extends HTMLElement {
    removeInputGroup(groupToRemove) {
        groupToRemove.remove();
    
        // Update the input names for the remaining groups
        const inputGroups = this.querySelectorAll(this.getAttribute('data-group-selector'));
        inputGroups.forEach((group, index) => {
            group.querySelectorAll('input').forEach(input => setInputGroupIndex(input, index));
        });

        if (inputGroups.length === 0) {
            this.dispatchEvent(new Event('no-groups-remaining', { bubbles: true }));
        }
    }

    connectedCallback() {
        requestAnimationFrame(() => {
            this.addGroupButton = document.querySelector(this.getAttribute('data-add-button-selector'));
            this.removeGroupSelector = this.getAttribute('data-remove-group-selector');
            this.shadowGroupCopy = this.querySelector(this.getAttribute('data-group-selector')).cloneNode(true);
            this.shadowGroupCopy.querySelectorAll('input').forEach(input => input.value = '');

            // Set up a listener for the original remove button
            const originalGroup = this.querySelector(this.getAttribute('data-group-selector'));
            this.querySelector(this.removeGroupSelector)?.addEventListener('click', e => {
                e.preventDefault();
                this.removeInputGroup(originalGroup);
            });
    
            this.addGroupButton?.addEventListener('click', e => {
                e.preventDefault();
                const newGroup = this.shadowGroupCopy.cloneNode(true);

                // Setup the remove button for the new group
                newGroup.querySelector(this.removeGroupSelector).addEventListener('click', e => {
                    e.preventDefault();
                    this.removeInputGroup(newGroup);
                });

                // Setup the input names for the new group
                const totalGroups = this.querySelectorAll(this.getAttribute('data-group-selector')).length;
                newGroup.querySelectorAll('input').forEach(input => setInputGroupIndex(input, totalGroups));

                this.appendChild(newGroup);

                if (totalGroups === 0) {
                    this.dispatchEvent(new Event('group-added', { bubbles: true }));
                }
            });
        });
    }
}

customElements.define('x-input-groups', InputGroups);
