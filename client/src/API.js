const APIURL = 'http://localhost:1600';

export async function listLogEntries() {
    const response = await fetch(`${APIURL}/api/logs`);
    return response.json();
}

export async function createLogEntry(entry) {
    const response = await fetch(`${APIURL}/api/logs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    return response.json();
}

export async function deleteLogEntry(id) {
    const response = await fetch(`${APIURL}/api/logs/delete/${id}`, {
        method: 'DELETE'
    });
    return response.json();
}