/**
 * Created by svitlanamishchuk on 2/12/19.
 */
const apiKey = 'HLQYYzsALXoxulFLf4n9Z2D4T7UqyYP_i8RkOkFgsiINuyYo7eQdOBIR7hsSfH1Wj2EbqB9npYmRMxVFZbWN5zKwyH6RzmGVbS2hfixIY47VCeV3tlL8vgeCKrJiXHYx';

export const Yelp = {

    search(term, location, sortBy) {
        const url =
            `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
        const options = {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        };
        return fetch(url, options)
            .then( response => response.json())
            .then( jsonResponse => {
                if (jsonResponse && jsonResponse.businesses) {
                    return jsonResponse.businesses.map( business => {
                        return {
                            id: business.id,
                            imageSrc: business.image_url,
                            name: business.name,
                            address: business.location.address1,
                            city: business.location.city,
                            state: business.location.state,
                            zipCode: business.location.zip_code,
                            category: business.categories.map(category => category.title).join(', '),
                            rating: business.rating,
                            reviewCount: business.review_count
                        }
                    })
                }
            })
    }
};