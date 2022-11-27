
const JumpToTop = () => {
    
    const scrollToTop = (evt) => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    };

    return (
        <button onClick={scrollToTop}>back to top</button>
    );
}

export default JumpToTop;