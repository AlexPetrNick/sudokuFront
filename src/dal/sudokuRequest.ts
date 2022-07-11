

export const getSudokuVariable = () => {
    return fetch(`http://localhost:3000/sudoku/get_sudoku_variant`,{
        headers: {
            'Content-Type': 'application/json'
        },
        mode: "cors"
    })
        .then(data => data.json())
}
