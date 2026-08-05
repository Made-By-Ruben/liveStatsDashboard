<script lang="ts">
	type propTypes = {
		teams: {
			value: string;
			label: string;
		}[];

		roles: {
			value: string;
			label: string;
		}[];

		selectedTeam: string;
		selectedRole: string;
	};
	let { teams, roles, selectedTeam = $bindable(), selectedRole = $bindable() }: propTypes = $props();
</script>

<div class="flex w-full gap-2">
	<label class="inputLabel w-1/2"
		>Team: <select bind:value={selectedTeam} class="input">
			{#each teams as team}
				<option value={team.value}>{team.label}</option>
			{/each}
		</select></label
	>

	<label class="inputLabel w-1/2"
		>Which role for {selectedTeam}?:
		<select bind:value={selectedRole} class="input">
			{#each roles as role}
				<option value={role.value}>{role.label}</option>
			{/each}
		</select></label
	>
</div>
