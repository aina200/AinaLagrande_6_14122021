 // FILTERS
 export const filterByOption = (selectedMediaData, option) => {
    switch (option) {
        case "popularity":
            return selectedMediaData.sort((a, b) => {
                return b.likes - a.likes;
            });
        case "date":
                return selectedMediaData.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
        case "title":
            return selectedMediaData.sort((a, b) => a.title.localeCompare(b.title));
        default:
            return selectedMediaData.sort((a, b) => {
                return b.likes - a.likes;
            });
    }
}

