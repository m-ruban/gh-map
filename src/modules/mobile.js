const mobile = () => {
    const agents = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
    return agents.some((toMatchItem) => navigator.userAgent.match(toMatchItem));
};

export default mobile;
