const APIURL = 'http://localhost:1600';

export async function listLogEntries() {
    const response = await fetch(`${APIURL}/api/logs`);
    return response.json();
}