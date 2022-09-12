const cutText = (text, start, end) => {
    return (text.length > end) ? (`${text.slice(start, end)}...`) : text
}

export default cutText