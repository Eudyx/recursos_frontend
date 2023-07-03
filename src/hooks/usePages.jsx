export const usePages = () => {
    // sets the pages depending on the number of itmes
    const setPages = (sources, number) => {
        let pages = Math.ceil(sources.length / number);
        let page = [];

        for (let i = 0; i < pages; i++) {
            page.push(i + 1);
        }

        return page;
    }

    return setPages;
}