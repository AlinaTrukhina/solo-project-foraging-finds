

// function used to quickly move to the map component
const JumpToMap = () => {

    const scrollToMap = (evt) => {
        window.scrollTo({
            top: 100000,
            behavior: "auto"
        });
    };

    return (
        <button onClick={scrollToMap}>go to map</button>
    );
}

export default JumpToMap;