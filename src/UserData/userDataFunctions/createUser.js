export function createUser(data) {
    try {
      return {
        picture: {
          large: data.picture.large,
          medium: data.picture.medium,
          thumbnail: data.picture.thumbnail,
        },
        userName:{
          firstName: data.name.first,
          lastName: data.name.last,
        },
        locationAddress: {
          country: data.location.country,
          state: data.location.state,
          streetAndHouse: data.location.street.name + ' ' + data.location.street.number,
          postcodeAndCity: data.location.postcode + ' ' + data.location.city,
        },
        nationality: data.nat,
        registerDate: Date.parse(data.registered.date),
      };
    } catch (error) {
      console.log('Person is invalid');
    }
  }