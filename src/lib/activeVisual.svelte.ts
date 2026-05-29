type ConnectionStatus = 'connecting' | 'success' | 'error' | 'closed';

export class ActiveVisual {
	status = $state<ConnectionStatus>('closed');
	data = $state<any>(undefined);
	error = $state<unknown | Error>(null);
	visualName = $state<string | number | unknown>();
	visualType = $state<'default' | 'custom' | unknown>();

	constructor(visualName: string | number, visualType: 'default' | 'custom') {
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
				console.log(this.error);
			} else {
				this.data = await apiResponse.json();
				this.status = 'success';
			}
		} catch (error) {
			this.status = 'error';
			this.error = error;
			console.log(error);
		}
	}

	clearVisual() {
		this.data = undefined;
		this.visualName = undefined;
		this.visualType = undefined;
		this.error = undefined;
	}
}
