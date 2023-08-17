export const geolocation = {
	async getInfo(name) {
		try {
			if (name.length < 2) return;
			let results = [];

			const response = await fetch(
				`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`
			);
			const data = await response.json();

			data['results'].forEach((element) => {
				results.push({
					name: element.name,
					country: element.country,
					longitude: element.longitude,
					latitude: element.latitude
				});
			});

			return results;
		} catch (error) {
			console.error(error);
			return null; // or handle the error appropriately
		}
	}
};
