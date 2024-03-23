function onUploadCSV(input) {
    const form = document.querySelector('form.bulk-search');
    const inputGroups = form.querySelector('x-input-groups');

    // The CSV file has the following format:
    // - The first row is the header row
    // - The rest of the rows are the data rows
    // - The data rows have the following columns:
    //   - IP Address
    //   - Label
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const csv = e.target.result;
        const rows = csv.split('\n');

        rows.slice(1).forEach(row => {
            // Skip empty rows
            if (row.trim() === '') {
                return;
            }

            const columns = row.split(',');

            inputGroups.dispatchEvent(new CustomEvent('input-groups-add-group', {
                detail: [columns[0], columns[1]]
            }));
        });

        enableUI(form);
    }

    reader.readAsText(file);
}

function enableUI(form) {
    form.querySelector('button[type="submit"]').removeAttribute('disabled');
    form.querySelector('.ip-table').setAttribute('data-visible', 'true');
}

