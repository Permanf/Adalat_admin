const CkeditorTools = () => {
    return (
        {
            toolbar: [
                "heading",
                "alignment", "|",
                "fontColor", "fontBackgroundColor", "|",
                "|",
                "bold",
                "italic",
                "strikethrough",
                "underline",
                "subscript",
                "superscript",
                "|",
                "link",
                "bulletedList",
                "numberedList",
                "todoList",
                "blockQuote",
                "|",
                "imageTextAlternative",
                "imageUpload",
                "imageStyle:full",
                "imageStyle:side",
                "|",
                "mediaEmbed",
                "insertTable",
                "tableColumn",
                "tableRow",
                "mergeTableCells",
                "|",
                "undo",
                "redo"
            ]
        }
    )
}

export default CkeditorTools