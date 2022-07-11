import './sudoku.css'
import {FC, useEffect, useState} from "react";

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
}


const numberSudoku = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const numberSudokuArray = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
]


const drawFirstRandomBox = () => {
    const tempNumberSudoku = [...numberSudoku]
    const tempArray = []
    for (const i in numberSudoku) {
        const lenArray = tempNumberSudoku.length
        const randomIndex = getRandomInt(lenArray - 1)
        tempArray.push(tempNumberSudoku.splice(randomIndex, 1)[0])
    }
    return tempArray
}

const getArrayRow = (arrayNumbers: Array<Array<number>>, indexArrayRow: number, indexArrayCol: number) => {
    const tempArray = []
    const indexArrayRowCur = Math.floor(indexArrayRow % 3) //Получение индекса блока в ряду общее
    const indexArrayColCur = Math.floor(indexArrayCol % 3) //Получение номер элемента в блоке по ряду
    const indexArrayInAllRows = Math.floor(indexArrayRow / 3) * 3 //Получение начального индекса массива где брать ряд
    const cntGetElem = indexArrayRowCur * 3 + indexArrayColCur
    // const rowElementInAll = Math.floor((indexArrayRow + 1) / 3)// Какой ряд общий
    // console.log('rowElementInAll')
    // console.log(rowElementInAll)
    const rowElementInBlock = Math.floor((indexArrayCol) / 3)// Какой ряд у элемента в блоке
    let tempI = 1
    let indexArrayOriginal = indexArrayInAllRows
    for (let i = 1; i < cntGetElem + 1; i++) {
        let elementGetNumber = ((tempI - 1) + rowElementInBlock * 3)
        tempArray.push(arrayNumbers[indexArrayOriginal][elementGetNumber])
        if (i % 3 === 0) {
            indexArrayOriginal++
            tempI = tempI - 3
        }
        tempI++
    }
    return tempArray
}


const getArrayCol = (arrayNumbers: Array<Array<number>>, indexArrayRow: number, indexArrayCol: number) => {
    const tempArray = []
    const rowArrayInALl = Math.floor(indexArrayRow / 3) //Какой ряд у масссива
    const heightElementsAboveCurrent = Math.floor(indexArrayCol / 3) //Высота элементов над текущим в 1 ряду
    const cntGetElement = rowArrayInALl * 3 + heightElementsAboveCurrent //Количество элементов необходимых взять
    const startColIndex = indexArrayCol % 3
    let tempI = startColIndex
    let startArrayGetElement = indexArrayRow % 3
    for (let i = 1; i < cntGetElement + 1; i++) {
        tempArray.push(arrayNumbers[startArrayGetElement][tempI])
        tempI = tempI + 3
        if ([9, 10, 11].includes(tempI)) {
            tempI = startColIndex
            startArrayGetElement = startArrayGetElement + 3
        }
    }
    return tempArray
}


const drawAllNumberSudoku = () => {
    console.log('start generate')
    const tempArray = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    console.log(tempArray)
    for (let i = 0; i < 9; i++) {
        console.log('Общий элемент')
        console.log(i)
        let haveUndefined = false
        for (let j = 0; j < 9; j++) {
            console.log('Элемент')
            console.log(j)
            const startNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            const numberInRowCurrentCell = getArrayRow(tempArray, i, j)
            console.log('numberInRowCurrentCell')
            console.log(numberInRowCurrentCell)
            const numberInColCurrentCell = getArrayCol(tempArray, i, j)
            console.log('numberInColCurrentCell')
            console.log(numberInColCurrentCell)
            const currentCell = tempArray[i]
            console.log('currentCell')
            console.log(currentCell)
            const allNumber = numberInRowCurrentCell.concat(numberInColCurrentCell, currentCell)
            console.log('allNumber')
            console.log(allNumber)
            // @ts-ignore
            const clearNumber = [...new Set(allNumber)]
            console.log('clearNumber')
            console.log(clearNumber)
            const readyNumber = startNumber.filter(value => !clearNumber.includes(value))
            console.log('readyNumber')
            console.log(readyNumber)
            const randomIndexArray = getRandomInt(readyNumber.length)
            console.log('randomIndexArray')
            console.log(randomIndexArray)
            const selectedNumber = readyNumber[randomIndexArray]
            console.log('Выбранная цифра')
            console.log(selectedNumber)
            if (selectedNumber === undefined) {
                haveUndefined = true
            }
            tempArray[i][j] = selectedNumber
        }
    }
    return tempArray
}


const generateSudoku = () => {
    const arraySudoku = []
    while (arraySudoku.length !== 1) {
        let haveUndefined = false
        const tempArray = drawAllNumberSudoku()
        tempArray.forEach(elem => {
            elem.forEach((elem2) => {
                if (elem2 === undefined) {
                    haveUndefined  = true
                }
            })
        })
        if (!haveUndefined) {
            console.log('success')
            arraySudoku.push(tempArray)
        }
    }
    console.log(arraySudoku)
}


export const SudokuComponent: FC = () => {
    const [state, setState] = useState<Array<Array<number>>>([[7,3,9,6,2,8,1,5,4],[6,5,4,1,9,3,2,7,8],[1,2,8,7,4,5,6,3,9],[2,7,1,9,6,3,8,4,5],[9,4,5,8,1,7,3,2,6],[8,6,3,2,5,4,9,7,1],[4,9,7,3,1,2,5,8,6],[5,8,2,4,6,9,7,3,1],[3,1,6,5,8,7,4,9,2]])
    useEffect(() => {
    }, [])

    return (
        <div className='sudoku_wrapper'>
            <div
                className='sudoku_table'
            >
                <div className='external_row'>
                    <div className='external_col'>
                        <InnerTableSudoku arrayNumber={state[0]}/>
                    </div>
                    <div className='external_col'>
                        <InnerTableSudoku arrayNumber={state[1]}/>
                    </div>
                    <div className='external_col'>
                        <InnerTableSudoku arrayNumber={state[2]}/>
                    </div>
                </div>
                <div className='external_row'>
                    <div className='external_col'>
                        <InnerTableSudoku arrayNumber={state[3]}/>
                    </div>
                    <div className='external_col'>
                        <InnerTableSudoku arrayNumber={state[4]}/>
                    </div>
                    <div className='external_col'>
                        <InnerTableSudoku arrayNumber={state[5]}/>
                    </div>
                </div>
                <div className='external_row'>
                    <div className='external_col'>
                        <InnerTableSudoku arrayNumber={state[6]}/>
                    </div>
                    <div className='external_col'>
                        <InnerTableSudoku arrayNumber={state[7]}/>
                    </div>
                    <div className='external_col'>
                        <InnerTableSudoku arrayNumber={state[8]}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


type InnerTableSudokuType = {
    arrayNumber: number[]
}

export const InnerTableSudoku: FC<InnerTableSudokuType> = ({arrayNumber}) => {
    return (
        <div
            className='sudoku_table_inner'
        >
            <div className='table_row'>
                <div className='table_col'>{arrayNumber[0]}</div>
                <div className='table_col'>{arrayNumber[1]}</div>
                <div className='table_col'>{arrayNumber[2]}</div>
            </div>
            <div className='table_row'>
                <div className='table_col'>{arrayNumber[3]}</div>
                <div className='table_col'>{arrayNumber[4]}</div>
                <div className='table_col'>{arrayNumber[5]}</div>
            </div>
            <div className='table_row'>
                <div className='table_col'>{arrayNumber[6]}</div>
                <div className='table_col'>{arrayNumber[7]}</div>
                <div className='table_col'>{arrayNumber[8]}</div>
            </div>
        </div>
    )
}