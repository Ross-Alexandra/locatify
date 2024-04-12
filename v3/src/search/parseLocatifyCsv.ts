export function parseLocatifyCsv(input: HTMLInputElement) {
    const form = document.querySelector('form.bulk-search');

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
        if (typeof csv !== "string") {
            return;
        }

        const rows = csv.split('\n');
        // skip header row
        rows.slice(1).forEach(row => {
            // Skip empty rows
            if (row.trim() === '') {
                return;
            }

            const columns = row.split(',');

            form.dispatchEvent(new CustomEvent('new-ip-group', {
                detail: {
                    ip: columns[0],
                    label: columns[1],
                }
            }));
        });
    }

    reader.readAsText(file);
}
