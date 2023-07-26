const formatDate = (date: string): string => {
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const m = date.slice(5, 7);
    return `${months[parseInt(m) - 1]} ${date.slice(8, 10)}, ${date.slice(0, 4)}`;
}

export default formatDate;