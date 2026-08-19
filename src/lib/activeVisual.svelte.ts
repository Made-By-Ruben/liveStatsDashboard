type ConnectionStatus = 'connecting' | 'success' | 'error' | 'closed';

export class ActiveVisual {
	status = $state<ConnectionStatus>('closed');
	data = $state<any>(undefined);
	error = $state<unknown | Error>(null);
	visualName = $state<string | number | null>();
	visualType = $state<'defaultVisuals' | 'customVisuals' | 'postGameVisuals' | null>();

	constructor(visualName: string | number, visualType: 'defaultVisuals' | 'customVisuals' | 'postGameVisuals') {
		this.visualName = visualName;
		this.visualType = visualType;
	}

	async getData(url: string) {
		this.status = 'connecting';
		try {
			const apiResponse = await fetch(`${url}${this.visualType}/${this.visualName}`);
			if (!apiResponse.ok) {
				this.status = 'error';
				this.error = await apiResponse.json();
			} else {
				this.data = await apiResponse.json();
				this.status = 'success';
			}
		} catch (error) {
			this.status = 'error';
			this.error = error;
		}
	}

	clearVisual() {
		this.data = undefined;
		this.visualName = undefined;
		this.visualType = undefined;
		this.error = undefined;
	}
}
