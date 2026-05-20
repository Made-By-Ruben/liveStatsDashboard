type ConnectionStatus = 'connecting' | 'open' | 'error' | 'closed';

export class SseConnection<T> {
	data = $state<T | undefined>(undefined);
	status = $state<ConnectionStatus>('connecting');
	connection: EventSource | null = null;

	constructor(url: string) {
		if (window === undefined) return;
		this.connection = new EventSource(url);
		this.connection.onopen = () => (this.status = 'open');
		this.connection.onmessage = (ev) => {
			try {
				this.data = JSON.parse(ev.data) as T;
			} catch (error) {
				console.error('SSE parse error');
			}
		};
	}

	close() {
		this.connection?.close();
	}
}