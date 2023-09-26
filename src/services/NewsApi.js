'use strict';

import { EventBus } from '../services/EventBus';

export async function fetchNews(apiKey, query, fromDate, sortBy) {
    const apiUrl = 'https://newsapi.org/v2/everything';
    const params = new URLSearchParams({
        q: query,
        from: fromDate,
        sortBy: sortBy,
    });
    const url = `${apiUrl}?${params.toString()}`;
    console.log(url);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        EventBus.$emit('newsDataFetched', data);
        return data;
    }
    catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}