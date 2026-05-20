import { page } from '$app/state';

type ConnectionStatus = 'closed' | 'connecting' | 'open' | 'error';

export class SseConnection<T> {
	data = $state<T>();
	connection = $state<EventSource>();
    status = $state<ConnectionStatus>()
	constructor(url: string) {
		if (page === undefined) return;
        this.connection = new EventSource(url);
        this.connection.onopen = () => this.status = 'open';
        this.connection.onmessage = (ev) => {
            const data = JSON.parse(ev.data);
            this.data = data as T;
        };
	}

	close() {
        this.connection?.close()
    }
}
