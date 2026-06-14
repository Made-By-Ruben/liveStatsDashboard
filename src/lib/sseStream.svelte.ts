type ConnectionStatus = 'connecting' | 'open' | 'error' | 'closed';

export class SseConnection {
	data = $state<any>(undefined);
	error = $state<Event | null>(null);
	status = $state<ConnectionStatus>('connecting');
	connection: EventSource | null = null;

	constructor(url: string) {
		if (window === undefined) return;
		this.connection = new EventSource(url);
		this.connection.onerror = (ev) => {
			this.error = ev;
			this.status = 'error';
		};
		this.connection.onopen = () => (this.status = 'open');
		this.connection.onmessage = (ev) => {
			try {
				this.data = JSON.parse(ev.data);
			} catch (error) {
				console.error('SSE parse error');
			}
		};
	}

	close() {
		this.connection?.close();
	}
}
