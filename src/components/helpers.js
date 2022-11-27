const helpers = {

    scrollToTop: () => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    },
    scrollToMap: () => {
        window.scrollTo({
            top: 100000,
            behavior: "auto"
        });
    },    
}

export default helpers;